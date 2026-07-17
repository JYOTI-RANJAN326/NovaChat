import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MessageMenu from "./MessageMenu";
import { setReply } from "../../slices/replySlice";
import ReactionPicker from "./ReactionPicker";
import { setEditMessage } from "../../slices/editMessageSlice";
import { toggleStarMessage } from "../../services/messageAPI";
import {
  toggleReaction,
  deleteForMe,
  deleteForEveryone,
} from "../../services/messageAPI";
import {
  togglePinMessage,
} from "../../services/messageAPI";
import VoiceMessage from "./VoiceMessage";

const MessageBubble = ({
  message,
  refreshMessages,
}) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [showMenu, setShowMenu] = useState(false);
  const [showReaction, setShowReaction] =
  useState(false);

  const menuRef = useRef(null);

  const isMe = message.sender?._id === user?._id;

  // ===========================
  // Copy Message
  // ===========================

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text || "");
    setShowMenu(false);
  };

  // ===========================
  // Close Menu Outside
  // ===========================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div
      className={`mb-5 flex ${
        isMe ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className="relative"
        onContextMenu={(e) => {
          e.preventDefault();
          setShowMenu(true);
        }}
      >
        {/* Message Bubble */}

        <div
          className={`
           max-w-fit
          min-w-[120px]
          max-w-[75%] lg:max-w-[65%] 
            rounded-3xl
            px-5
            py-3
            shadow-lg

            ${
              isMe
                ? "rounded-br-md bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                : "rounded-bl-md bg-[#111C2F] text-slate-200"
            }
          `}
        >
        {/* Reply Preview */}

{message.replyTo && (
  <div
    className={`
      mb-8
      rounded-xl
      border-l-4
      px-3
      py-2
      text-sm

      ${
        isMe
          ? "border-cyan-200 bg-white/10"
          : "border-cyan-500 bg-white/5"
      }
    `}
  >
    <p className="font-semibold">
      {message.replyTo.sender?.fullName}
    </p>

    <p className="truncate opacity-80">
      {message.replyTo.isDeletedForEveryone
        ? "🚫 Deleted Message"
        : message.replyTo.text}
    </p>
  </div>
)}
       {message.isDeletedForEveryone ? (

  <p className="leading-7">
    🚫 This message was deleted
  </p>

) : (

  <>

    {/* Text */}

    {message.text && (
      <p
  className="
    whitespace-pre-wrap
    break-words
    leading-7
    text-[15px]
  "
>
  {message.text}
</p>
    )}

    {/* Image */}

    {message.attachment?.type === "image" && (
      <img
        src={message.attachment.url}
        alt="attachment"
        className="
          mt-3
          max-h-80
          rounded-2xl
          object-cover
        "
      />
    )}

    {/* Video */}

    {message.attachment?.type === "video" && (
      <video
        controls
        className="
          mt-3
          max-h-80
          rounded-2xl
        "
      >
        <source
          src={message.attachment.url}
        />
      </video>
    )}

    {/* Voice */}

   {message.attachment?.type === "audio" && (
  <VoiceMessage
    url={message.attachment.url}
    duration={
      message.attachment.duration
    }
  />
)}

    {/* Document */}

    {message.attachment?.type ===
      "document" && (
      <a
        href={message.attachment.url}
        target="_blank"
        rel="noreferrer"
        className="
          mt-3
          block
          rounded-xl
          bg-black/20
          p-3
          text-cyan-300
          hover:text-cyan-200
        "
      >
        📄 {message.attachment.fileName}
      </a>
    )}

    {/* Emoji Reactions */}

    {message.reactions?.length > 0 && (

      <div className="mt-3 flex flex-wrap gap-2">

        {message.reactions.map(
          (reaction, index) => (

            <span
              key={index}
              className="
                rounded-full
                bg-black/20
                px-2
                py-1
                text-sm
              "
            >
              {reaction.emoji}
            </span>

          )
        )}

      </div>

    )}

  </>

)}
         <div className="mt-2 flex items-center justify-end gap-2">

  {message.pinned && (
    <span className="text-cyan-400">
      📌
    </span>
  )}

 </div>

  {message.starredBy?.some(
    (id) => id.toString() === user?._id
  ) && (
    <span className="text-yellow-400">
      ⭐
    </span>
  )}

  <p
    className={`
      text-xs

      ${
        isMe
          ? "text-cyan-100"
          : "text-slate-500"
      }
    `}
  >
    {new Date(message.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}
  </p>

</div>
        </div>

        {/* Context Menu */}

        {showMenu && (
          <div ref={menuRef}>
            <MessageMenu
              isMe={isMe}
              onReply={() => {
                dispatch(setReply(message));
                setShowMenu(false);
              }}
              onReact={() => {
              setShowReaction(true);
              setShowMenu(false);
              }}
              onCopy={handleCopy}
             onStar={async () => {
  try {
    await toggleStarMessage(message._id);

    setShowMenu(false);

    await refreshMessages();

  } catch (error) {
    console.log(error);
  }
}}
              onPin={async () => {
  try {

    await togglePinMessage(message._id);

    setShowMenu(false);

    await refreshMessages();

  } catch (error) {

    console.log(error);

  }
}}
              onEdit={() => {
               dispatch(setEditMessage(message));
               setShowMenu(false);
              }}
             onDeleteMe={async () => {
  try {
    await deleteForMe(message._id);

    setShowMenu(false);

  
    await refreshMessages();

  } catch (error) {
    console.log(error);
  }
}}
             onDeleteEveryone={async () => {
  try {
    await deleteForEveryone(message._id);

    setShowMenu(false);

   await refreshMessages();

  } catch (error) {
    console.log(error);
  }
}}
            />
          </div>
        )}
        {showReaction && (
  <ReactionPicker
    onSelect={async (emoji) => {
      try {
        await toggleReaction(
          message._id,
          emoji
        );

        setShowReaction(false);

      } catch (error) {
        console.log(error);
      }
    }}
  />
)}
      
    </div>
  );
};

export default MessageBubble;