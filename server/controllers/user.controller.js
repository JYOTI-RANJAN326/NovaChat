const bcrypt = require("bcrypt");
const User = require("../models/User");
const uploadToCloudinary =
require("../utils/uploadToCloudinary");

// ==============================
// Get Logged In User
// ==============================
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password -refreshToken");

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// Search Users
// ==============================
exports.searchUsers = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const users = await User.find({
      _id: { $ne: req.user._id },
      $or: [
        {
          fullName: {
            $regex: query,
            $options: "i",
          },
        },
        {
          username: {
            $regex: query,
            $options: "i",
          },
        },
      ],
    }).select("-password -refreshToken")

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ==============================
// Update Profile
// ==============================
exports.updateProfile = async (req, res) => {

  try {

   const {
    fullName,
    username,
    bio,
    phone,
} = req.body;
    const existingUsername = await User.findOne({
      username,
      _id: { $ne: req.user._id },
    });

    if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: "Username already taken",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
    fullName,
    username,
    bio,
    phone,
},
      {
        new: true,
      }
    ).select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// ==============================
// Change Password
// ==============================
exports.changePassword = async (req, res) => {

  try {

    const {
      oldPassword,
      newPassword,
    } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Both passwords are required",
      });
    }
if (newPassword.length < 8) {
  return res.status(400).json({
    success: false,
    message: "Password must be at least 8 characters long",
  });
}

   const user = await User.findById(req.user._id)
.select("+password");
if (user.authProvider === "google") {
  return res.status(400).json({
    success: false,
    message:
      "Google accounts cannot change password. Please use Google Account settings.",
  });
}

    const isMatched = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!isMatched) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    if (oldPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message:
          "New password cannot be same as old password",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};



exports.updateAvatar = async (req,res)=>{

try{

if(!req.file){

return res.status(400).json({

success:false,

message:"Image is required"

})

}

const image=

await uploadToCloudinary(

req.file.path,

"NovaChat/Profile"

);

const user=

await User.findByIdAndUpdate(

req.user._id,

{

profilePic:image.secure_url,

},

{

new:true,

}

).select("-password");

return res.status(200).json({

success:true,

message:"Avatar updated successfully",

data:user,

})

}catch(error){

console.error(error);

return res.status(500).json({

success:false,

message:"Server Error",

})

}

}
// ==============================
// Update User Settings
// ==============================
exports.updateSettings = async (req, res) => {
  try {
    const { settings } = req.body;

    if (!settings) {
      return res.status(400).json({
        success: false,
        message: "Settings data is required",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Merge incoming settings with existing settings
   // Merge nested settings
user.settings = {
  ...user.settings.toObject(),

  appearance: {
    ...user.settings.appearance.toObject(),
    ...(settings.appearance || {}),
  },

  notifications: {
    ...user.settings.notifications.toObject(),
    ...(settings.notifications || {}),
  },

  privacy: {
    ...user.settings.privacy.toObject(),
    ...(settings.privacy || {}),
  },

  ai: {
    ...user.settings.ai.toObject(),
    ...(settings.ai || {}),
  },

  storage: {
    ...user.settings.storage.toObject(),
    ...(settings.storage || {}),
  },
};

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      data: user.settings,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};