import { motion } from "framer-motion";

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
  rightIcon,
  onRightIconClick,
}) => {
  return (
    <div className="space-y-3">
      {/* Label */}
      <label
        htmlFor={name}
        className="block text-sm font-medium tracking-wide text-slate-300"
      >
        {label}
      </label>

      {/* Input */}
      <motion.div
        whileTap={{ scale: 0.995 }}
        className="
          group
          relative
          flex
          h-[54px]
          items-center
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          transition-all
          duration-300
          hover:border-cyan-400/30
          focus-within:border-cyan-400
          focus-within:shadow-[0_0_25px_rgba(34,211,238,0.18)]
        "
      >
        {/* Left Glow */}
        <div className="absolute left-0 top-0 h-full w-[3px] bg-transparent transition-all duration-300 group-focus-within:bg-cyan-400" />

        {/* Left Icon */}
        <div
          className="
            ml-5
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-white/[0.04]
            text-lg
            text-slate-500
            transition-all
            duration-300
            group-focus-within:bg-cyan-500/10
            group-focus-within:text-cyan-400
          "
        >
          {icon}
        </div>

        {/* Input */}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="off"
          className="
            h-full
            flex-1
            bg-transparent
            px-4
            text-[15px]
            font-medium
            tracking-wide
            text-white
            placeholder:text-slate-500
            focus:outline-none
          "
        />

        {/* Right Icon */}
        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="
              mr-4
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              text-lg
              text-slate-500
              transition-all
              duration-300
              hover:bg-cyan-500/10
              hover:text-cyan-400
            "
          >
            {rightIcon}
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default InputField;