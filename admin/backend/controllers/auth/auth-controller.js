const Admin = require("../../models/Admin"); // Your Mongoose Admin model
const jwt = require("jsonwebtoken");

async function registerAdminHandler(req, h) {
  const { username, password } = req.payload;

  if (!username || !password) {
    return h
      .response({
        success: false,
        message: "Username and password are required.",
      })
      .code(400);
  }

  try {
    const existingAdmin = await Admin.findOne({
      username: username.toLowerCase(),
    });
    if (existingAdmin) {
      return h
        .response({
          success: false,
          message: "Admin username already exists.",
        })
        .code(409); // 409 Conflict
    }

    const newAdmin = new Admin({
      username: username.toLowerCase(),
      password, 
    });

    await newAdmin.save();

    return h
      .response({
        success: true,
        message: "Admin registered successfully!",
        data: {
          adminId: newAdmin._id,
          username: newAdmin.username,
        },
      })
      .code(201);
  } catch (error) {
    if (error.name === "ValidationError") {
      return h
        .response({
          success: false,
          message: "Validation failed: " + error.message,
        })
        .code(400);
    }
    return h
      .response({
        success: false,
        message: "An error occurred during registration.",
      })
      .code(500);
  }
}

async function loginAdminHandler(req, h) {
  const { username, password } = req.payload;

  if (!username || !password) {
    return h
      .response({
        success: false,
        message: "Username and password are required.",
      })
      .code(400);
  }

  try {
    const admin = await Admin.findOne({ username: username.toLowerCase() });
    if (!admin) {
      return h
        .response({
          success: false,
          message: "Admin not found or invalid credentials.",
        })
        .code(401);
    }

    const isMatch = await admin.comparePassword(password); // Using model method
    if (!isMatch) {
      return h
        .response({
          success: false,
          message: "Admin not found or invalid credentials.",
        })
        .code(401);
    }

    const accessToken = jwt.sign(
      {
        userId: admin._id,
        username: admin.username,
        // If you need a role, and it's always 'admin' for this model:
        // role: 'admin'
      },
      process.env.JWT_SECRET_KEY, // Ensure JWT_SECRET_KEY is in your .env file
      {
        expiresIn: "1h", // Or your preferred expiration time
      }
    );

    return h
      .response({
        success: true,
        message: "Login successful.",
        accessToken,
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        success: false,
        message: "An error occurred during login.",
      })
      .code(500);
  }
}

async function changeAdminPasswordHandler(req, h) {
  // Assumes JWT authentication strategy is set up and provides req.auth.credentials
  const adminId = req.auth.credentials.userId;
  const { oldPassword, newPassword } = req.payload;

  if (!oldPassword || !newPassword) {
    return h
      .response({
        success: false,
        message: "Old password and new password are required.",
      })
      .code(400);
  }

  if (newPassword.length < 6) {
    // Example: Enforce minimum password length
    return h
      .response({
        success: false,
        message: "New password must be at least 6 characters long.",
      })
      .code(400);
  }

  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return h
        .response({
          success: false,
          message: "Admin not found.",
        })
        .code(404);
    }

    const isMatch = await admin.comparePassword(oldPassword);
    if (!isMatch) {
      return h
        .response({
          success: false,
          message: "Invalid old password.",
        })
        .code(401);
    }

    admin.password = newPassword; // Set the new password
    await admin.save(); // The pre-save hook will hash it

    return h
      .response({
        success: true,
        message: "Password changed successfully.",
      })
      .code(200);
  } catch (error) {
    if (error.name === "ValidationError") {
      return h
        .response({
          success: false,
          message: "Validation failed: " + error.message,
        })
        .code(400);
    }
    return h
      .response({
        success: false,
        message: "An error occurred while changing password.",
      })
      .code(500);
  }
}

module.exports = {
  registerAdminHandler,
  loginAdminHandler,
  changeAdminPasswordHandler,
};
