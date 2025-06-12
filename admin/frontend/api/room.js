import { API_URL } from '../config.js'; 

const token = localStorage.getItem("authToken");
export async function fetchRooms() {
  const res = await fetch(`${API_URL}/rooms`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,  
    },
  });
  return res.json();
}

export async function updateRoomData(data, roomNumber) {
  console.log(roomNumber)
  console.log("AT updateRoom funtion")
  const res = await fetch(`${API_URL}/rooms/${roomNumber}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,  
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
