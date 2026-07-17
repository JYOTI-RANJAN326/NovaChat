import { useState } from "react";
import {
  FiPhone,
  FiVideo,
  FiMoreVertical,
} from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

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

  const handleCall = () => {
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

    socket.emit("call-user", {
      callerId: user._id,
      callerName: user.fullName,
      receiverId: otherUser._id,
    });

    dispatch(
      setOutgoingCall({
        receiverId: otherUser._id,
        receiverName: otherUser.fullName,
      })
    );
  };

  return (
    <>
      <div
        className="
          flex
          h-[82px]
          items-center
          justify-between
          border-b
          border-white/10
          bg-[#0B1324]
          px-8
        "
      >
        {/* Left */}
        <div
          onClick={() =>
            chat.isGroupChat && setShowGroupInfo(true)
          }
          className={`flex items-center gap-4 ${
            chat.isGroupChat ? "cursor-pointer" : ""
          }`}
        >
          {/* Avatar */}
          <div className="relative">
            {chat.isGroupChat ? (
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
                  to-blue-600
                  text-2xl
                  text-white
                "
              >
                👥
              </div>
            ) : otherUser?.profilePic ? (
              <img
                src={otherUser.profilePic}
                alt={chatName}
                className="h-14 w-14 rounded-full object-cover"
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
                  to-blue-600
                  text-lg
                  font-bold
                  text-white
                "
              >
                {chatName.charAt(0).toUpperCase()}
              </div>
            )}

            {!chat.isGroupChat && (
              <div
                className={`
                  absolute
                  bottom-0
                  right-0
                  h-3.5
                  w-3.5
                  rounded-full
                  border-2
                  border-[#0B1324]
                  ${
                    isOnline
                      ? "bg-green-400"
                      : "bg-slate-500"
                  }
                `}
              />
            )}
          </div>

          {/* Info */}
          <div>
            <h2 className="text-lg font-bold text-white">
              {chatName}
            </h2>

            {chat.isGroupChat ? (
              <p className="text-sm text-slate-400">
                {participants.length} Members
              </p>
            ) : (
              <p
                className={`text-sm ${
                  isOnline
                    ? "text-green-400"
                    : "text-slate-400"
                }`}
              >
                {isOnline ? "Online" : "Offline"}
              </p>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCall}
            disabled={chat.isGroupChat || !otherUser}
            className="
              rounded-xl
              p-3
              text-slate-400
              transition
              hover:bg-white/5
              hover:text-cyan-400
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <FiPhone className="text-xl" />
          </button>

          <button
            className="
              rounded-xl
              p-3
              text-slate-400
              transition
              hover:bg-white/5
              hover:text-cyan-400
            "
          >
            <FiVideo className="text-xl" />
          </button>

          <button
            className="
              rounded-xl
              p-3
              text-slate-400
              transition
              hover:bg-white/5
              hover:text-cyan-400
            "
          >
            <FiMoreVertical className="text-xl" />
          </button>
        </div>
      </div>

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