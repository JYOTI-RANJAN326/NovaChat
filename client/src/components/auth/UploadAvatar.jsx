import { useRef } from "react";
import { FiCamera } from "react-icons/fi";

const UploadAvatar = ({ image, setImage }) => {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage({
      file,
      preview: URL.createObjectURL(file),
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">

      {/* Avatar */}

      <div
        onClick={() => inputRef.current.click()}
        className="
          relative
          h-28
          w-28
          cursor-pointer
          overflow-hidden
          rounded-full
          border-2
          border-cyan-400/40
          bg-[#111827]
          transition-all
          duration-300
          hover:border-cyan-400
          hover:shadow-[0_0_25px_rgba(34,211,238,.35)]
        "
      >
        {image ? (
          <img
            src={image.preview}
            alt="Avatar"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">

            <FiCamera className="text-4xl text-slate-400" />

          </div>
        )}

        {/* Overlay */}

        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-black/50
            opacity-0
            transition
            hover:opacity-100
          "
        >
          <FiCamera className="text-3xl text-white" />
        </div>
      </div>

      <button
        type="button"
        onClick={() => inputRef.current.click()}
        className="
          text-sm
          font-medium
          text-cyan-400
          hover:text-cyan-300
        "
      >
        Upload Profile Picture
      </button>

      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={handleChange}
      />

    </div>
  );
};

export default UploadAvatar;