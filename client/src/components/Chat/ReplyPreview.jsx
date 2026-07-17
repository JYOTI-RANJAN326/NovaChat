import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { clearReply } from "../../slices/replySlice";

const ReplyPreview = () => {
  const dispatch = useDispatch();

  const { message } = useSelector(
    (state) => state.reply
  );

  if (!message) return null;

  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-xl
        border-l-4
        border-cyan-400
        bg-[#131F36]
        px-4
        py-3
      "
    >
      <div>

        <p className="text-sm font-semibold text-cyan-400">
          Replying to
        </p>

        <div>
  <p className="font-semibold text-cyan-400">
    {message.sender?.fullName}
  </p>

  <p className="truncate text-white">
    {message.text || "Attachment"}
  </p>
</div>

      </div>

      <button
        onClick={() => dispatch(clearReply())}
        className="text-slate-400 hover:text-white"
      >
        <FiX />
      </button>
    </div>
  );
};

export default ReplyPreview;