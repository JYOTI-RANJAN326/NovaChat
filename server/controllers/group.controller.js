const Chat = require("../models/Chat");
const User = require("../models/User");

exports.createGroup = async (req, res) => {
  try {
    let { chatName, participants } = req.body;

    // Validation
    if (!chatName || !participants) {
      return res.status(400).json({
        success: false,
        message: "Group name and participants are required",
      });
    }

    // participants should be an array
    if (!Array.isArray(participants)) {
      return res.status(400).json({
        success: false,
        message: "Participants must be an array",
      });
    }

    // Remove duplicate IDs
    participants = [...new Set(participants)];

    // Remove creator if frontend accidentally sends it
    participants = participants.filter(
      (id) => id !== req.user._id.toString()
    );

    // Minimum members (creator + 2 others)
    if (participants.length < 2) {
      return res.status(400).json({
        success: false,
        message: "A group must have at least 3 members including you",
      });
    }

    // Verify all users exist
    const users = await User.find({
      _id: { $in: participants },
    });

    if (users.length !== participants.length) {
      return res.status(404).json({
        success: false,
        message: "One or more users not found",
      });
    }

    // Add creator
    participants.push(req.user._id);

    // Create group
    let group = await Chat.create({
      isGroupChat: true,
      chatName,
      participants,
      admins: [req.user._id],
    });

    // Populate
    group = await Chat.findById(group._id)
      .populate("participants", "-password")
      .populate("admins", "-password");

    return res.status(201).json({
      success: true,
      message: "Group created successfully",
      group,
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
    const { groupId } = req.params;
    const { chatName } = req.body;

    if (!chatName) {
      return res.status(400).json({
        success: false,
        message: "Group name is required",
      });
    }

    const group = await Chat.findById(groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    if (!group.isGroupChat) {
      return res.status(400).json({
        success: false,
        message: "This is not a group chat",
      });
    }

    // Only admins can rename
   const isAdmin = group.admins.some((adminId) =>
  adminId.equals(req.user._id)
);

if (!isAdmin) {
  return res.status(403).json({
    success: false,
    message: "Only admins can rename the group",
  });
}

    group.chatName = chatName;

    await group.save();

    const updatedGroup = await Chat.findById(groupId)
      .populate("participants", "-password")
      .populate("admins", "-password");

    res.status(200).json({
      success: true,
      message: "Group renamed successfully",
      group: updatedGroup,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};   




exports.addMembers = async (req, res) => {
  try {

    const { groupId } = req.params;
    const { participants } = req.body;

    if (!participants || !participants.length) {
      return res.status(400).json({
        success: false,
        message: "Participants are required",
      });
    }

    const group = await Chat.findById(groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    const isAdmin = group.admins.some((adminId) =>
  adminId.equals(req.user._id)
);

if (!isAdmin) {
  return res.status(403).json({
    success: false,
    message: "Only admins can add members",
  });
}

    const users = await User.find({
      _id: { $in: participants },
    });

    if (users.length !== participants.length) {
      return res.status(404).json({
        success: false,
        message: "Some users not found",
      });
    }

   participants.forEach((id) => {
  const alreadyExists = group.participants.some((memberId) =>
    memberId.equals(id)
  );

  if (!alreadyExists) {
    group.participants.push(id);
  }
});

    await group.save();

    const updatedGroup = await Chat.findById(groupId)
      .populate("participants", "-password")
      .populate("admins", "-password");

    res.status(200).json({
      success: true,
      message: "Members added successfully",
      group: updatedGroup,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};



exports.removeMember = async (req, res) => {
  try {

    const { groupId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const group = await Chat.findById(groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    if (!group.isGroupChat) {
      return res.status(400).json({
        success: false,
        message: "This is not a group",
      });
    }

    // Check Admin
    const isAdmin = group.admins.some(adminId =>
      adminId.equals(req.user._id)
    );

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Only admins can remove members",
      });
    }

    // Don't allow removing another admin
    const targetIsAdmin = group.admins.some(adminId =>
      adminId.equals(userId)
    );

    if (targetIsAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin cannot be removed. Demote first.",
      });
    }

    // check user is part of the group
    const isMember = group.participants.some(memberId =>
  memberId.equals(userId)
);

if (!isMember) {
  return res.status(404).json({
    success: false,
    message: "User is not a member of this group",
  });
}

    // Remove member
    group.participants = group.participants.filter(
      memberId => !memberId.equals(userId)
    );

    await group.save();

    const updatedGroup = await Chat.findById(groupId)
      .populate("participants", "-password")
      .populate("admins", "-password");

    return res.status(200).json({
      success: true,
      message: "Member removed successfully",
      group: updatedGroup,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};



// leave the group
exports.leaveGroup = async (req, res) => {
  try {

    const { groupId } = req.params;

    const group = await Chat.findById(groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    if (!group.isGroupChat) {
      return res.status(400).json({
        success: false,
        message: "This is not a group",
      });
    }

    // Check participant
    const isParticipant = group.participants.some(memberId =>
      memberId.equals(req.user._id)
    );

    if (!isParticipant) {
      return res.status(400).json({
        success: false,
        message: "You are not a member of this group",
      });
    }

    // Remove participant
    group.participants = group.participants.filter(
      memberId => !memberId.equals(req.user._id)
    );

    // Remove from admins if admin
    group.admins = group.admins.filter(
      adminId => !adminId.equals(req.user._id)
    );

    // If no participants left → delete group
    if (group.participants.length === 0) {

      await Chat.findByIdAndDelete(groupId);

      return res.status(200).json({
        success: true,
        message: "Group deleted as no members remain",
      });

    }

    // If no admin left → make first participant admin
    if (group.admins.length === 0) {
      group.admins.push(group.participants[0]);
    }

    await group.save();

    const updatedGroup = await Chat.findById(groupId)
      .populate("participants", "-password")
      .populate("admins", "-password");

    return res.status(200).json({
      success: true,
      message: "You left the group successfully",
      group: updatedGroup,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};


// Make Admin API
exports.makeAdmin = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const group = await Chat.findById(groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    if (!group.isGroupChat) {
      return res.status(400).json({
        success: false,
        message: "This is not a group",
      });
    }

    const isAdmin = group.admins.some(admin =>
      admin.equals(req.user._id)
    );

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Only admins can assign admin",
      });
    }

    const isMember = group.participants.some(member =>
      member.equals(userId)
    );

    if (!isMember) {
      return res.status(404).json({
        success: false,
        message: "User is not a group member",
      });
    }

    const alreadyAdmin = group.admins.some(admin =>
      admin.equals(userId)
    );

    if (alreadyAdmin) {
      return res.status(400).json({
        success: false,
        message: "User is already an admin",
      });
    }

    group.admins.push(userId);

    await group.save();

    const updatedGroup = await Chat.findById(groupId)
      .populate("participants", "-password")
      .populate("admins", "-password");

    return res.status(200).json({
      success: true,
      message: "Admin assigned successfully",
      group: updatedGroup,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// remove admin
exports.removeAdmin = async (req, res) => {
  try {

    const { groupId } = req.params;
    const { userId } = req.body;

    const group = await Chat.findById(groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    const isAdmin = group.admins.some(admin =>
      admin.equals(req.user._id)
    );

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Only admins can remove admin",
      });
    }

    // Prevent removing yourself
    if (req.user._id.equals(userId)) {
      return res.status(400).json({
        success: false,
        message: "Use Leave Group instead",
      });
    }

    group.admins = group.admins.filter(
      admin => !admin.equals(userId)
    );

    if (group.admins.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one admin is required",
      });
    }

    await group.save();

    const updatedGroup = await Chat.findById(groupId)
      .populate("participants", "-password")
      .populate("admins", "-password");

    return res.status(200).json({
      success: true,
      message: "Admin removed successfully",
      group: updatedGroup,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// delete group api
exports.deleteGroup = async (req, res) => {
  try {

    const { groupId } = req.params;

    const group = await Chat.findById(groupId);

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    const isAdmin = group.admins.some(admin =>
      admin.equals(req.user._id)
    );

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Only admins can delete the group",
      });
    }

    await Chat.findByIdAndDelete(groupId);

    return res.status(200).json({
      success: true,
      message: "Group deleted successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};