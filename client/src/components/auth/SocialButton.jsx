import { FcGoogle } from "react-icons/fc";

function SocialButton() {
  return (
    <button
      className="
      w-full
      rounded-2xl
      border
      border-slate-700
      bg-slate-900/60
      py-4
      transition-all
      duration-300
      hover:border-cyan-500
      hover:bg-slate-900
      "
    >
      <div className="flex items-center justify-center gap-4">

        <FcGoogle size={26} />

        <span className="text-lg font-medium">
          Continue with Google
        </span>

      </div>
    </button>
  );
}

export default SocialButton;