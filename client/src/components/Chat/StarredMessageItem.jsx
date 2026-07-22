import { FiStar } from "react-icons/fi";

const StarredMessageItem = ({
  message,
  onOpenChat,
}) => {
  return (
    <div
      onClick={() => onOpenChat(message)}
      className="
        mx-3
        mb-3
        cursor-pointer
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-4
        transition
        hover:bg-white/10
      "
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">
          {message.sender?.fullName}
        </h3>

        <FiStar className="text-yellow-400" />
      </div>

      <p className="mt-2 line-clamp-2 text-sm text-slate-300">
        {message.text || "📎 Attachment"}
      </p>

      <p className="mt-2 text-xs text-slate-500">
        {new Date(message.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default StarredMessageItem;