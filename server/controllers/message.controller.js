const Chat = require("../models/Chat");
const Message = require("../models/Message");



exports.sendMessage = async (req, res) => {
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

  const hasText = text && text.trim().length > 0;// prevents user from send blank messages

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
    const isParticipant = chat.participants.some(member =>
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

  // Reply must belong to same chat
  if (!repliedMessage.chat.equals(chat._id)) {
    return res.status(400).json({
      success: false,
      message: "Reply message belongs to another chat",
    });
  }

  // Cannot reply to deleted message
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

    });

    chat.lastMessage = message._id;

    await chat.save();

    const populatedMessage = await Message.findById(message._id)
      .populate("sender", "-password")
      .populate("replyTo");

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
  try {

    const { chatId } = req.params;

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
      .populate("sender", "fullName username profilePic")
      .populate({
  path: "replyTo",
  select: "text sender isDeletedForEveryone attachments",
  populate: {
    path: "sender",
    select: "fullName username profilePic",
  },
})
      .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      messages,
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
  // limited time to edit the message after sending it, for example 15 minutes
   const EDIT_WINDOW =
  Number(process.env.EDIT_WINDOW_MINUTES) * 60 * 1000;// 15 minutes

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

    const message = await Message.findById(messageId);

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

    await message.save();

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

    // Check if user already reacted
    const existingReactionIndex = message.reactions.findIndex(
      (reaction) => reaction.user.equals(req.user._id)
    );

    if (existingReactionIndex !== -1) {

      // Same emoji -> remove reaction
      if (
        message.reactions[existingReactionIndex].emoji === emoji
      ) {

        message.reactions.splice(existingReactionIndex, 1);

      } else {

        // Different emoji -> update reaction
        message.reactions[existingReactionIndex].emoji = emoji;

      }

    } else {

      // New reaction
      message.reactions.push({
        user: req.user._id,
        emoji,
      });

    }

    await message.save();

    const updatedMessage = await Message.findById(messageId)
      .populate("sender", "fullName username profilePic");

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