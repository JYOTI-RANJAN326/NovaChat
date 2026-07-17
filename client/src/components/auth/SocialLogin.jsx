
// // import { motion } from "framer-motion";
// // import { FcGoogle } from "react-icons/fc";

// // const SocialLogin = ({
// //   onGoogleLogin,
// //   loading = false,
// // }) => {
// //   return (
// //     <div className="space-y-6">
// //       {/* Divider */}

// //       <div className="flex items-center gap-4">

// //         <div className="h-px flex-1 bg-white/10" />

// //         <span className="text-xs font-semibold uppercase tracking-[3px] text-slate-500">
// //           Or Continue With
// //         </span>

// //         <div className="h-px flex-1 bg-white/10" />

// //       </div>

// //       {/* Google Button */}

// //       <motion.button
// //         whileHover={{
// //           scale: 1.02,
// //         }}
// //         whileTap={{
// //           scale: 0.97,
// //         }}
// //         transition={{
// //           duration: 0.2,
// //         }}
// //         type="button"
// //         disabled={loading}
// //         onClick={onGoogleLogin}
// //         className="
// //           group
// //           flex
// //           h-[64px]
// //           w-full
// //           items-center
// //           justify-center
// //           gap-4
// //           rounded-2xl
// //           border
// //           border-slate-700
// //           bg-[#111827]
// //           transition-all
// //           duration-300
// //           hover:border-cyan-400/30
// //           hover:bg-[#172033]
// //           hover:shadow-[0_0_25px_rgba(6,182,212,.12)]
// //           disabled:cursor-not-allowed
// //           disabled:opacity-60
// //         "
// //       >
// //         <div
// //           className="
// //           flex
// //           h-10
// //           w-10
// //           items-center
// //           justify-center
// //           rounded-full
// //           bg-white
// //         "
// //         >
// //           <FcGoogle className="text-2xl" />
// //         </div>

// //         <span
// //           className="
// //           text-base
// //           font-semibold
// //           text-white
// //           transition
// //           group-hover:text-cyan-300
// //         "
// //         >
// //           Continue with Google
// //         </span>

// //       </motion.button>
// //     </div>
// //   );
// // };

// // export default SocialLogin;


// import { motion } from "framer-motion";
// import { FcGoogle } from "react-icons/fc";

// const SocialLogin = ({
//   onGoogleLogin,
//   loading = false,
// }) => {
//   return (
//     <div className="space-y-6">
//       {/* Divider */}

//       <div className="flex items-center gap-4">

//         <div className="h-px flex-1 bg-white/10" />

//         <span className="text-sm text-slate-500">
//           or continue with
//         </span>

//         <div className="h-px flex-1 bg-white/10" />

//       </div>

//       {/* Google Button */}

//       <motion.button
//         whileHover={{
//           scale: 1.02,
//         }}
//         whileTap={{
//           scale: 0.97,
//         }}
//         transition={{
//           duration: 0.2,
//         }}
//         type="button"
//         disabled={loading}
//         onClick={onGoogleLogin}
//         className="
//           group
//           flex
//           h-[64px]
//           w-full
//           items-center
//           justify-center
//           gap-4
//           rounded-2xl
//           border
//           border-slate-700
//           bg-[#111827]
//           transition-all
//           duration-300
//           hover:border-cyan-400/30
//           hover:bg-[#172033]
//           hover:shadow-[0_0_25px_rgba(6,182,212,.12)]
//           disabled:cursor-not-allowed
//           disabled:opacity-60
//         "
//       >
//         <div
//           className="
//           flex
//           h-10
//           w-10
//           items-center
//           justify-center
//           rounded-full
//           bg-white
//         "
//         >
//           <FcGoogle className="text-2xl" />
//         </div>

//         <span
//           className="
//           text-base
//           font-semibold
//           text-white
//           transition
//           group-hover:text-cyan-300
//         "
//         >
//           Continue with Google
//         </span>

//       </motion.button>
//     </div>
//   );
// };

// export default SocialLogin;

import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = ({
  onGoogleLogin,
  loading = false,
}) => {
  return (
    <div className="space-y-6">
      {/* Divider */}

      <div className="flex items-center gap-4">

        <div className="h-px flex-1 bg-white/10" />

        <span className="text-sm text-slate-500">
          or continue with
        </span>

        <div className="h-px flex-1 bg-white/10" />

      </div>

      {/* Google Button */}

      <motion.button
        whileHover={{
          scale: 1.02,
        }}
        whileTap={{
          scale: 0.97,
        }}
        transition={{
          duration: 0.2,
        }}
        type="button"
        disabled={loading}
        onClick={onGoogleLogin}
        className="
          flex
          h-[60px]
          w-full
          items-center
          justify-center
          gap-3
          rounded-2xl
          border
          border-slate-700
          bg-[#111827]
          transition-all
          duration-300
          hover:border-cyan-400/30
          hover:bg-[#172033]
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        <div
          className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-white
        "
        >
          <FcGoogle className="text-xl" />
        </div>

        <span className="!text-white text-base font-semibold">
          Continue with Google
        </span>

      </motion.button>
    </div>
  );
};

export default SocialLogin;