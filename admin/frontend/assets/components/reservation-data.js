import { deleteReservation } from "../../api/reservation";
import { fetchRooms, updateRoomData } from "../../api/room";

class ReservationData extends HTMLElement {
  connectedCallback() {
    const roomInfoAttr = this.getAttribute("roomInfo");
    const {
      _id,
      roomType = "N/A",
      checkIn = "N/A",
      checkOut = "N/A",
      added = "N/A", // This will be the createdAt value
    } = roomInfoAttr ? JSON.parse(roomInfoAttr) : {};

    const customerInfoAttr = this.getAttribute("customerInfo");
    const {
      username = "Guest",
      gender = "N/A",
      phone = "N/A",
      city = "N/A",
      country = "N/A",
      roomPrice = "N/A"
    } = customerInfoAttr ? JSON.parse(customerInfoAttr) : {};

    this.innerHTML = `
      <div class="bg-white p-5 shadow-md rounded-md">
        <h3 class="font-semibold text-lg">${username}</h3>
        <p class="text-sm text-gray-600 mt-1">Room: ${roomType}</p>
        <p class="text-sm text-gray-600">Check-in: ${checkIn}</p>
        <p class="text-sm text-gray-600">Check-out: ${checkOut}</p>
        <p class="text-sm text-gray-600">Added: ${added}</p>

        <div class="mt-4 flex justify-end gap-2">
          <button class="confirm-btn bg-[#7C6A46] hover:brightness-110 text-white text-sm px-3 py-1 rounded">Confirm</button>
        </div>
      </div>
    `;

    this.querySelector(".confirm-btn").addEventListener("click", async () => {
      const resData = await fetchRooms();
      const allRooms = resData.data.rooms;

      try {

        const suitableEmptyRooms = allRooms.filter(
          (r) => !r.isBooked && r.roomType !== roomType
        );

        if (suitableEmptyRooms.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * suitableEmptyRooms.length
          );
          const randomEmptyRoomToAssign = suitableEmptyRooms[randomIndex];
          const roomNoToAssign = randomEmptyRoomToAssign.roomNo;

          const updatePayload = {
            customer: username,
            roomType,
            roomPrice,
            isBooked: true,
          };
          console.log(updatePayload)
          console.log(roomNoToAssign)
          console.log("_ID", _id)
          await updateRoomData(updatePayload, roomNoToAssign);
          console.log(
            `Admin: Room ${roomNoToAssign} assigned to customer ${username}.`
          );

          const deleteResponse = await deleteReservation(_id);
          if (deleteResponse.status === "success") {
            this.remove();
          }
        } else {
          console.log(
            "Admin: No suitable empty rooms available for this customer request. Showing modal."
          );
        }
      } catch (error) {
        console.error("Admin: Error during room assignment process:", error);
      }
    });

  }
}

customElements.define("reservation-data", ReservationData);
