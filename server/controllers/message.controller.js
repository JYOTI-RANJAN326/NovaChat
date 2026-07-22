const Chat = require("../models/Chat");
const Message = require("../models/Message");
const { getIO } = require("../socket/socket");



exports.sendMessage = async (req, res) => {
  console.log("BODY:", req.body);
  try {
    const {
    chatId,
    text,
    attachments = [],
    replyTo = null,
} = req.body;

    if (!chatId) {
      return res.status(400).json({
        success: false,
        message: "Chat ID is required",
      });
    }

    // At least one of text or attachment
    const hasText = text && text.trim().length > 0;

    if (!hasText && attachments.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty",
      });
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    // Check participant
    const isParticipant = chat.participants.some((member) =>
      member.equals(req.user._id)
    );

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: "You are not a participant",
      });
    }

    // Reply validation
    if (replyTo) {
      const repliedMessage = await Message.findById(replyTo);

      if (!repliedMessage) {
        return res.status(404).json({
          success: false,
          message: "Reply message not found",
        });
      }

      if (!repliedMessage.chat.equals(chat._id)) {
        return res.status(400).json({
          success: false,
          message: "Reply message belongs to another chat",
        });
      }

      if (repliedMessage.isDeletedForEveryone) {
        return res.status(400).json({
          success: false,
          message: "Cannot reply to deleted message",
        });
      }
    }

    const message = await Message.create({
      chat: chatId,
      sender: req.user._id,
      text,
      attachments,
      replyTo,
      seenBy: [req.user._id],
      deliveredTo: [req.user._id],
    });

    chat.lastMessage = message._id;
    chat.lastActivity = new Date();

    await chat.save();

    const populatedMessage = await Message.findById(message._id)
  .populate("sender", "fullName username profilePic")
  .populate("chat")
  .populate({
    path: "replyTo",
    populate: {
      path: "sender",
      select: "fullName username profilePic",
    },
  });

    const io = getIO();

    io.to(chatId).emit(
      "receive-message",
      populatedMessage
    );

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: populatedMessage,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


