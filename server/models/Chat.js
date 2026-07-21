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

    // Group Description
    description: {
      type: String,
      trim: true,
      default: "",
    },

    // Members
    participants: {
  type: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  default: [],
},

    // Group Admins
    admins: {
  type: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  default: [],
},

    // Latest Message
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },

    // Used for sorting chats
    lastActivity: {
      type: Date,
      default: Date.now,
    },

    // -----------------------------
    // User Specific Features
    // -----------------------------

    // User specific unread counts
    unreadCounts: {
      type: Map,
      of: Number,
      default: {},
    },

    // User specific pinned chats
    pinnedBy: {
  type: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  default: [],
},

    // User specific archived chats
    archivedBy: {
  type: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  default: [],
},

    // User specific muted chats
    mutedBy: {
  type: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  default: [],
},

    // User specific deleted chats
    deletedFor: {
  type: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  default: [],
},

    // -----------------------------
    // Group Settings
    // -----------------------------

    inviteCode: {
      type: String,
      default: null,
    },

    groupSettings: {
      onlyAdminsCanMessage: {
        type: Boolean,
        default: false,
      },

      onlyAdminsCanEdit: {
        type: Boolean,
        default: false,
      },

      allowMemberInvite: {
        type: Boolean,
        default: true,
      },
    },

    // Soft Delete
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

chatSchema.index({ participants: 1, lastActivity: -1 });

chatSchema.index({ pinnedBy: 1 });

chatSchema.index({ archivedBy: 1 });

chatSchema.index({ mutedBy: 1 });
chatSchema.index({
  isGroupChat: 1,
  lastActivity: -1,
});
chatSchema.index({
  chatName: "text",
});

// -----------------------------
// Virtuals
// -----------------------------

chatSchema.virtual("memberCount").get(function () {
  return this.participants?.length || 0;
});

chatSchema.set("toJSON", { virtuals: true });
chatSchema.set("toObject", { virtuals: true });

// =======================================
// Validation
// =======================================

chatSchema.pre("validate", function () {

    if (
        !Array.isArray(this.participants) ||
        this.participants.length < 2
    ) {
        throw new Error(
            "A chat must have at least two participants."
        );
    }

});
  



chatSchema.pre("save", function () {

    if (
        this.isGroupChat &&
        !this.chatName.trim()
    ) {
        throw new Error(
            "Group name is required."
        );
    }

    const uniqueParticipants = new Set(
        this.participants.map(id => id.toString())
    );

    if (
        uniqueParticipants.size !==
        this.participants.length
    ) {
        throw new Error(
            "Duplicate participants are not allowed."
        );
    }

});

module.exports = mongoose.model("Chat", chatSchema);