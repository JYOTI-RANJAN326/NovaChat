import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat } from "../../../slices/chatSlice";

function ChatItem({ chat }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { selectedChat } = useSelector((state) => state.chat);

  const isSelected = selectedChat?._id === chat._id;

  // Find other user in one-to-one chat
  const otherUser = chat.isGroupChat
    ? null
    : chat.participants.find(
        (participant) => participant._id !== user?._id
      );

  const chatName = chat.isGroupChat
    ? chat.chatName
    : otherUser?.fullName || "Unknown User";

  const avatar = chat.isGroupChat
    ? "https://ui-avatars.com/api/?name=Group"
    : otherUser?.profilePic ||
      "https://ui-avatars.com/api/?name=User";

  const lastMessage = chat.lastMessage?.content || "No messages yet";

  const time = chat.lastMessage?.createdAt
    ? new Date(chat.lastMessage.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div
      onClick={() => dispatch(setSelectedChat(chat))}
      className={`
        mx-3
        mb-2
        cursor-pointer
        rounded-2xl
        p-4
        transition-all
        duration-300

        ${
          isSelected
            ? "bg-cyan-500/10 border border-cyan-500/20"
            : "hover:bg-slate-800/60"
        }
      `}
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}

        <div className="relative">

          <img
            src={avatar}
            alt={chatName}
            className="h-14 w-14 rounded-full object-cover"
          />

          {!chat.isGroupChat && otherUser?.isOnline && (
            <span
              className="
              absolute
              bottom-0
              right-0
              h-3
              w-3
              rounded-full
              bg-green-500
              border-2
              border-[#0A1022]
              "
            />
          )}
        </div>

        {/* Chat Info */}

        <div className="flex-1 overflow-hidden">

          <div className="flex items-center justify-between">

            <h2 className="truncate font-semibold text-white">
              {chatName}
            </h2>

            <span className="text-xs text-slate-500">
              {time}
            </span>

          </div>

          <p className="truncate text-sm text-slate-400 mt-1">
            {lastMessage}
          </p>

        </div>
      </div>
    </div>
  );
}

export default ChatItem;