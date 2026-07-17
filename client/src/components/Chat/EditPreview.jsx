import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { clearEditMessage } from "../../slices/editMessageSlice";

const EditPreview = () => {
  const dispatch = useDispatch();

  const { message } = useSelector(
    (state) => state.editMessage
  );

  if (!message) return null;

  return (
    <div
      className="
        mb-3
        flex
        items-center
        justify-between
        rounded-xl
        border-l-4
        border-yellow-400
        bg-[#131F36]
        px-4
        py-3
      "
    >
      <div>
        <p className="text-sm font-semibold text-yellow-400">
          Editing Message
        </p>

        <p className="truncate text-white">
          {message.text}
        </p>
      </div>

      <button
        onClick={() => dispatch(clearEditMessage())}
        className="text-slate-400 hover:text-white"
      >
        <FiX />
      </button>
    </div>
  );
};

export default EditPreview;