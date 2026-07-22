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
   phone: {
  type: String,
  default: "",
  trim: true,
  unique: true,
  sparse: true,
},
settings: {
  appearance: {
    theme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "dark",
    },

    accentColor: {
      type: String,
      default: "cyan",
    },

    bubbleStyle: {
      type: String,
      enum: ["rounded", "compact"],
      default: "rounded",
    },

    fontSize: {
      type: String,
      enum: ["small", "medium", "large"],
      default: "medium",
    },

    animations: {
      type: Boolean,
      default: true,
    },

    wallpaper: {
      type: String,
      default: "",
    },
  },

  notifications: {
    desktop: {
      type: Boolean,
      default: true,
    },

    messageSound: {
      type: Boolean,
      default: true,
    },

    group: {
      type: Boolean,
      default: true,
    },

    mentions: {
      type: Boolean,
      default: true,
    },

    preview: {
      type: Boolean,
      default: true,
    },

    ai: {
      type: Boolean,
      default: false,
    },
  },

  privacy: {
    lastSeen: {
      type: String,
      enum: ["Everyone", "My Contacts", "Nobody"],
      default: "Everyone",
    },

    profilePhoto: {
      type: String,
      enum: ["Everyone", "My Contacts", "Nobody"],
      default: "Everyone",
    },

    onlineStatus: {
      type: Boolean,
      default: true,
    },

    readReceipts: {
      type: Boolean,
      default: true,
    },

    typingIndicator: {
      type: Boolean,
      default: true,
    },

    twoFactor: {
      type: Boolean,
      default: false,
    },
  },

  ai: {
    model: {
  type: String,
  enum: [
    "GPT-4.1",
    "GPT-4o",
    "Gemini 2.5 Pro",
    "Claude 4 Sonnet",
  ],
  default: "GPT-4.1",
},
    smartReply: {
      type: Boolean,
      default: true,
    },

    autoSummary: {
      type: Boolean,
      default: true,
    },

    grammar: {
      type: Boolean,
      default: true,
    },

    translation: {
      type: Boolean,
      default: false,
    },

    aiMemory: {
      type: Boolean,
      default: true,
    },
  },

  storage: {
    autoDownload: {
      images: {
        type: Boolean,
        default: true,
      },

      videos: {
        type: Boolean,
        default: true,
      },

      documents: {
        type: Boolean,
        default: false,
      },
    },
  },
},
 avatarColor: {
  type: String,
  default: "#06B6D4",
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