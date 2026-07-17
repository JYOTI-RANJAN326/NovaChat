// // import { motion } from "framer-motion";
// // import {
// //   FiShield,
// //   FiCpu,
// //   FiUsers,
// //   FiPhoneCall,
// // } from "react-icons/fi";

// // import FeatureCard from "./FeatureCard";
// // import Logo from "../Common/Logo";

// // const features = [
// //   {
// //     icon: FiShield,
// //     title: "End-to-End Encrypted",
// //     description: "Your privacy is our priority",
// //   },
// //   {
// //     icon: FiCpu,
// //     title: "AI Assistant",
// //     description: "Smarter chats, instant answers",
// //   },
// //   {
// //     icon: FiUsers,
// //     title: "Groups & Communities",
// //     description: "Connect with everyone",
// //   },
// //   {
// //     icon: FiPhoneCall,
// //     title: "Voice & Video Calls",
// //     description: "Crystal clear communication",
// //   },
// // ];

// // const HeroSection = () => {
// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, x: -40 }}
// //       animate={{ opacity: 1, x: 0 }}
// //       transition={{ duration: 0.8 }}
// //       className="
// //         relative
// //         flex
// //         h-full
// //         flex-col
// //         justify-between
// //         overflow-hidden
        
// //       px-20
// //       pt-14
// //       pb-12
// //       "
// //     >
// //       {/* Background Glow */}

// //       <div className="absolute -left-32 -top-32  leading-3 h-[380px] w-[380px] rounded-full bg-cyan-500/10 blur-[170px]" />

// //       <div className="absolute -right-32 leading-3 bottom-0 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-[190px]" />

// //       {/* Logo */}

// //       <div className="relative z-10">
// //         <Logo size="large" />
// //       </div>

// //       {/* Hero Content */}

// //       <div className="relative z-10 mt-6">

// //         <p className="mb-5 leading-6  text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">
// //           AI POWERED MESSAGING PLATFORM
// //         </p>

// //         <h2 className="max-w-[720px] text-[72px] font-black leading-[1.02] tracking-tight text-white">

// //           Where

// //           <br />

// //           Conversations

// //           <br />

// //           Meet{" "}

// //           <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
// //             Intelligence
// //           </span>

// //         </h2>

// //         <p className="mt-8 leading -8 max-w-[620px] text-[20px] leading-10 text-slate-400">
// //           Experience secure messaging with AI assistance,
// //           voice & video calling, communities, and
// //           real-time collaboration —
// //           all in one beautiful platform.
// //         </p>

// //       </div>

// //       {/* Feature Cards */}

// //       <div className="relative z-10 mt-12 grid grid-cols-2 gap-5">

// //         {features.map((feature, index) => (
// //           <FeatureCard
// //             key={index}
// //             icon={feature.icon}
// //             title={feature.title}
// //             description={feature.description}
// //           />
// //         ))}

// //       </div>

// //       {/* Footer */}

// //       <div className="relative z-10 mt-8 flex items-center justify-between border-t border-white/10 pt-6">

// //         <p className="text-sm text-slate-500">
// //           Trusted by developers, students & teams worldwide.
// //         </p>

// //         <div className="flex items-center gap-2">

// //           <div className="h-2 w-2 rounded-full bg-green-400" />

// //           <span className="text-sm text-slate-400">
// //             Secure • Fast • Reliable
// //           </span>

// //         </div>

// //       </div>

// //     </motion.div>
// //   );
// // };

// // export default HeroSection;



// import { motion } from "framer-motion";
// import {
//   FiShield,
//   FiCpu,
//   FiUsers,
//   FiPhoneCall,
// } from "react-icons/fi";

// import FeatureCard from "./FeatureCard";
// import Logo from "../common/Logo";

// const features = [
//   {
//     icon: FiShield,
//     title: "End-to-End Encrypted",
//     description: "Your privacy is our priority",
//   },
//   {
//     icon: FiCpu,
//     title: "AI Assistant",
//     description: "Smarter chats, instant answers",
//   },
//   {
//     icon: FiUsers,
//     title: "Groups & Communities",
//     description: "Connect with everyone",
//   },
//   {
//     icon: FiPhoneCall,
//     title: "Voice & Video Calls",
//     description: "Crystal clear, always",
//   },
// ];

