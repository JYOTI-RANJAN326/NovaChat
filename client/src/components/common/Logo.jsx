// const Logo = ({ size = "default" }) => {
//   const boxSize =
//     size === "small"
//       ? "h-12 w-12"
//       : size === "large"
//       ? "h-20 w-20"
//       : "h-16 w-16";

//   const textSize =
//     size === "small"
//       ? "text-2xl"
//       : size === "large"
//       ? "text-4xl"
//       : "text-3xl";

//   const titleSize =
//     size === "small"
//       ? "text-3xl"
//       : size === "large"
//       ? "text-5xl"
//       : "text-4xl";

//   return (
//     <div className="flex items-center gap-4 select-none">
//       {/* Logo Icon */}
//       <div
//         className={`
//           ${boxSize}
//           relative
//           flex
//           items-center
//           justify-center
//           rounded-2xl
//           bg-gradient-to-br
//           from-cyan-400
//           via-sky-500
//           to-blue-600
//           shadow-[0_10px_35px_rgba(34,211,238,0.35)]
//         `}
//       >
//         {/* Glow */}
//         <div className="absolute inset-0 rounded-2xl bg-cyan-400/20 blur-md" />

//         {/* Letter */}
//         <span
//           className={`
//             relative
//             ${textSize}
//             font-black
//             text-white
//           `}
//         >
//           N
//         </span>
//       </div>

//       {/* Text */}
//       <div>
//         <h1
//           className={`
//             ${titleSize}
//             font-extrabold
//             tracking-tight
//             leading-none
//           `}
//         >
//           <span className="text-cyan-400">Nova</span>
//           <span className="text-white">Chat</span>
//         </h1>

//         <p className="mt-1 text-slate-400">
//           AI Powered Messaging
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Logo;



const Logo = ({ size = "default" }) => {
  const boxSize =
    size === "small"
      ? "h-12 w-12"
      : size === "large"
      ? "h-20 w-20"
      : "h-16 w-16";

  const textSize =
    size === "small"
      ? "text-2xl"
      : size === "large"
      ? "text-4xl"
      : "text-3xl";

  const titleSize =
    size === "small"
      ? "text-3xl"
      : size === "large"
      ? "text-5xl"
      : "text-4xl";

  return (
    <div className="flex items-center gap-4 select-none">
      {/* Logo Icon */}
      <div
        className={`
          ${boxSize}
          relative
          flex
          items-center
          justify-center
        `}
      >
        {/* Glow */}
        <div className="absolute inset-0 rounded-2xl bg-cyan-400/20 blur-md" />

        {/* Hexagon chat-bubble outline */}
        <svg
          viewBox="0 0 64 64"
          className="relative h-full w-full"
          fill="none"
        >
          <defs>
            <linearGradient id="novachat-logo-grad" x1="0" y1="0" x2="64" y2="64">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          <path
            d="M32 4 L54 17 V41 L45 46 L45 56 L34 46 L10 46 V17 Z"
            stroke="url(#novachat-logo-grad)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <text
            x="27"
            y="31"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#22d3ee"
            fontSize="20"
            fontWeight="900"
            fontFamily="inherit"
          >
            N
          </text>
        </svg>
      </div>

      {/* Text */}
      <div>
        <h1
          className={`
            ${titleSize}
            font-extrabold
            tracking-tight
            leading-none
          `}
        >
          <span className="text-cyan-400">Nova</span>
          <span className="text-white">Chat</span>
        </h1>

        <p className="mt-1 text-slate-400">
          AI Powered Messaging
        </p>
      </div>
    </div>
  );
};

export default Logo;