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
  const attachment = message.attachments?.[0];

  // ===========================
  // Copy Message
  // ===========================

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text || "");
    setShowMenu(false);
  };

 const getStatus = () => {
  if (!isMe) return null;

  if (message.status === "failed") {
    return "❌";
  }

  if (message.seenBy?.length > 1) {
    return (
      <span className="text-sky-300">
        ✓✓
      </span>
    );
  }

  return "✓";
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
  className={`mb-4 flex px-5 ${
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
    relative
    min-w-[140px]
    max-w-[78%]
    lg:max-w-[68%]
    rounded-[26px]
    px-5
    py-4
    shadow-2xl
    border
    backdrop-blur-md
    transition-all
    duration-300
    hover:scale-[1.01]

    ${
      isMe
        ? `
          rounded-br-lg
          border-cyan-400/20
          bg-gradient-to-br
          from-cyan-500
          via-sky-500
          to-blue-600
          text-white
        `
        : `
          rounded-bl-lg
          border-slate-700
          bg-[#111827]/90
          text-slate-200
        `
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
  text-[15px]
  leading-7
  tracking-[0.2px]
"
>
  {message.text}
</p>
    )}

    {/* Image */}

    {attachment?.type === "image" && (
      <img
        src={attachment.url}
        alt="attachment"
        className="
  mt-3
  w-full
  rounded-2xl
  border
  border-slate-700
  object-cover
  shadow-xl
"
      />
    )}

    {/* Video */}

    {attachment?.type === "video" && (
      <video
        controls
        className="
          mt-3
          max-h-80
          rounded-2xl
        "
      >
        <source
          src={attachment.url}
        />
      </video>
    )}

    {/* Voice */}

   {attachment?.type === "audio" && (
  <VoiceMessage
    url={attachment.url}
    duration={
      attachment.duration
    }
  />
)}

    {/* Document */}

    {attachment?.type ===
      "document" && (
      <a
        href={attachment.url}
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
        📄 {attachment.fileName}
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
        <div className="mt-3 flex items-center justify-end gap-2">

  {message.pinned && (
    <span className="text-cyan-400">
      📌
    </span>
  )}

  {message.starredBy?.some(
    (id) => id.toString() === user?._id
  ) && (
    <span className="text-yellow-400">
      ⭐
    </span>
  )}

  <div
    className={`ml-auto flex items-center gap-1 text-[11px]
      ${isMe ? "text-cyan-100/90" : "text-slate-400"}
    `}
  >
    <span>
      {new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </span>

    {getStatus()}
  </div>

</div>

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

await refreshMessages();

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