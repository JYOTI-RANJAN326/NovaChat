import { useState } from "react";
import {
  FiPhone,
  FiVideo,
  FiMoreVertical,
} from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import GroupInfo from "./GroupInfo";
import { socket } from "../../services/socket";
import { setOutgoingCall } from "../../slices/callSlice";

const ChatHeader = ({ chat, refreshChat }) => {
  const { user } = useSelector((state) => state.auth);
  const { onlineUsers = [] } = useSelector((state) => state.socket);

  const dispatch = useDispatch();

  const [showGroupInfo, setShowGroupInfo] = useState(false);

  // Don't render until chat is available
  if (!chat) return null;

  // Support both participants and users
  const participants = chat.participants || chat.users || [];

  const otherUser = chat.isGroupChat
    ? null
    : participants.find((u) => u._id !== user?._id);

  const chatName = chat.isGroupChat
    ? chat.chatName
    : otherUser?.fullName || "Unknown User";

  const isOnline =
    !chat.isGroupChat &&
    otherUser &&
    onlineUsers.includes(otherUser._id);
if (!isOnline) {
    toast.error("User is offline.");
    return;
}

    const formatLastSeen = (lastSeen) => {
  if (!lastSeen) return "Offline";

  const date = new Date(lastSeen);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const isYesterday =
    date.toDateString() === yesterday.toDateString();

  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isToday) {
    return `Last seen today at ${time}`;
  }

  if (isYesterday) {
    return `Last seen yesterday at ${time}`;
  }

  return `Last seen ${date.toLocaleDateString()} ${time}`;
};

  const handleCall = (callType = "audio") => {
    if (!chat) return;

    if (chat.isGroupChat) {
      toast.error("Voice calls are only available for personal chats.");
      return;
    }

    if (!otherUser) {
      console.error("Receiver not found:", chat);
      toast.error("Unable to start call.");
      return;
    }
dispatch(
  setOutgoingCall({
    receiverId: otherUser._id,
    receiverName: otherUser.fullName,
    callType,
  })
);


   socket.emit("call-user", {
  callerId: user._id,
  callerName: user.fullName,
  receiverId: otherUser._id,
  callType,
});

   
  };

  return (
  <>
    <header
      className="
        sticky
        top-0
        z-30
        flex
        h-[88px]
        items-center
        justify-between
        border-b
        border-white/10
        bg-[#08111F]/80
        px-8
        backdrop-blur-3xl
      "
    >
      {/* LEFT */}

      <motion.div
        whileHover={{ x: 2 }}
        onClick={() =>
          chat.isGroupChat && setShowGroupInfo(true)
        }
        className={`flex items-center gap-5 ${
          chat.isGroupChat ? "cursor-pointer" : ""
        }`}
      >
        {/* Avatar */}

        <div className="relative">

          {chat.isGroupChat ? (
            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-cyan-400
                via-sky-500
                to-blue-600
                text-3xl
                text-white
                shadow-[0_0_35px_rgba(34,211,238,.35)]
              "
            >
              👥
            </div>
          ) : otherUser?.profilePic ? (
            <img
              src={otherUser.profilePic}
              alt={chatName}
              className="
                h-16
                w-16
                rounded-2xl
                object-cover
                ring-2
                ring-cyan-500/20
              "
            />
          ) : (
            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-cyan-400
                via-sky-500
                to-blue-600
                text-2xl
                font-bold
                text-white
                shadow-[0_0_35px_rgba(34,211,238,.35)]
              "
            >
              {chatName.charAt(0).toUpperCase()}
            </div>
          )}

          {!chat.isGroupChat && (
            <span
              className={`
                absolute
                bottom-1
                right-1
                h-4
                w-4
                rounded-full
                ring-4
                ring-[#08111F]
                ${
                  isOnline
                    ? "bg-emerald-400"
                    : "bg-slate-500"
                }
              `}
            />
          )}
        </div>

        {/* Info */}

        <div>

          <h2 className="text-xl font-bold text-white">
            {chatName}
          </h2>

          {chat.isGroupChat ? (
            <div className="mt-1 flex items-center gap-2">

              <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
                Group
              </span>

              <span className="text-sm text-slate-400">
                {participants.length} Members
              </span>

            </div>
          ) : (
            <div className="mt-1 flex items-center gap-2">

              <span
                className={`
                  h-2
                  w-2
                  rounded-full
                  ${
                    isOnline
                      ? "bg-emerald-400"
                      : "bg-slate-500"
                  }
                `}
              />

             <span
  className={`text-sm font-medium ${
    isOnline
      ? "text-emerald-400"
      : "text-slate-400"
  }`}
>
 {isOnline
  ? "🟢 Online"
  : `🕒 ${formatLastSeen(otherUser?.lastSeen)}`}
</span>

            </div>
          )}

        </div>
      </motion.div>

      {/* RIGHT */}

      <div className="flex items-center gap-3">

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleCall("audio")}
          disabled={chat.isGroupChat || !otherUser}
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            border
            border-white/10
            bg-white/5
            text-slate-300
            backdrop-blur-xl
            transition-all
            hover:border-cyan-500/30
            hover:bg-cyan-500/10
            hover:text-cyan-300
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <FiPhone className="text-lg" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleCall("video")}
           disabled={chat.isGroupChat || !otherUser}
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            border
            border-white/10
            bg-white/5
            text-slate-300
            backdrop-blur-xl
            transition-all
            hover:border-cyan-500/30
            hover:bg-cyan-500/10
            hover:text-cyan-300
          "
        >
          <FiVideo className="text-lg" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            border
            border-white/10
            bg-white/5
            text-slate-300
            backdrop-blur-xl
            transition-all
            hover:border-cyan-500/30
            hover:bg-cyan-500/10
            hover:text-cyan-300
          "
        >
          <FiMoreVertical className="text-lg" />
        </motion.button>

      </div>
    </header>

    {showGroupInfo && (
      <GroupInfo
        chat={chat}
        refreshChat={refreshChat}
        onClose={() => setShowGroupInfo(false)}
      />
    )}
  </>
);
};

export default ChatHeader;