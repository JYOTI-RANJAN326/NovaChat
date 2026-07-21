import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FiSmile,
  FiPaperclip,
  FiMic,
  FiSend,
  FiX,
} from "react-icons/fi";
import { uploadFile } from "../../services/uploadAPI";
import EmojiPicker from "emoji-picker-react";
import {
  sendMessage,
  editMessage as editMessageAPI,
} from "../../services/messageAPI";
import { socket } from "../../services/socket";
import ReplyPreview from "./ReplyPreview";
import { useDispatch, useSelector } from "react-redux";
import { clearReply } from "../../slices/replySlice";
import {
  clearEditMessage,
} from "../../slices/editMessageSlice";
import EditPreview from "./EditPreview";
import VoiceRecorder from "./VoiceRecorder";

// import { uploadFile } from "../../services/uploadAPI"; // Enable after creating upload API

const MessageInput = ({ chat }) => {
  console.log("MessageInput chat:", chat);
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

const { message: replyMessage } = useSelector(
  (state) => state.reply
);
const { message: editMessage } = useSelector(
  (state) => state.editMessage
);

  const fileInputRef = useRef(null);
  const emojiRef = useRef(null);
  const textAreaRef = useRef(null);

const typingTimeoutRef = useRef(null);
  // ===============================
  // Typing
  // ===============================

  const handleTyping = (value) => {
    setMessage(value);

    if (!chat?._id) return;

    socket.emit("typing", {
  chatId: chat._id,
});
  
    clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
     
  socket.emit("stop-typing", {
    chatId: chat._id,
  });
}, 1000);
  };

  // ===============================
  // File Selection
  // ===============================

 const handleFile = (e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  // Max 20 MB
  if (file.size > 20 * 1024 * 1024) {
    alert("Maximum file size is 20MB.");
    return;
  }

  setSelectedFile(file);
};
const removeFile = () => {
  setSelectedFile(null);

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};  



