function Input({
  icon,
  endIcon,
  label,
  ...props
}) {
  return (
    <div className="space-y-2">

      <label className="text-lg font-medium">

        {label}

      </label>

      <div
        className="
        flex
        items-center
        rounded-xl
        border
        border-slate-700
        bg-[#0A1022]
        px-5
        py-[18px]
        transition-all
        duration-300
        focus-within:border-cyan-400
        focus-within:shadow-[0_0_20px_rgba(6,182,212,.15)]
        "
      >
        <div className="text-cyan-400">

          {icon}

        </div>

        <input
          className="
          ml-4
          flex-1
          bg-transparent
          text-base
          placeholder:text-slate-500
          "
          {...props}
        />

        {endIcon}
      </div>

    </div>
  );
}

export default Input;