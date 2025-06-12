import { fetchRooms } from "../api/room";

export default async function renderRoomData() {
  const resData = await fetchRooms();
  const rooms = resData.data.rooms


  const roomHtml = rooms.reduce((htmlAccumulator, room) => {
    return htmlAccumulator + `
      <tr class="border-b hover:bg-gray-50">
        <td class="py-3 px-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" stroke-width="2"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M5.121 17.804A13.937 13.937 0 0112 15c2.21 0 4.28.535 6.121 1.485M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          ${room.customer ? room.customer : '-'}
        </td>
        <td class="py-3 px-4">
          ${room.roomNo}
        </td>
        <td class="py-3 px-4">${room.roomType}</td>
        <td class="py-3 px-4">Rp ${room.roomPrice}</td>
        <td class="py-3 px-4 ${room.isBooked ? 'text-yellow-600' : 'text-blue-500'}">${room.isBooked ? 'Booked' : 'empty'}</td>
      </tr>
    `;
  }, "");

  // Example of how you might use roomHtml:
  document.getElementById('room-data-table').innerHTML = roomHtml;
}

