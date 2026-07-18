import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FiPaperclip } from "react-icons/fi";

const ChatItem = ({
  chat,
  currentUserId,
  onSelect,
  active,
}) => {
  const { onlineUsers = [] } = useSelector(
    (state) => state.socket || {}
  );

  const otherUser = chat.isGroupChat
    ? null
    : chat.participants.find(
        (user) => user._id !== currentUserId
      );

  const chatName = chat.isGroupChat
    ? chat.chatName
    : otherUser?.fullName || "Unknown User";

  const avatarLetter = chat.isGroupChat
    ? "👥"
    : chatName.charAt(0).toUpperCase();

  const isOnline =
    !chat.isGroupChat &&
    otherUser?._id &&
    onlineUsers.includes(otherUser._id);

  let lastMessage = "Start a conversation";

  if (chat.lastMessage) {
    if (chat.lastMessage.isDeletedForEveryone) {
      lastMessage = "🚫 Message deleted";
    } else if (chat.lastMessage.text) {
      lastMessage =
        chat.lastMessage.sender?._id === currentUserId
          ? `You: ${chat.lastMessage.text}`
          : chat.lastMessage.text;
    } else if (chat.lastMessage.attachment) {
      switch (chat.lastMessage.attachmentType) {
        case "image":
          lastMessage = "📷 Photo";
          break;
        case "video":
          lastMessage = "🎥 Video";
          break;
        case "audio":
          lastMessage = "🎤 Voice message";
          break;
        default:
          lastMessage = "📎 File";
      }
    }
  }

  const preview =
  lastMessage.length > 45
    ? `${lastMessage.slice(0, 45)}...`
    : lastMessage;

  const formatTime = (date) => {
  if (!date) return "";

  const messageDate = new Date(date);
  const now = new Date();

  const isToday =
    messageDate.toDateString() === now.toDateString();

  if (isToday) {
    return messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  if (
    messageDate.toDateString() ===
    yesterday.toDateString()
  ) {
    return "Yesterday";
  }

  const diff =
    (now - messageDate) / (1000 * 60 * 60 * 24);

  if (diff < 7) {
    return messageDate.toLocaleDateString([], {
      weekday: "short",
    });
  }

  return messageDate.toLocaleDateString([], {
    day: "numeric",
    month: "short",
  });
};

const time = formatTime(
  chat.lastMessage?.createdAt || chat.lastActivity
);

  const isPinned = chat.pinnedBy?.some(
    (id) => id.toString() === currentUserId
  );
   const unreadCount =
  chat.unreadCounts?.[currentUserId] || 0;
  return (
    <motion.div
      whileHover={{
        y: -2,
        scale: 1.015,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      onClick={() => onSelect(chat)}
      className={`
        group
        relative
        mb-3
        cursor-pointer
        overflow-hidden
        rounded-3xl
        border
        p-4
        transition-all
        duration-300

        ${
          active
            ? `
              border-cyan-500/30
              bg-gradient-to-r
              from-cyan-500/15
              to-blue-500/10
              shadow-[0_0_30px_rgba(34,211,238,0.18)]
            `
            : `
              border-transparent
              bg-white/[0.02]
              hover:border-white/10
              hover:bg-white/[0.05]
            `
        }
      `}
    >
      {active && (
        <motion.div
          layoutId="activeChat"
          className="
            absolute
            left-0
            top-5
            h-12
            w-1
            rounded-r-full
            bg-cyan-400
          "
        />
      )}

      <div className="flex items-center gap-4">

        {/* Avatar */}

        <div className="relative shrink-0">
          {otherUser?.profilePic ? (
            <img
              src={otherUser.profilePic}
              alt={chatName}
              className="
                h-14
                w-14
                rounded-full
                object-cover
                ring-2
                ring-white/10
              "
            />
          ) : (
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-cyan-500
                via-sky-500
                to-blue-600
                text-lg
                font-bold
                text-white
                shadow-lg
              "
            >
              {avatarLetter}
            </div>
          )}

          {!chat.isGroupChat && (
            <span
              className={`
                absolute
                bottom-0
                right-0
                h-4
                w-4
                rounded-full
                border-[3px]
                border-[#111827]

                ${
                  isOnline
                    ? "bg-green-400"
                    : "bg-slate-500"
                }
              `}
            />
          )}
        </div>

        {/* Content */}

        <div className="min-w-0 flex-1">

          <div className="flex items-start justify-between">

            <h3
              className={`
                truncate
                text-[15px]
                font-semibold

                ${
                  active
                    ? "text-cyan-300"
                    : "text-white"
                }
              `}
            >
              {chatName}
            </h3>

            <span className="ml-3 text-xs text-slate-500 whitespace-nowrap">
              {time}
            </span>

          </div>

          <div className="mt-2 flex items-center gap-2">

            {chat.lastMessage?.attachment && (
              <FiPaperclip className="text-slate-500" />
            )}

            <p className="truncate text-sm text-slate-400">
  {preview}
</p>

          </div>

        </div>

        <div className="ml-2 flex flex-col items-center gap-2">
  {isPinned && (
    <span className="text-base opacity-80">
      📌
    </span>
  )}

  {unreadCount > 0 && (
    <div
      className="
        flex
        min-h-5
        min-w-5
        items-center
        justify-center
        rounded-full
        bg-cyan-500
        px-1.5
        text-[11px]
        font-semibold
        text-white
      "
    >
      {unreadCount > 99 ? "99+" : unreadCount}
    </div>
  )}
</div>

      </div>
    </motion.div>
  );
};

export default ChatItem;