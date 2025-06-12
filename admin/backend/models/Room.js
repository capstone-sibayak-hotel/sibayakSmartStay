const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  customer: {
    type: String,
    trim: true,
    default: "" // Allows for an empty string if no customer is assigned
  },
  roomNo: {
    type: Number,
    required: true,
    unique: true // Assuming room numbers should be unique
  },
  roomType: {
    type: String,
    required: true,
    trim: true,
  },
  roomPrice: {
    type: Number,
    required: true
  },
  isBooked: {
    type: Boolean,
    required: true,
    default: false // Default to not booked
  }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);