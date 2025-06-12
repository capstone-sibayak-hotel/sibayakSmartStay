const Booking = require("../models/Booking");
const mongoose = require("mongoose");

async function addBookingHandler(request, h) {
  try {
    const { username, roomType, checkIn, checkOut, guests, totalPrice } =
      request.payload;

    const booking = new Booking({
      username,
      roomType,
      checkIn,
      checkOut,
      guests,
      totalPrice,
    });

    await booking.save();
    return h.response(booking).code(201);
  } catch (error) {
    console.error("Error creating booking:", error);
    return h.response({ message: "Failed to create booking" }).code(500);
  }
}

async function getAllBookings(req, h) {
  try {
    const allBookings = await Booking.find({}).sort({ createdAt: -1 });

    return h
      .response({
        status: "success",
        data: {
          bookings: allBookings,
        },
      })
      .code(200);
  } catch (err) {
    return h
      .response({
        status: "error",
        message: "Terjadi kesalahan pada server saat mengambil data booking.",
      })
      .code(500);
  }
}

async function deleteBookingByIdHandler(req, h) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return h
      .response({
        status: "fail",
        message: "ID booking tidak valid.",
      })
      .code(400);
  }

  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return h
        .response({
          status: "fail",
          message: "Data booking gagal dihapus. Id tidak ditemukan.",
        })
        .code(404);
    }

    return h
      .response({
        status: "success",
        message: "booking berhasil dihapus.",
      })
      .code(200);
  } catch (err) {
    console.error(err)
    return h
      .response({
        status: "error",
        message: "Terjadi kesalahan pada server saat menghapus booking.",
      })
      .code(500);
  }
}

module.exports = {
  addBookingHandler,
  getAllBookings,
  deleteBookingByIdHandler,
};
