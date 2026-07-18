const mongoose = require("mongoose");

// =======================================
// Reaction Schema
// =======================================

const reactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    emoji: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

// =======================================
// Attachment Schema
// =======================================

const attachmentSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: [
        "image",
        "video",
        "audio",
        "document",
      ],
      required: true,
    },

    fileName: {
      type: String,
      default: "",
    },

    size: {
      type: Number,
      default: 0,
    },

    mimeType: {
      type: String,
      default: "",
    },

    duration: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

// =======================================
// Message Schema
// =======================================

const messageSchema = new mongoose.Schema(
  {
    // Chat
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
      //index: true,
    },

    // Sender
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
     // index: true,
    },

    // Message Text
    text: {
      type: String,
      trim: true,
      default: "",
    },

    // Multiple Attachments
    attachments: {
      type: [attachmentSchema],
      default: [],
    },

    // Reply
    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },

    // Mentions
   mentions: {
  type: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  default: [],
},

    // Emoji Reactions
   reactions: {
  type: [reactionSchema],
  default: [],
},

    // Seen
    seenBy: {
  type: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  default: [],
},

    // Delivered
   deliveredTo: {
  type: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  default: [],
},

    // Status
    status: {
      type: String,
      enum: [
        "sending",
        "sent",
        "delivered",
        "seen",
        "failed",
      ],
      default: "sent",
    },

    // Delete For Me
    deletedFor: {
  type: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  default: [],
},

    // Delete For Everyone
    isDeletedForEveryone: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    // Edited
    isEdited: {
      type: Boolean,
      default: false,
    },

    editedAt: {
      type: Date,
      default: null,
    },

    // Starred
   starredBy: {
  type: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  default: [],
},

    // Pinned
    pinned: {
      type: Boolean,
      default: false,
    },

    // Forwarded
    isForwarded: {
      type: Boolean,
      default: false,
    },

    forwardedFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Voice Note
    isVoiceNote: {
      type: Boolean,
      default: false,
    },

    // Expiring Messages (Future Feature)
    expiresAt: {
      type: Date,
      default: null,
    },
   
  },
  {
    timestamps: true,
  }
);

// =======================================
// Indexes
// =======================================

// Fetch messages of a chat (latest first)
messageSchema.index({
  chat: 1,
  createdAt: -1,
});

// Fetch messages sent by a user
messageSchema.index({
  sender: 1,
});

// Fetch messages of a specific sender in a chat
messageSchema.index({
  chat: 1,
  sender: 1,
});

// Full-text search on message text
messageSchema.index({
  text: "text",
});

// TTL index for disappearing messages
// Messages with expiresAt = null will not be deleted.
messageSchema.index(
  {
    expiresAt: 1,
  },
  {
    expireAfterSeconds: 0,
  }
);
messageSchema.pre("validate", function () {

    // Skip validation for deleted messages
    if (this.isDeletedForEveryone) {
        return;
    }

    const hasText =
        this.text && this.text.trim().length > 0;

    const hasAttachment =
        Array.isArray(this.attachments) &&
        this.attachments.length > 0;

    if (!hasText && !hasAttachment) {
        throw new Error(
            "Message must contain text or an attachment."
        );
    }
});

messageSchema.virtual("attachmentCount").get(function () {
    return this.attachments.length;
});


module.exports = mongoose.model("Message", messageSchema);