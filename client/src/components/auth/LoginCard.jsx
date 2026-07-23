

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/authSlice";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";

import InputField from "./InputField";
import SocialLogin from "./SocialLogin";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Logo from "../common/Logo";

import { loginAPI } from "../../services/authAPI";

const LoginCard = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

const [loading, setLoading] = useState(false);
const handleGoogleLogin = () => {
  window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/google`;
};

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    toast.error("Please fill all fields");
    return;
  }
    const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(formData.email.trim())) {
  toast.error("Enter a valid email");
  return;
}

  setLoading(true);

  try {
    const response = await loginAPI({
      email: formData.email.trim(),
      password: formData.password,
    });

  // Save to localStorage
localStorage.setItem(
  "token",
  JSON.stringify(response.token)
);

localStorage.setItem(
  "user",
  JSON.stringify(response.user)
);

// Update Redux
dispatch(
  setUser({
    user: response.user,
    token: response.token,
  })
);

toast.success(response.message);

navigate("/chat");
  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Login Failed"
    );

  } finally {

    setLoading(false);

  }
};

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-[480px]"
    >
      <div
  className="
    login-card
    min-h-[460px]
    rounded-[28px]
    border
    border-cyan-500/20
    bg-[#0B1324]/90
    pl-10
    pr-8
    py-8
    backdrop-blur-xl
    shadow-[0_0_60px_rgba(6,182,212,.15),0_25px_70px_rgba(0,0,0,.45)]
  "
>
        {/* Logo */}

       <div className="mb-10 flex justify-center">
         <Logo />
        </div>
        {/* Heading */}

        <div className="mb-10 text-center">
          <h1 className="text-[32px] font-black leading-tight tracking-tight text-white">
            Welcome Back
            <span className="ml-2">👋</span>
          </h1>

          <p className="mt-3 text-[17px] leading-7 text-slate-400">
            Login to continue chatting
          </p>

        </div>

        {/* Form */}
<div className="pl-10 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            placeholder:text-slate-500
            icon={<FiMail />}
          />

          <InputField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            icon={<FiLock />}
            rightIcon={
              showPassword ? <FiEyeOff /> : <FiEye />
            }
            onRightIconClick={() =>
              setShowPassword(!showPassword)
            }
          />

          {/* Forgot Password */}

          <div className="flex justify-end ">

            <button
              type="button"
              className="text-sm
font-medium
text-cyan-400
transition-all
hover:text-cyan-300
hover:underline"
            >
              Forgot Password?
            </button>

          </div>
 
          {/* Login Button */}

 <button
  type="submit"
  disabled={loading}
  className="
    group
relative
flex
h-[40px]
w-full
items-center
justify-center
gap-3
overflow-hidden
rounded-2xl
bg-gradient-to-r
from-cyan-500
via-sky-500
to-blue-600
text-lg
font-semibold
text-white
transition-all
duration-300
hover:-translate-y-0.5
hover:shadow-[0_0_35px_rgba(34,211,238,.35)]
disabled:opacity-60
  "
>
  {loading ? "Signing In..." : "Login"}

  {!loading && <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />}
</button>

          {/* Social Login */}

          <div className="pt-2">
           <SocialLogin
  onGoogleLogin={handleGoogleLogin}
/>
          </div>

          {/* Signup */}

         <div className="pt-1 pb-1 flex items-center justify-center gap-1.5 text-base text-slate-400">
  <span>Don't have an account?</span>
  <Link
    to="/signup"
    className="font-semibold text-cyan-400 transition hover:text-cyan-300"
  >
    Sign Up
  </Link>
</div>

        </form>
      
  </div>
      </div>
    </motion.div>
  );
};

export default LoginCard;

