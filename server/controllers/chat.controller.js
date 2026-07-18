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

exports.createGroupChat = async (req, res) => {
  try {
   const {
  chatName,
  members,
  groupImage = "",
} = req.body;

    if (!chatName || !members) {
      return res.status(400).json({
        success: false,
        message: "Group name and members are required",
      });
    }

    if (members.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Group requires at least 3 members including you.",
      });
    }

    const participants = [
      ...new Set([
        req.user._id.toString(),
        ...members,
      ]),
    ];

    const group = await Chat.create({
    chatName,
    isGroupChat: true,
    groupImage,
    participants,
    admins: [req.user._id],
    lastActivity: new Date(),
});

    const populatedGroup = await Chat.findById(group._id)
      .populate("participants", "-password")
      .populate("admins", "-password");

    return res.status(201).json({
      success: true,
      message: "Group created successfully",
      data: populatedGroup,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.addMember = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { userId } = req.body;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    if (!chat.isGroupChat) {
      return res.status(400).json({
        success: false,
        message: "Not a group chat",
      });
    }

    // Only admins can add members
    const isAdmin = chat.admins.some(
      (admin) => admin.toString() === req.user._id.toString()
    );

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Only admins can add members",
      });
    }

    if (
      chat.participants.some(
        (member) => member.toString() === userId
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "User already in group",
      });
    }

   chat.participants.addToSet(userId);

    await chat.save();

    const updatedChat = await Chat.findById(chatId)
      .populate("participants", "-password")
      .populate("admins", "-password");

    return res.status(200).json({
      success: true,
      message: "Member added successfully",
      data: updatedChat,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

exports.removeMember = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { userId } = req.body;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    if (!chat.isGroupChat) {
      return res.status(400).json({
        success: false,
        message: "Not a group chat",
      });
    }

    const isAdmin = chat.admins.some(
      (admin) => admin.toString() === req.user._id.toString()
    );

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Only admins can remove members",
      });
    }

    if (
  chat.admins.length === 1 &&
  chat.admins[0].toString() === userId
) {
  return res.status(400).json({
    success: false,
    message: "Cannot remove the last admin. Assign another admin first.",
  });
}

    chat.participants = chat.participants.filter(
      (member) => member.toString() !== userId
    );

    chat.admins = chat.admins.filter(
      (admin) => admin.toString() !== userId
    );

    await chat.save();

    const updatedChat = await Chat.findById(chatId)
      .populate("participants", "-password")
      .populate("admins", "-password");

    return res.status(200).json({
      success: true,
      message: "Member removed successfully",
      data: updatedChat,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

exports.leaveGroup = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    const isLastAdmin =
  chat.admins.length === 1 &&
  chat.admins[0].toString() === req.user._id.toString();

if (isLastAdmin) {
  return res.status(400).json({
    success: false,
    message: "Assign another admin before leaving the group.",
  });
}

    chat.participants = chat.participants.filter(
      (member) =>
        member.toString() !== req.user._id.toString()
    );

    chat.admins = chat.admins.filter(
      (admin) =>
        admin.toString() !== req.user._id.toString()
    );

    await chat.save();

    return res.status(200).json({
      success: true,
      message: "Left group successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

exports.renameGroup = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { chatName } = req.body;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    const isAdmin = chat.admins.some(
      (admin) => admin.toString() === req.user._id.toString()
    );

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Only admins can rename group",
      });
    }

    if (!chatName || !chatName.trim()) {
  return res.status(400).json({
    success: false,
    message: "Group name is required",
  });
}

    chat.chatName = chatName.trim();

    await chat.save();

    return res.status(200).json({
      success: true,
      message: "Group renamed successfully",
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

exports.makeAdmin = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { userId } = req.body;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    const isAdmin = chat.admins.some(
      (admin) => admin.toString() === req.user._id.toString()
    );

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Only admins can assign admins",
      });
    }

    if (
      !chat.admins.some(
        (admin) => admin.toString() === userId
      )
    ) {
      chat.admins.push(userId);
    }

    await chat.save();

    return res.status(200).json({
      success: true,
      message: "Admin assigned successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

exports.removeAdmin = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { userId } = req.body;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    const isAdmin = chat.admins.some(
      (admin) => admin.toString() === req.user._id.toString()
    );

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Only admins can remove admins",
      });
    }

    chat.admins = chat.admins.filter(
      (admin) => admin.toString() !== userId
    );

    await chat.save();

    return res.status(200).json({
      success: true,
      message: "Admin removed successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};