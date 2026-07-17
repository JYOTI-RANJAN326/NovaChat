import {
  FiCopy,
  FiEdit2,
  FiTrash2,
  FiCornerUpLeft,
  FiStar,
} from "react-icons/fi";
import { BsPinAngle } from "react-icons/bs";
import { FaRegSmile } from "react-icons/fa";

const MessageMenu = ({
  onReply,
  onReact,
  onCopy,
  onStar,
  onPin,
  onEdit,
  onDeleteMe,
  onDeleteEveryone,
  isMe,
}) => {
  return (
    <div
      className="
        absolute
        right-0
        top-full
        z-50
        mt-2
        w-64
        rounded-2xl
        border
        border-white/10
        bg-[#111C2F]
        shadow-2xl
      "
    >
      <MenuItem
        icon={<FaRegSmile />}
        text="React"
        onClick={onReact}
      />

      <MenuItem
        icon={<FiCornerUpLeft />}
        text="Reply"
        onClick={onReply}
      />

      <MenuItem
        icon={<FiCopy />}
        text="Copy"
        onClick={onCopy}
      />

      <MenuItem
        icon={<FiStar />}
        text="Star"
        onClick={onStar}
      />

      <MenuItem
        icon={<BsPinAngle />}
        text="Pin"
        onClick={onPin}
      />

      {isMe && (
        <>
          <MenuItem
            icon={<FiEdit2 />}
            text="Edit"
            onClick={onEdit}
          />

          <MenuItem
            icon={<FiTrash2 />}
            text="Delete for Me"
            danger
            onClick={onDeleteMe}
          />

          <MenuItem
            icon={<FiTrash2 />}
            text="Delete for Everyone"
            danger
            onClick={onDeleteEveryone}
          />
        </>
      )}
    </div>
  );
};

const MenuItem = ({
  icon,
  text,
  danger,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`
      flex
      w-full
      items-center
      gap-3
      px-5
      py-3
      text-left
      transition

      ${
        danger
          ? "text-red-400 hover:bg-red-500/10"
          : "text-slate-300 hover:bg-white/5"
      }
    `}
  >
    {icon}
    {text}
  </button>
);

export default MessageMenu;