const handleVoiceRecording = async (audioBlob) => {
  try {
    setLoading(true);

    // Convert Blob → File
    const audioFile = new File(
      [audioBlob],
      `voice-${Date.now()}.webm`,
      {
        type: audioBlob.type,
      }
    );
    
    // Upload to Cloudinary
    const uploadResponse = await uploadFile(audioFile);
    if (!uploadResponse.success) {
  throw new Error("Upload failed");
}
    const attachment = {
      url: uploadResponse.data.url,
      fileName: uploadResponse.data.fileName,
      size: uploadResponse.data.size,
      mimeType: uploadResponse.data.mimeType,
      duration: uploadResponse.data.duration || 0,
      type: "audio",
    };

//     const payload = {
//   chatId: chat._id,
//   text: message,
//   attachments: attachment ? [attachment] : [],
//   replyTo: replyMessage?._id,
// };

// console.log("Sending payload:", payload);

// await sendMessage(payload);

//     // Send as chat message
//    await sendMessage({
//   chatId: chat._id,
//   text: message,
//   attachments: attachment ? [attachment] : [],
//   replyTo: replyMessage?._id,
// });

const textToSend = message;

console.log("message state:", message);
console.log("textToSend:", textToSend);

const payload = {
  chatId: chat._id,
  text: textToSend,
  attachments: attachment ? [attachment] : [],
  replyTo: replyMessage?._id,
};

console.log("Payload:", payload);

await sendMessage(payload);

    dispatch(clearReply());




   } catch (error) {

    console.log(error);

  
  
  }finally {

    setLoading(false);

  }
};
 
  // ===============================
  // Send Message
  // ===============================
  

  const handleSend = async () => {
    
   if (!chat?._id) return;

if (!message.trim() && !selectedFile) return;

    try {
      setLoading(true);

    let attachment = null;
  

if (selectedFile) {
  console.log("Uploading file...");
  const uploadResponse = await uploadFile(selectedFile);
  console.log("Upload Response:", uploadResponse);

  attachment = {
    url: uploadResponse.data.url,
    fileName: uploadResponse.data.fileName,
    size: uploadResponse.data.size,
    mimeType: uploadResponse.data.mimeType,
    type: uploadResponse.data.mimeType.startsWith("image")
      ? "image"
      : uploadResponse.data.mimeType.startsWith("video")
      ? "video"
      : uploadResponse.data.mimeType.startsWith("audio")
      ? "audio"
      : "document",
  };
}
    
    

     if (editMessage) {

  await editMessageAPI(
    editMessage._id,
    message
  );

  dispatch(clearEditMessage());

} else {

 await sendMessage({
  chatId: chat._id,
  text: message,
  attachments: attachment ? [attachment] : [],
  replyTo: replyMessage?._id,
});
}

  dispatch(clearReply());



clearTimeout(typingTimeoutRef.current);

socket.emit("stop-typing", {
  chatId: chat._id,
});
setMessage("");
setShowEmojiPicker(false);
removeFile();

textAreaRef.current?.focus();
} catch (error) {
      console.log(error);
} finally {
      setLoading(false);
}
  
};
  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      emojiRef.current &&
      !emojiRef.current.contains(event.target)
    ) {
      setShowEmojiPicker(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);


useEffect(() => {
  if (replyMessage) {
    textAreaRef.current?.focus();
  }
}, [replyMessage]);

useEffect(() => {
  if (editMessage) {
    setMessage(editMessage.text);
    textAreaRef.current?.focus();
  }
}, [editMessage]);
useEffect(() => {
  return () => {
    clearTimeout(typingTimeoutRef.current);
  };
}, []);

  return (
<div
  className="
    mt-auto
    border-t
    border-slate-800/60
    bg-[#08111F]/85
    backdrop-blur-2xl
    px-6
    py-5
    shadow-[0_-10px_40px_rgba(0,0,0,0.35)]
  "
>
          {/* <ReplyPreview />
          <EditPreview /> */}
      {/* {Selected File } */}

     {selectedFile && (
  <div
    className="
      mb-3
      flex
      items-center
      justify-between
      rounded-2xl
      border
      border-slate-700
      bg-[#111C2F]/90
      px-4
      py-3
    "
  >
    <div className="truncate text-sm text-white">
      📎 {selectedFile.name}
    </div>

    <button
      onClick={removeFile}
      className="rounded-full p-2 text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
    >
      <FiX />
    </button>
  </div>
)}

      <div
       className="
  flex
  items-end
  gap-3
  rounded-[28px]
  border
  border-slate-700/70
  bg-[#121C2F]/90
  px-5
  py-3
  shadow-xl
  transition-all
  duration-300
  focus-within:border-cyan-400/60
  focus-within:shadow-cyan-500/20
"
      >
        {/* Emoji */}
<div
  ref={emojiRef}
  className="relative"
>
  <button
    type="button"
    title="Emoji"
    onClick={() =>
      setShowEmojiPicker((prev) => !prev)
    }
    disabled={loading}
    className="
      rounded-full
      p-2
      text-slate-400
      transition
      hover:bg-white/5
      hover:text-cyan-400
      disabled:opacity-50
    "
  >
    <FiSmile className="text-2xl" />
  </button>

  {showEmojiPicker && (
    <div className="absolute bottom-16 left-0 z-50">

      <EmojiPicker
        theme="dark"
        lazyLoadEmojis
        searchDisabled={false}
        skinTonesDisabled
        width={320}
        height={420}
        onEmojiClick={(emojiData) => {
          setMessage(
            (prev) => prev + emojiData.emoji
          );
        }}
      />

    </div>
  )}
</div>

        {/* Attachment */}

       <button
  type="button"
  title="Attach File"
  disabled={loading}
  onClick={() => fileInputRef.current?.click()}
  className="
    rounded-full
    p-2
    text-slate-400
    transition
    hover:bg-white/5
    hover:text-cyan-400
    disabled:opacity-50
  "
>
  
  <FiPaperclip className="text-2xl" />
</button>

<input
  type="file"
  hidden
  ref={fileInputRef}
  onChange={handleFile}
  accept="
    image/*,
    video/*,
    audio/*,
    .pdf,
    .doc,
    .docx,
    .ppt,
    .pptx,
    .xls,
    .xlsx,
    .zip
  "
/>

        {/* Textarea */}

        <textarea
        ref={textAreaRef}
          rows={1}
          value={message}
          placeholder="Type a message..."
          onChange={(e) => handleTyping(e.target.value)}
         className="
  max-h-40
  flex-1
  resize-none
  bg-transparent
  py-2
  text-[15px]
  leading-7
  text-white
  placeholder:text-slate-500
  focus:outline-none
"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        {/* Voice */}

      <VoiceRecorder
  onRecordingComplete={
    handleVoiceRecording
  }
/>
        {/* Send */}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          onClick={handleSend}
         className="
  flex
  h-12
  w-12
  items-center
  justify-center
  rounded-full
  bg-gradient-to-br
  from-cyan-400
  via-cyan-500
  to-blue-600
  text-white
  shadow-xl
  transition-all
  duration-300
  hover:shadow-cyan-500/40
  hover:scale-110
  disabled:opacity-50
"
        >
          {loading ? (
            <span className="text-sm font-bold">...</span>
          ) : (
            <FiSend className="text-xl" />
          )}
        </motion.button>

      </div>
    </div>
  );
};

export default MessageInput; 
