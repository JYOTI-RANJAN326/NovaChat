import { motion } from "framer-motion";
import {
  FiMessageSquare,
  FiUsers,
  FiStar,
  FiArchive,
  FiCpu,
  FiSettings,
  FiLogOut,
  FiSearch,
} from "react-icons/fi";

import Logo from "../Common/Logo";
import SidebarItem from "./SidebarItem";

const menuItems = [
  {
    icon: FiMessageSquare,
    title: "Chats",
    active: true,
    badge: 5,
  },
  {
    icon: FiUsers,
    title: "Groups",
  },
  {
    icon: FiStar,
    title: "Starred",
  },
  {
    icon: FiArchive,
    title: "Archived",
  },
  {
    icon: FiCpu,
    title: "AI Assistant",
  },
  {
    icon: FiSettings,
    title: "Settings",
  },
];

const Sidebar = () => {
  return (
    <motion.aside
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="
      relative
      flex
      h-screen
      w-[300px]
      flex-col
      overflow-hidden
      border-r
      border-white/10
      bg-gradient-to-b
      from-[#0B1120]
      via-[#111827]
      to-[#0B1120]
      px-6
      py-7
      shadow-[0_0_45px_rgba(0,0,0,0.45)]
    "
    >
      {/* Background Glow */}

      <div
        className="
        absolute
        -left-24
        -top-24
        h-72
        w-72
        rounded-full
        bg-cyan-500/10
        blur-[130px]
      "
      />

      <div
        className="
        absolute
        -bottom-24
        -right-24
        h-80
        w-80
        rounded-full
        bg-blue-600/10
        blur-[150px]
      "
      />

      {/* Logo */}

      <div className="relative z-10 mb-8">
        <Logo />

        <p className="mt-2 leading-10 text-sm text-slate-400">
          Realtime Messaging Platform
        </p>
      </div>

      {/* Search */}

      <div className="relative z-10 mb-8">
        <FiSearch
          className="
          absolute
          left-4
          top-1/2
          leading-10
          -translate-y-1/2
          text-slate-400
        "
        />

        <input
          placeholder="Search chats..."
          className="
          w-full
          rounded-2xl
          border
          leading-10
          border-white/10
          bg-white/5
          py-3
          pl-11
          pr-4
          text-white
          outline-none
          backdrop-blur-xl
          placeholder:text-slate-500
          transition-all
          focus:border-cyan-400
          focus:ring-2
          focus:ring-cyan-500/30
        "
        />
      </div>

      {/* Navigation */}

      <div className="relative z-10 leading-10 flex flex-1 flex-col gap-3">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.title}
            icon={item.icon}
            title={item.title}
            active={item.active}
            badge={item.badge}
          />
        ))}
      </div>

      {/* Profile */}

      <div className="relative z-10 mt-6">
        <div
          className="
          rounded-3xl
          border
          border-white/10
          bg-white/5
          p-4
          backdrop-blur-xl
        "
        >
          <div className="flex items-center gap-4">
            <div
              className="
              relative
              flex
              h-14
              w-14
              leading-10
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-cyan-500
              to-blue-600
              text-lg
              font-bold
              text-white
              ring-2
              ring-cyan-400
            "
            >
              A

              <span
                className="
                absolute
                bottom-0
                right-0
                h-3.5
                w-3.5
                rounded-full
                bg-green-500
                ring-2
                ring-[#111827]
              "
              />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Ashish
              </h3>

              <p className="text-sm text-slate-400">
                Full Stack Developer
              </p>

              <span
                className="
                mt-1
                inline-flex
                rounded-full
                bg-cyan-500/15
                px-2
                leading-6
                py-0.5
                text-xs
                font-medium
                text-cyan-300
              "
              >
                ● Online
              </span>
            </div>
          </div>

          {/* Logout */}

          <button
            className="
            mt-5
            flex
            w-full
            items-center
            justify-center
            gap-3
            rounded-2xl
            border
            border-red-500/20
            bg-red-500/10
            py-3
            font-medium
            text-red-400
            transition-all
            duration-300
            hover:scale-[1.02]
            hover:bg-red-500/20
          "
          >
            <FiLogOut className="text-lg" />

            Logout
          </button>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;