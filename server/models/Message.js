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
      default: 0, // seconds (for audio/video)
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
      index: true,
    },

    // Sender
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Text
    text: {
      type: String,
      trim: true,
      default: "",
    },

    // Attachment
    attachment: {
      type: attachmentSchema,
      default: null,
    },

    // Reply
    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },

    // Emoji Reactions
    reactions: [reactionSchema],

    // Seen
    seenBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Delivered
    deliveredTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Delete For Me
    deletedFor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Delete For Everyone
    isDeletedForEveryone: {
      type: Boolean,
      default: false,
    },

    // Edited
    isEdited: {
      type: Boolean,
      default: false,
    },

    // Starred
    starredBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Pinned
    pinned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// =======================================
// Indexes
// =======================================

messageSchema.index({
  chat: 1,
  createdAt: -1,
});

messageSchema.index({
  sender: 1,
});

messageSchema.index({
  text: "text",
});

module.exports = mongoose.model(
  "Message",
  messageSchema
);