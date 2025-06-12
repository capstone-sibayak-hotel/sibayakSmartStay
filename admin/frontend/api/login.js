import { API_URL } from '../config.js';  

export async function loginUser(data) {
  const res = await fetch(`${API_URL}/login-admin`, {  
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}