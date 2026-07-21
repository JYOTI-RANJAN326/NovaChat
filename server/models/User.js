const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      index: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email address.",
      ],
    },

   password: {
  type: String,
  select: false,
},

googleId: {
  type: String,
  default: "",
},

authProvider: {
  type: String,
  enum: ["local", "google"],
  default: "local",
},

    profilePic: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 250,
      default: "",
    },

    isOnline: {
      type: Boolean,
      default: false,
    },

    lastSeen: {
      type: Date,
      default: Date.now,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: {
      type: String,
      default: "",
      select: false,
    },
  },
  {
    timestamps: true,
  }
);
// ===============================
// Indexes
// ===============================

userSchema.index({
  username: "text",
  fullName: "text",
});

// ===============================
// Validation
// ===============================

userSchema.pre("validate", async function () {
  if (this.fullName) {
    this.fullName = this.fullName.trim();
  }

  if (this.username) {
    this.username = this.username.trim().toLowerCase();
  }

  if (this.email) {
    this.email = this.email.trim().toLowerCase();
  }
});
userSchema.virtual("displayName").get(function () {
  return this.fullName || this.username;
});

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("User", userSchema);