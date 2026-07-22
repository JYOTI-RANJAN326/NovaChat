const groq = require("../services/groq.services");
const AIChat = require("../models/AIChat");

const askAI = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        success: false,
        message: "Messages array is required",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are Nova AI, a helpful AI assistant inside NovaChat. Answer in Markdown. For code, always use fenced code blocks with the language.",
        },
        ...messages,
      ],
    });

    const reply = completion.choices[0].message.content;

    // Final conversation with AI reply
    const updatedMessages = [
      ...messages,
      {
        role: "assistant",
        content: reply,
      },
    ];

    // Save conversation
    await AIChat.findOneAndUpdate(
      { user: req.user._id },
      {
        user: req.user._id,
        messages: updatedMessages,
      },
      {
        upsert: true,
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      reply,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const codeChat = async (req, res) => {
  try {
    const { language, code, messages } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Code is required",
      });
    }

    const chatMessages = [
      {
        role: "system",
        content: `
You are Nova AI Coding Assistant.

Always answer ONLY using the supplied code.

Current Language:
${language}

Current Code:

${code}

You can:
- Find bugs
- Optimize code
- Explain code
- Convert language
- Dry run
- Explain complexity
- Suggest improvements

Always answer in markdown.
        `,
      },

      ...messages,
    ];

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: chatMessages,
    });

    return res.status(200).json({
      success: true,
      reply: completion.choices[0].message.content,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


const getChatHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    let chat = await AIChat.findOne({ user: userId });

    if (!chat) {
      chat = await AIChat.create({
        user: userId,
        messages: [],
      });
    }

    return res.status(200).json({
      success: true,
      messages: chat.messages,
    });
  } catch (error) {
    console.error("GET CHAT HISTORY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch chat history",
    });
  }
};


const clearChatHistory = async (req, res) => {
  try {
    await AIChat.findOneAndDelete({
      user: req.user._id,
    });

    return res.status(200).json({
      success: true,
      message: "Chat history cleared successfully.",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
    askAI,
    codeChat,
    getChatHistory,
    clearChatHistory,
};