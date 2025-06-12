import './assets/styles/styles.css';

import "./assets/components/sidebar.js";
import "./assets/components/topbar-component.js";
import "./assets/components/stat-card.js";
import "./assets/components/percentage-bar.js";
import "./assets/components/reservation-data.js";

import { renderHomeCards } from "./dom/renderHomeCards.js";
import renderReservations from "./dom/renderReservations.js";
import renderRoomData from "./dom/renderRoomData.js";

// Redirect user to login if no token is found and they are on an admin page
const path = window.location.pathname;
if (!localStorage.getItem("authToken") && !path.endsWith("login-admin")) {
  window.location.href = "login-admin.html";
} else {
  console.log(path);
  // Admin dashboard (home)
  if (path === '/' || path.includes('index')) {
    renderHomeCards();
  }

  // Reservation Data page
  else if (path.includes("reservation-data")) {
    renderReservations();
  }

  // Room Data page
  else if (path.includes("room-data")) {
    renderRoomData();
  }
}
