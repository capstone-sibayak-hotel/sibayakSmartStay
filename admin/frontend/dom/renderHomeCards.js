import { fetchBookings } from "../api/reservation";
import { fetchRooms } from "../api/room";

export async function renderHomeCards() {
  const cardsContainer = document.querySelector(".cards-container");

  const bookingsRes = await fetchBookings();
  const bookings = bookingsRes.data.bookings;
  console.log(bookings);
  const guests = bookings.reduce(
    (total, booking) => total + (booking.guests || 0),
    0
  );
  cardsContainer.innerHTML = `
  <stat-card value=${bookings.length} label="New Booking Pending"></stat-card>
  <stat-card value=${guests} label="Guests on Reservation"></stat-card>
`;

  await renderPercentageBar();
}

async function renderPercentageBar() {
  const rooms = (await fetchRooms()).data.rooms;

  // Define room types and labels
  const roomTypes = [
    { key: "twin room", label: "Twin Room" },
    { key: "deluxe double room", label: "Deluxe Double Room" },
    { key: "promotion room", label: "Promotion Room" },
    { key: "villa house", label: "Villa House" },
  ];

  // Calculate total, booked, and percentage for each room type
  const stats = roomTypes.map(({ key, label }) => {
    const total = rooms.filter(
      (r) => r.roomType && r.roomType.toLowerCase().includes(key)
    ).length;
    const booked = rooms.filter(
      (r) => r.roomType && r.roomType.toLowerCase().includes(key) && r.isBooked
    ).length;
    const percentage = total ? Math.round((booked / total) * 100) : 0;
    return { label, percentage };
  });

  // Sort by percentage descending
  stats.sort((a, b) => b.percentage - a.percentage);

  // Render bars
  document.getElementById("top-room-bars-container").innerHTML = stats
    .map(
      (s) =>
        `<percentage-bar value="${s.percentage}" label="${s.label}"></percentage-bar>`
    )
    .join("");
}
