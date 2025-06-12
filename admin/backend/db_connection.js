const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(String(error))
    console.log("Something went south, MongoDB connection failed");
    process.exit(1);
  }
}

module.exports = connectToDB;