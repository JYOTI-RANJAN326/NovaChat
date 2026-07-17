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
        className="text-sm font-semibold tracking-wide text-slate-300"
      >
        {label}
      </label>

      {/* Input Container */}

      <motion.div
        whileTap={{ scale: 0.995 }}
        className="
          group
          flex
          items-center
          gap-4
          h-[60px]
          rounded-2xl
          border
          border-slate-700
          bg-[#0B1220]
          px-5
          transition-all
          duration-300
          hover:border-cyan-500/40
          focus-within:border-cyan-400
          focus-within:ring-4
          focus-within:ring-cyan-500/10
        "
      >
        {/* Left Icon */}

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            text-xl
            text-slate-500
            transition-all
            duration-300
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
            text-[15px]
            font-medium
            text-white
            placeholder:text-slate-500
            placeholder:font-normal
            focus:outline-none
          "
        />

        {/* Right Icon */}

        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              text-xl
              text-slate-500
              transition-all
              duration-300
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