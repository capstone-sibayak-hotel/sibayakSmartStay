const Room = require("../models/Room"); // Assuming this is your Mongoose Room model

async function addRoomDataHandler(req, h) {
  const { roomNo, roomType, roomPrice, customer, isBooked } = req.payload;

  if (roomNo === undefined || !roomType || roomPrice === undefined) {
    return h.response({
      status: "fail",
      message: "Gagal menambahkan room. Mohon isi field wajib: roomNo, roomType, roomPrice.",
    }).code(400);
  }

  try {
    const newRoom = new Room({
      roomNo,
      roomType,
      roomPrice,
      customer,
      isBooked,
    });

    await newRoom.save();

    return h.response({
      status: "success",
      message: "Room berhasil ditambahkan",
      data: {
        roomId: newRoom._id
      }
    }).code(201);

  } catch (err) {
    if (err.name === 'ValidationError') {
      let validationMessages = "Data room tidak valid.";
      if (err.errors) {
        validationMessages = Object.values(err.errors).map(e => e.message).join(', ');
      }
      return h.response({
        status: "fail",
        message: validationMessages,
      }).code(400);
    }
    if (err.code === 11000) { // MongoDB duplicate key error
        return h.response({
            status: "fail",
            message: `Gagal menambahkan room. Room dengan nomor ${roomNo} sudah ada.`,
        }).code(409); // 409 Conflict
    }
    return h.response({
      status: "error",
      message: "Terjadi kesalahan pada server saat menambahkan room.",
    }).code(500);
  }
}

async function getAllRoomsHandler(req, h) {
  try {
    const rooms = await Room.find({}).sort({ roomNo: 1 }); // Sort by roomNo

    return h.response({
      status: "success",
      data: {
        rooms: rooms,
      },
    }).code(200);

  } catch (err) {
    return h.response({
      status: "error",
      message: "Terjadi kesalahan pada server saat mengambil data room.",
    }).code(500);
  }
}

async function updateRoomByIdHandler(req, h) {
  const { roomNumber } = req.params; // This is the roomNo to identify the room
  const updateData = req.payload; // Contains fields to update: customer, roomType, roomPrice, isBooked, potentially roomNo

  if (isNaN(Number(roomNumber))) {
      return h.response({
          status: "fail",
          message: "Nomor room tidak valid.",
      }).code(400);
  }

  if (Object.keys(updateData).length === 0) {
    return h.response({
        status: "fail",
        message: "Gagal memperbarui room. Tidak ada data yang dikirim untuk pembaruan.",
    }).code(400);
  }

  try {
    const updatedRoom = await Room.findOneAndUpdate(
      { roomNo: Number(roomNumber) },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedRoom) {
      return h.response({
        status: "fail",
        message: "Data room tidak ditemukan atau gagal diperbarui.",
      }).code(404);
    }

    return h.response({
      status: "success",
      message: "Room data berhasil diperbarui",
      data: {
        room: updatedRoom
      }
    }).code(200);

  } catch (err) {
    if (err.name === 'ValidationError') {
      let validationMessages = "Data room tidak valid.";
      if (err.errors) {
        validationMessages = Object.values(err.errors).map(e => e.message).join(', ');
      }
      return h.response({
        status: "fail",
        message: validationMessages,
      }).code(400);
    }
    if (err.code === 11000) {
        return h.response({
            status: "fail",
            message: "Gagal memperbarui room. Nomor room yang baru sudah digunakan oleh room lain.",
        }).code(409);
    }
    return h.response({
      status: "error",
      message: "Terjadi kesalahan pada server saat memperbarui room.",
    }).code(500);
  }
}

module.exports = {
  addRoomDataHandler,
  getAllRoomsHandler,
  updateRoomByIdHandler,
};