exports.getMessages = async (req, res) => {
   console.log("🔥 getMessages called");
  console.log("chatId:", req.params.chatId);
  console.log("user:", req.user?._id);

  try {

    const { chatId } = req.params;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 30;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    const isParticipant = chat.participants.some(member =>
      member.equals(req.user._id)
    );

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: "You are not a participant of this chat",
      });
    }

  const messages = await Message.find({
    chat: chatId,
    deletedFor: {
        $ne: req.user._id,
    },
})
.sort({ createdAt: 1 })
.skip((page - 1) * limit)
.limit(limit)
.populate("sender", "fullName username profilePic")
.populate({
    path: "replyTo",
    populate: {
        path: "sender",
        select: "fullName username profilePic",
    },
})

      

    return res.status(200).json({
      success: true,
      data: messages,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};


exports.editMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty",
      });
    }

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    if (message.isDeletedForEveryone) {
      return res.status(400).json({
        success: false,
        message: "Deleted messages cannot be edited",
      });
    }

    if (!message.sender.equals(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "You can only edit your own messages",
      });
    }

    const EDIT_WINDOW =
      Number(process.env.EDIT_WINDOW_MINUTES) * 60 * 1000;

    const canEdit =
      Date.now() - new Date(message.createdAt).getTime() <= EDIT_WINDOW;

    if (!canEdit) {
      return res.status(400).json({
        success: false,
        message: "Edit time has expired",
      });
    }

    message.text = text.trim();
    message.isEdited = true;
    message.editedAt = new Date();
    await message.save();

    const updatedMessage = await Message.findById(message._id)
      .populate("sender", "fullName username profilePic")
      .populate({
        path: "replyTo",
        populate: {
          path: "sender",
          select: "fullName username profilePic",
        },
      });

    const io = getIO();

    io.to(message.chat.toString()).emit(
      "message-edited",
      updatedMessage
    );

    return res.status(200).json({
      success: true,
      message: "Message updated successfully",
      data: updatedMessage,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

exports.deleteForMe = async (req, res) => {
  try {

    const { messageId } = req.params;

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    const alreadyDeleted = message.deletedFor.some(userId =>
      userId.equals(req.user._id)
    );

    if (!alreadyDeleted) {
      message.deletedFor.push(req.user._id);
      await message.save();
    }

    return res.status(200).json({
      success: true,
      message: "Message deleted for you",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Server Error"
    });

  }
};



exports.deleteForEveryone = async (req, res) => {
  try {
const { messageId } = req.params;

const message = await Message.findById(messageId);

if (!message) {
  return res.status(404).json({
    success: false,
    message: "Message not found",
  });
}

const DELETE_WINDOW =
  Number(process.env.DELETE_WINDOW_MINUTES) * 60 * 1000;

const canDelete =
  Date.now() - new Date(message.createdAt).getTime() <= DELETE_WINDOW;

if (!canDelete) {
  return res.status(400).json({
    success: false,
    message: "Delete time has expired",
  });

}

  

    if (!message) {
      return res.status(404).json({
        success:false,
        message:"Message not found"
      });
    }

    if (!message.sender.equals(req.user._id)) {
      return res.status(403).json({
        success:false,
        message:"Only sender can delete for everyone"
      });
    }

    message.text = "";

   message.attachments = [];

    message.replyTo = null;

    message.reactions = [];

    message.isDeletedForEveryone = true;
    message.deletedAt = new Date();

    await message.save();
    const io = getIO();

io.to(message.chat.toString()).emit(
  "message-deleted",
  {
    messageId: message._id,
  }
);

    return res.status(200).json({
      success:true,
      message:"Message deleted for everyone"
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success:false,
      message:"Server Error"
    });

  }
};



exports.toggleReaction = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { emoji } = req.body;

    if (!emoji) {
      return res.status(400).json({
        success: false,
        message: "Emoji is required",
      });
    }

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    const existingReactionIndex =
      message.reactions.findIndex(
        (reaction) =>
          reaction.user.equals(req.user._id)
      );

    if (existingReactionIndex !== -1) {

      if (
        message.reactions[existingReactionIndex].emoji ===
        emoji
      ) {

        message.reactions.splice(
          existingReactionIndex,
          1
        );

      } else {

        message.reactions[
          existingReactionIndex
        ].emoji = emoji;

      }

    } else {

      message.reactions.push({
        user: req.user._id,
        emoji,
      });

    }

    await message.save();

    const updatedMessage = await Message.findById(messageId)
      .populate("sender", "fullName username profilePic");

    const io = getIO();

    io.to(message.chat.toString()).emit(
      "reaction-updated",
      updatedMessage
    );

    return res.status(200).json({
      success: true,
      message: "Reaction updated successfully",
      data: updatedMessage,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};



exports.markAsSeen = async (req, res) => {
  try {

    const { chatId } = req.params;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    // Check participant
    const isParticipant = chat.participants.some(member =>
      member.equals(req.user._id)
    );

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: "You are not a participant",
      });
    }

    // ✅ Mark all unseen messages as seen
    await Message.updateMany(
      {
        chat: chatId,
        seenBy: { $ne: req.user._id },
      },
      {
        $addToSet: {
          seenBy: req.user._id,
        },
      }
    );
    const io = getIO();

io.to(chatId).emit(
  "messages-seen",
  {
    chatId,
    userId: req.user._id,
  }
);

    return res.status(200).json({
      success: true,
      message: "Messages marked as seen",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

exports.searchMessages = async (req, res) => {

  try {

    const { chatId } = req.params;
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }
    const chat = await Chat.findById(chatId);

if (!chat) {
    return res.status(404).json({
        success: false,
        message: "Chat not found",
    });
}

const isParticipant = chat.participants.some(member =>
    member.equals(req.user._id)
);

if (!isParticipant) {
    return res.status(403).json({
        success: false,
        message: "You are not a participant of this chat",
    });
}
    const messages = await Message.find({
      chat: chatId,
      text: {
        $regex: query,
        $options: "i",
      },
      deletedFor: {
        $ne: req.user._id,
      },
    })
      .populate("sender", "fullName username profilePic")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      message: "Messages fetched successfully",
      data: messages,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};

exports.toggleStarMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user._id;

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    const starred = message.starredBy.some(
      (id) => id.toString() === userId.toString()
    );

    if (starred) {
      message.starredBy = message.starredBy.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      message.starredBy.push(userId);
    }

    await message.save();

    return res.status(200).json({
      success: true,
      starred: !starred,
      message: starred
        ? "Message unstarred successfully"
        : "Message starred successfully",
      data: message,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


exports.togglePinMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    message.pinned = !message.pinned;

    await message.save();

    return res.status(200).json({
      success: true,
      message: message.pinned
        ? "Message pinned"
        : "Message unpinned",
      data: message,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


exports.getStarredMessages = async (req, res) => {
    try {
const messages = await Message.find({
  starredBy: req.user._id,
  deletedFor: { $ne: req.user._id },
  isDeletedForEveryone: false,
})
  .populate("sender", "fullName username profilePic")
  .populate({
    path: "chat",
    populate: {
      path: "participants",
      select: "fullName username profilePic isOnline",
    },
  })
  .sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            data: messages,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};


exports.getPinnedMessages = async (req, res) => {
    try {
        const { chatId } = req.params;

        const messages = await Message.find({
            chat: chatId,
            pinned: true,
            deletedFor: { $ne: req.user._id },
        })
            .populate("sender", "fullName username profilePic")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: messages,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

// =======================================
// Forward Message
// =======================================

exports.forwardMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { chatId } = req.body;

    if (!chatId) {
      return res.status(400).json({
        success: false,
        message: "Destination chat is required.",
      });
    }

    // Original message
    const originalMessage = await Message.findById(messageId);

    if (!originalMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found.",
      });
    }

    // Verify user belongs to destination chat
    const destinationChat = await Chat.findById(chatId);

    if (!destinationChat) {
      return res.status(404).json({
        success: false,
        message: "Destination chat not found.",
      });
    }

    const isParticipant = destinationChat.participants.some(
      (member) => member.toString() === req.user._id.toString()
    );

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    // Create forwarded message
    const forwardedMessage = await Message.create({
      chat: chatId,
      sender: req.user._id,
      text: originalMessage.text,
      attachments: originalMessage.attachments,
      mentions: [],
      isForwarded: true,
      forwardedFrom: originalMessage.sender,
      status: "sent",
    });

    const populatedMessage = await Message.findById(forwardedMessage._id)
      .populate("sender", "name username profilePicture")
      .populate("forwardedFrom", "name username profilePicture")
      .populate("replyTo");

    return res.status(201).json({
      success: true,
      message: "Message forwarded successfully.",
      data: populatedMessage,
    });

  } catch (error) {
    console.error("FORWARD MESSAGE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to forward message.",
      error: error.message,
    });
  }
};



// =======================================
// Reply Message
// =======================================

exports.replyMessage = async (req, res) => {
  try {
    const { chatId, text, attachments = [], replyTo } = req.body;

    if (!chatId || !replyTo) {
      return res.status(400).json({
        success: false,
        message: "Chat ID and reply message ID are required.",
      });
    }

    const hasText = text && text.trim().length > 0;

    if (!hasText && attachments.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Message must contain text or an attachment.",
      });
    }

    // Verify chat exists
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found.",
      });
    }

    // Verify user is participant
    const isParticipant = chat.participants.some(
      (member) => member.toString() === req.user._id.toString()
    );

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    // Verify original message exists
    const originalMessage = await Message.findById(replyTo);

    if (!originalMessage) {
      return res.status(404).json({
        success: false,
        message: "Original message not found.",
      });
    }

    // Create reply
    const message = await Message.create({
      chat: chatId,
      sender: req.user._id,
      text: text?.trim() || "",
      attachments,
      replyTo,
      status: "sent",
    });

    const populatedMessage = await Message.findById(message._id)
      .populate("sender", "name username profilePicture")
      .populate({
        path: "replyTo",
        populate: {
          path: "sender",
          select: "name username profilePicture",
        },
      });

    return res.status(201).json({
      success: true,
      message: "Reply sent successfully.",
      data: populatedMessage,
    });

  } catch (error) {
    console.error("REPLY MESSAGE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send reply.",
      error: error.message,
    });
  }
};