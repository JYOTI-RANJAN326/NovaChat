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
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../common/Logo";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { logoutAPI } from "../../services/authAPI";
import { logoutUser } from "../../slices/authSlice";
import { socket } from "../../services/socket";
import { useLocation } from "react-router-dom";

const menuItems = [
  {
    icon: FiMessageSquare,
    title: "Chats",
    
    
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
 
   const location = useLocation();
  const { user } = useSelector((state) => state.auth);
const dispatch = useDispatch();
const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await logoutAPI();

    socket.disconnect();

    dispatch(logoutUser());

    toast.success("Logged out successfully");

    navigate("/login", { replace: true });
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Logout failed"
    );
  }
};
const routeMap = {
  Chats: "/chat",
  Groups: "/groups",
  Starred: "/starred",
  Archived: "/archived",
  "AI Assistant": "/ai",
  Settings: "/settings",
};
  return (
    <>
  <motion.aside
    initial={{ x: -80, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.55 }}
    className="relative flex h-screen w-[350px] flex-col overflow-hidden border-r border-white/10 bg-[#08111F]"
  >
    {/* Background */}
    <div className="absolute inset-0 bg-[#08111F] " />
    <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-cyan-500/5 blur-[120px] " />
   
    <div className="relative z-10 flex h-full flex-col px-5 py-6">
      {/* Logo */}
      <Logo />
      
      {/* Search */}
      <div className="relative  mt-6">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

        <input
          placeholder="           Search Conversations"
          className="
            h-11
            w-full
            rounded-xl
            border
            border-white/10
            bg-white/5
            pl-11
            pr-4
            
            text-sm
            text-white
            outline-none
            placeholder:text-slate-500
            focus:border-cyan-500/40
          "
        />
      </div>
       <br/>
       <div className="mt-5 flex gap-3">

  <button
    onClick={() => navigate("/new-chat")}
    className="flex-1 rounded-xl  h-[35px] bg-cyan-600 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500"
  >
    + New Chat
  </button>

  

</div>
<br/>
      {/* Menu */}
      <div className="mt-6 w-[276px]">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          MENU
        </p>
        <br/>
        <div className="flex flex-col gap-3">
          {menuItems.map((item) => (
           <SidebarItem
    key={item.title}
    icon={item.icon}
    title={item.title}
    active={
        location.pathname === routeMap[item.title]
    }
    badge={item.badge}
    onClick={() => navigate(routeMap[item.title])}
/>
          ))}
        </div>
      </div>
      
      <br/>
      {/* Push profile to bottom */}
      <div className="mt-auto w-[400px] border-t border-white/10 pt-5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <br/>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500 font-bold text-white">
              {user?.fullName
  ?.split(" ")
  .map((name) => name[0])
  .join("")
  .slice(0, 2)
  .toUpperCase() || "U"}
            </div>

            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-[#08111F]" />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">
             {user?.fullName || "User"}
            </h4>

            <p className="text-xs text-slate-400">
              Online
            </p>
          </div>
        </div>
   <br/>
        <button
  onClick={handleLogout}
          className="
    logout-btn
    flex
    h-[40px]
    w-[269px]
    
    items-center
    justify-center
    gap-3
    rounded-2xl
    bg-gradient-to-r
    from-cyan-500
    to-blue-600
    text-lg
    font-semibold
    text-white
    disabled:cursor-not-allowed
    disabled:opacity-70
  "
        >
          <FiLogOut />
          Logout
        </button>
        
      </div>
      
    </div>
    
  </motion.aside>
  
</>
   
);


};

export default Sidebar;