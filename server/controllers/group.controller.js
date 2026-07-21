const Chat = require("../models/Chat");
const User = require("../models/User");

exports.createGroup = async (req, res) => {

    try {

        const { chatName, participants } = req.body;
        const users = await User.find({
  _id: { $in: participants },
}).select("_id");

if (users.length !== participants.length) {
  return res.status(400).json({
    success: false,
    message: "One or more users do not exist.",
  });
}

        if (!chatName) {
            return res.status(400).json({
                success: false,
                message: "Group name is required",
            });
        }

        if (!participants || participants.length < 2) {
            return res.status(400).json({
                success: false,
                message: "Select at least 2 members",
            });
        }

        // Add creator
        const members = [
            ...new Set([
                req.user._id.toString(),
                ...participants,
            ]),
        ];

        const existingGroup = await Chat.findOne({
  isGroupChat: true,
  chatName: chatName.trim(),
  participants: req.user._id,
});

if (existingGroup) {
  return res.status(400).json({
    success: false,
    message: "You already have a group with this name.",
  });
}

        const group = await Chat.create({

            isGroupChat: true,

            chatName,

            participants: members,

            admins: [req.user._id],

        });

        const populatedGroup =
            await Chat.findById(group._id)
                .populate(
                    "participants",
                    "fullName username profilePic"
                )
                .populate(
                    "admins",
                    "fullName username profilePic"
                );

        return res.status(201).json({

            success: true,

            message: "Group created successfully",

            group: populatedGroup,

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: error.message,

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

    const user = await User.findById(userId);

if (!user) {
  return res.status(404).json({
    success: false,
    message: "User not found",
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


exports.getMyGroups = async (req, res) => {
  try {
    const groups = await Chat.find({
      isGroupChat: true,
      participants: req.user._id,
      isDeleted: false,
    })
      .populate("participants", "fullName username profilePic isOnline")
      .populate("admins", "fullName username profilePic")
      .populate({
        path: "lastMessage",
        populate: {
          path: "sender",
          select: "fullName username profilePic",
        },
      })
      .sort({ lastActivity: -1 });

    return res.status(200).json({
      success: true,
      groups,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getGroupDetails = async (req, res) => {
    try {

        const { chatId } = req.params;

        const group = await Chat.findById(chatId)
            .populate(
                "participants",
                "fullName username profilePic email isOnline"
            )
            .populate(
                "admins",
                "fullName username profilePic"
            )
            .populate({
                path: "lastMessage",
                populate: {
                    path: "sender",
                    select: "fullName username profilePic",
                },
            });

        if (!group || !group.isGroupChat) {
            return res.status(404).json({
                success: false,
                message: "Group not found",
            });
        }

        return res.status(200).json({
            success: true,
            group,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

exports.deleteGroup = async (req,res)=>{

    const {chatId}=req.params;

    const chat=await Chat.findById(chatId);

    if(!chat){
        return res.status(404).json({
            success:false,
            message:"Group not found"
        });
    }

    const isAdmin=chat.admins.some(
        admin=>admin.toString()===req.user._id.toString()
    );

    if(!isAdmin){
        return res.status(403).json({
            success:false,
            message:"Only admins can delete group"
        });
    }

    chat.isDeleted=true;

    await chat.save();

    return res.status(200).json({
        success:true,
        message:"Group deleted successfully"
    });

};