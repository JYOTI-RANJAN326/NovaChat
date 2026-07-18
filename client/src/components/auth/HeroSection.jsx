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
        flex-col
        justify-center
        overflow-hidden
        
      "
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-[380px] w-[380px] rounded-full bg-cyan-500/10 blur-[170px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-[190px]" />

      {/* Planet */}
      {/* <div
        className="pointer-events-none absolute bottom-0 -left-24 h-[240px] w-[240px] rounded-full opacity-25 blur-[10px]"
        style={{
          background:
            "radial-gradient(circle at 32% 32%, #7dd3fc, #2563eb 55%, transparent 75%)",
        }}
      /> */}

      {/* Main Content */}
      <div className="relative z-10 flex max-w-[680px] flex-col gap-8">

        {/* Logo */}
       <div >
  <Logo size="large" />
     </div>

        {/* Heading */}
        <div>
          <h2 className="max-w-[700px]  text-[52px] font-black leading-[1.05] tracking-tight text-white">
            Where Conversations
            <br />
            Meet{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              Intelligence
            </span>
          </h2>

          <p className="mt-4 max-w-[600px] text-[17px] leading-8 text-slate-400">
            Secure messaging. AI Assistant. Groups.
            <br />
            Voice & Video Calls.
            <br />
            Everything in one place.
          </p>
        </div>

        {/* Features */}
        <div className="grid max-w-[700px] gap-6 pt-2">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

      </div>
    </motion.div>
  );
};

export default HeroSection;