import { API_URL } from '../config.js';  

const token = localStorage.getItem("authToken");
export async function fetchBookings() {
  const res = await fetch(`${API_URL}/bookings`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,  
    }
  });
  return res.json();
}

export async function deleteReservation(id) {
  const res = await fetch(`${API_URL}/bookings/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,  
    },
  });
  return res.json();
}
