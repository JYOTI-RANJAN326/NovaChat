const Chat = require("../models/Chat");
const User = require("../models/User");

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

      // ✅ Check if receiver exists (ADD HERE)
    const receiver = await User.findById(receiverId);

    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if chat already exists
   let chat = await Chat.findOne({
  isGroupChat: false,
  participants: {
    $all: [req.user._id, receiverId],
  },
}).populate("participants", "-password");

    if (chat) {
      return res.status(200).json({
        success: true,
        chat,
      });
    }

    // Create new chat
    chat = await Chat.create({
      participants: [req.user._id, receiverId],
    });

    chat = await Chat.findById(chat._id)
      .populate("participants", "-password");

    res.status(201).json({
      success: true,
      message: "Chat created successfully",
      chat,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


exports.getMyChats = async (req, res) => {
  try {

    const chats = await Chat.find({
      participants: req.user._id,
    })
      .populate("participants", "-password")
      .populate({
        path: "lastMessage",
        populate: {
          path: "sender",
          select: "fullName username profilePic",
        },
      })
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      chats,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};