// const HeroSection = () => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -40 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.8 }}
//       className="
//         relative
//         flex
//         h-full
//         flex-col
//         justify-between
//         overflow-hidden
        
//       px-20
//       pt-14
//       pb-12
//       "
//     >
//       {/* Background Glow */}

//       <div className="absolute -left-32 -top-32  leading-3 h-[380px] w-[380px] rounded-full bg-cyan-500/10 blur-[170px]" />

//       <div className="absolute -right-32 leading-3 bottom-0 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-[190px]" />

//       {/* Decorative planet */}

//       <div className="pointer-events-none absolute -bottom-40 left-10 h-[380px] w-[380px] rounded-full bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 opacity-90 blur-[2px]" />

//       {/* Logo */}

//       <div className="relative z-10">
//         <Logo size="large" />
//       </div>

//       {/* Hero Content */}

//       <div className="relative z-10 mt-6">

//         <h2 className="max-w-[720px] text-[56px] font-black leading-[1.05] tracking-tight text-white">

//           Where

//           <br />

//           Conversations

//           <br />

//           Meet{" "}

//           <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
//             Intelligence
//           </span>

//         </h2>

//         <p className="mt-6 max-w-[520px] text-[17px] leading-8 text-slate-400">
//           Secure messaging. AI Assistant. Groups.
//           <br />
//           Voice & Video Calls.
//           <br />
//           Everything in one place.
//         </p>

//       </div>

//       {/* Feature List */}

//       <div className="relative z-10 mt-10 flex flex-col gap-6">

//         {features.map((feature, index) => (
//           <FeatureCard
//             key={index}
//             icon={feature.icon}
//             title={feature.title}
//             description={feature.description}
//           />
//         ))}

//       </div>

//     </motion.div>
//   );
// };

// export default HeroSection;


import { motion } from "framer-motion";
import {
  FiShield,
  FiCpu,
  FiUsers,
  FiPhoneCall,
} from "react-icons/fi";

import FeatureCard from "./FeatureCard";
import Logo from "../common/Logo";

const features = [
  {
    icon: FiShield,
    title: "End-to-End Encrypted",
    description: "Your privacy is our priority",
  },
  {
    icon: FiCpu,
    title: "AI Assistant",
    description: "Smarter chats, instant answers",
  },
  {
    icon: FiUsers,
    title: "Groups & Communities",
    description: "Connect with everyone",
  },
  {
    icon: FiPhoneCall,
    title: "Voice & Video Calls",
    description: "Crystal clear, always",
  },
];

const HeroSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="
        relative
        flex
        h-full
        w-full
        max-w-full
        flex-col
        justify-between
        overflow-hidden
        px-20
        pt-14
        pb-12
      "
    >
      {/* Background Glow */}

      <div className="pointer-events-none absolute -left-32 -top-32 h-[380px] w-[380px] rounded-full bg-cyan-500/10 blur-[170px]" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-[190px]" />

      {/* Decorative planet — soft, low, behind content */}

      {/* Decorative planet — small, low, out of the way */}

<div
  className="pointer-events-none absolute bottom-0 -left-24 z-0 h-[260px] w-[260px] rounded-full opacity-30 blur-[10px]"
  style={{
    background:
      "radial-gradient(circle at 32% 32%, #7dd3fc, #2563eb 55%, transparent 75%)",
  }}
/>

      {/* Logo */}

      <div className="relative z-10">
        <Logo size="large" />
      </div>

      {/* Hero Content */}

      <div className="relative z-10 mt-6">

        <h2 className="max-w-full text-[56px] font-black leading-[1.05] tracking-tight text-white">

          Where

          <br />

          Conversations

          <br />

          Meet{" "}

          <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
            Intelligence
          </span>

        </h2>

        <p className="mt-6 max-w-[520px] text-[17px] leading-8 text-slate-400">
          Secure messaging. AI Assistant. Groups.
          <br />
          Voice & Video Calls.
          <br />
          Everything in one place.
        </p>

      </div>

      {/* Feature List */}

      <div className="relative z-10 mt-10 flex flex-col gap-6">

        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}

      </div>

    </motion.div>
  );
};

export default HeroSection;