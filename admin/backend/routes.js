const { registerAdminHandler, loginAdminHandler } = require("./controllers/auth/auth-controller");
const { deleteBookingByIdHandler, getAllBookings, addBookingHandler } = require("./controllers/booking-controller");
const {
  getAllRoomsHandler,
  updateRoomByIdHandler,
  addRoomDataHandler,
} = require("./controllers/rooom-controller");

const routes = [
  // Auth Routes
  {
    method:"POST",
    path:"/api/register-admin",
    handler:registerAdminHandler
  },
  {
    method:"POST",
    path:"/api/login-admin",
    handler:loginAdminHandler
  },
  // TEST ADD
  {
    method: "POST",
    path: "/api/bookings",
    handler: addBookingHandler,
  },
  // TEST ADD
  {
    method: "GET",
    path: "/api/bookings",
    handler: getAllBookings,
    options: { auth: "jwt" },
  },
  {
    method: "DELETE",
    path: "/api/bookings/{id}",
    handler: deleteBookingByIdHandler,
    options: { auth: "jwt" },
  },

  // ROOMS
  {
    method: "GET",
    path: "/api/rooms",
    handler: getAllRoomsHandler,
    options: { auth: "jwt" },
  },
  {
    method: "POST",
    path: "/api/rooms",
    handler: addRoomDataHandler,
    options: { auth: "jwt" },
  },
  {
    method: "PUT",
    path: "/api/rooms/{roomNumber}",
    handler: updateRoomByIdHandler,
    options: { auth: "jwt" },
  },
];

module.exports = routes;
