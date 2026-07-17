const fs = require("fs");
const cloudinary = require("../config/cloudinary");

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file selected",
      });
    }

    const result = await cloudinary.uploader.upload(
      req.file.path,
      {
        resource_type: "auto",
        folder: "NovaChat",
      }
    );

    fs.unlinkSync(req.file.path);

   return res.status(200).json({
  success: true,
  message: "File uploaded successfully",
  data: {
    url: result.secure_url,
    fileName: req.file.originalname,
    size: req.file.size,
    mimeType: req.file.mimetype,

    // New
    duration: result.duration || 0,

    // New
    publicId: result.public_id,

    // New
    resourceType: result.resource_type,
  },
});

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Upload Failed",
    });

  }
};