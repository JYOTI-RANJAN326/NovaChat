const Chat = require("../models/Chat");
const User = require("../models/User");

// ======================================================
// Create One-to-One Chat
// ======================================================
exports.createChat = async (req, res) => {
  try {
    const { receiverId } = req.body;

    if (!receiverId) {
      return res.status(400).json({
        success: false,
        message: "Receiver ID is required",
      });
    }

    if (receiverId === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot chat with yourself",
      });
    }

    const receiver = await User.findById(receiverId);

    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let chat = await Chat.findOne({
  isGroupChat: false,
  participants: {
    $all: [req.user._id, receiverId],
  },
  $expr: {
    $eq: [{ $size: "$participants" }, 2],
  },
  deletedFor: {
    $nin: [req.user._id],
  },
}).populate("participants", "-password");
    if (chat) {
      return res.status(200).json({
        success: true,
        message: "Chat already exists",
        data: chat,
      });
    }

    chat = await Chat.create({
      participants: [req.user._id, receiverId],
      lastActivity: new Date(),
    });

    chat = await Chat.findById(chat._id).populate(
      "participants",
      "-password"
    );

    return res.status(201).json({
      success: true,
      message: "Chat created successfully",
      data: chat,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// ======================================================
// Get All Chats
// ======================================================
exports.getMyChats = async (req, res) => {

  try {

    const chats = await Chat.find({

      participants: req.user._id,

      deletedFor: {
        $ne: req.user._id,
      },

    })
      .populate("participants", "-password")
      .populate("admins", "-password")
      .populate({
        path: "lastMessage",
        populate: {
          path: "sender",
          select: "fullName username profilePic",
        },
      })
      .sort({
        lastActivity: -1,
      });

    return res.status(200).json({
      success: true,
      message: "Chats fetched successfully",
      data: chats,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

// ======================================================
// Search Chats
// ======================================================
exports.searchChats = async (req, res) => {

  try {

    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const chats = await Chat.find({

      participants: req.user._id,

      deletedFor: {
        $ne: req.user._id,
      },

      chatName: {
        $regex: query,
        $options: "i",
      },

    })
      .populate("participants", "-password")
      .populate("admins", "-password");

    return res.status(200).json({

      success: true,

      message: "Chats fetched successfully",

      data: chats,

    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};

// ======================================================
// Pin / Unpin Chat
// ======================================================
exports.togglePinChat = async (req, res) => {

  try {

    const { chatId } = req.params;

    const chat = await Chat.findById(chatId);

    if (!chat) {

      return res.status(404).json({

        success: false,

        message: "Chat not found",

      });

    }
    const isParticipant = chat.participants.some(
  (member) => member.toString() === req.user._id.toString()
);

if (!isParticipant) {
  return res.status(403).json({
    success: false,
    message: "Access denied",
  });
}

    const pinned = chat.pinnedBy.some(
      (id) => id.toString() === req.user._id.toString()
    );

    if (pinned) {

      chat.pinnedBy.pull(req.user._id);

    } else {

      chat.pinnedBy.addToSet(req.user._id);

    }

    await chat.save();

    return res.status(200).json({

      success: true,

      message: pinned
        ? "Chat unpinned successfully"
        : "Chat pinned successfully",

      data: chat,

    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};

// ======================================================
// Archive / Unarchive Chat
// ======================================================
exports.toggleArchiveChat = async (req, res) => {

  try {

    const { chatId } = req.params;

    const chat = await Chat.findById(chatId);

    if (!chat) {

      return res.status(404).json({

        success: false,

        message: "Chat not found",

      });

    }
    const isParticipant = chat.participants.some(
  (member) => member.toString() === req.user._id.toString()
);

if (!isParticipant) {
  return res.status(403).json({
    success: false,
    message: "Access denied",
  });
}
    const archived = chat.archivedBy.some(
      (id) => id.toString() === req.user._id.toString()
    );

    if (archived) {

      chat.archivedBy.pull(req.user._id);

    } else {

      chat.archivedBy.addToSet(req.user._id);

    }

    await chat.save();

    return res.status(200).json({

      success: true,

      message: archived
        ? "Chat unarchived successfully"
        : "Chat archived successfully",

      data: chat,

    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};

// ======================================================
// Mute / Unmute Chat
// ======================================================
exports.toggleMuteChat = async (req, res) => {

  try {

    const { chatId } = req.params;

    const chat = await Chat.findById(chatId);

    if (!chat) {

      return res.status(404).json({

        success: false,

        message: "Chat not found",

      });

    }
    const isParticipant = chat.participants.some(
  (member) => member.toString() === req.user._id.toString()
);

if (!isParticipant) {
  return res.status(403).json({
    success: false,
    message: "Access denied",
  });
}

    const muted = chat.mutedBy.some(
      (id) => id.toString() === req.user._id.toString()
    );

    if (muted) {

      chat.mutedBy.pull(req.user._id);

    } else {

      chat.mutedBy.addToSet(req.user._id);

    }

    await chat.save();

    return res.status(200).json({

      success: true,

      message: muted
        ? "Chat unmuted successfully"
        : "Chat muted successfully",

      data: chat,

    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};

// ======================================================
// Soft Delete Chat
// ======================================================
exports.deleteChat = async (req, res) => {

  try {

    const { chatId } = req.params;

    const chat = await Chat.findById(chatId);

    if (!chat) {

      return res.status(404).json({

        success: false,

        message: "Chat not found",

      });

    }
    const isParticipant = chat.participants.some(
  (member) => member.toString() === req.user._id.toString()
);

if (!isParticipant) {
  return res.status(403).json({
    success: false,
    message: "Access denied",
  });
}

    if (
      !chat.deletedFor.some(
        (id) => id.toString() === req.user._id.toString()
      )
    ) {
      chat.deletedFor.push(req.user._id);
    }

    await chat.save();

    return res.status(200).json({

      success: true,

      message: "Chat deleted successfully",

    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};



