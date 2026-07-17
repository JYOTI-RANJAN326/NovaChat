const Chat = require("../models/Chat");

// ==============================
// Get Recent Chats
// ==============================
exports.getRecentChats = async (userId) => {

    return await Chat.find({

        participants: userId,

        deletedFor: {
            $ne: userId,
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

};

// ==============================
// Search Chats
// ==============================
exports.searchChats = async (userId, query) => {

    return await Chat.find({

        participants: userId,

        deletedFor: {
            $ne: userId,
        },

        chatName: {
            $regex: query,
            $options: "i",
        },

    })
    .populate("participants", "-password")
    .populate("admins", "-password");

};

// ==============================
// Find Chat By Id
// ==============================
exports.findChatById = async (chatId) => {

    return await Chat.findById(chatId);

};

// ==============================
// Save Chat
// ==============================
exports.saveChat = async (chat) => {

    return await chat.save();

};