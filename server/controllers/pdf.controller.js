const fs = require("fs");
const pdfParse = require("pdf-parse");
const groq = require("../services/groq.services");
const PDFChat = require("../models/PDFChat");

// Upload PDF
const uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF.",
      });
    }

    const pdfBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(pdfBuffer);

    const pdf = await PDFChat.create({
      user: req.user.id,
      fileName: req.file.originalname,
      pdfText: pdfData.text,
    });

    fs.unlinkSync(req.file.path);

    return res.status(200).json({
      success: true,
      pdfId: pdf._id,
      fileName: pdf.fileName,
    });
  } catch (err) {
    console.error(err);

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Chat with uploaded PDF
const askPDF = async (req, res) => {
  try {
    const { pdfId, messages } = req.body;

    const pdf = await PDFChat.findOne({
      _id: pdfId,
      user: req.user.id,
    });

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found.",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are Nova AI.

Answer ONLY using the uploaded PDF.

If the answer is not present in the PDF, clearly say that the information is not available.

PDF Content:

${pdf.pdfText}`,
        },
        ...messages,
      ],
    });

    return res.status(200).json({
      success: true,
      reply: completion.choices[0].message.content,
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
  uploadPDF,
  askPDF,
};