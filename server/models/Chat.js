const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    // One-to-One or Group
    isGroupChat: {
      type: Boolean,
      default: false,
    },

    // Group Name
    chatName: {
      type: String,
      trim: true,
      default: "",
    },

    // Group Avatar
    groupImage: {
      type: String,
      default: "",
    },

    // Members
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    // Group Admins
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Latest Message
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },

    // -----------------------------
    // NEW FIELDS
    // -----------------------------

    // Used for sorting chats
    lastActivity: {
      type: Date,
      default: Date.now,
    },

    // User specific pinned chats
    pinnedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // User specific archived chats
    archivedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // User specific muted chats
    mutedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // User specific deleted chats
    deletedFor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Soft delete flag (future use)
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// -----------------------------
// INDEXES
// -----------------------------

chatSchema.index({ participants: 1 });

chatSchema.index({ lastActivity: -1 });

chatSchema.index({ pinnedBy: 1 });

chatSchema.index({ archivedBy: 1 });

chatSchema.index({ mutedBy: 1 });

module.exports = mongoose.model("Chat", chatSchema);