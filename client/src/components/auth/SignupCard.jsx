



import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import UploadAvatar from "./UploadAvatar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Logo from "../common/Logo";

import { signupAPI } from "../../services/authAPI";

import {
  FiUser,
  FiAtSign,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";

import InputField from "./InputField";
import SocialLogin from "./SocialLogin";


const SignupCard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const navigate = useNavigate();

const [loading,setLoading]=useState(false);
const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !formData.fullName ||
    !formData.username ||
    !formData.email ||
    !formData.password ||
    !formData.confirmPassword
  ) {
    toast.error("Please fill all fields");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }
  if (!/(?=.*[A-Za-z])(?=.*\d).{6,}/.test(formData.password)) {
  toast.error(
    "Password should contain letters and numbers"
  );
  return;
}

  setLoading(true);

  try {

    const data = {
      fullName: formData.fullName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    const response = await signupAPI(data);

    toast.success(response.message);

    navigate("/login");

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Signup Failed"
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
      className="w-full max-w-[480px] "
    >
      <div
        className="
          login-card
          rounded-[28px]
          border
          border-cyan-500/20
          
         bg-[#0B1324]/90
          px-8
          py-5
          backdrop-blur-xl
          shadow-[0_0_60px_rgba(6,182,212,.15),0_25px_70px_rgba(0,0,0,.45)]
        "
      >
        {/* Logo */}

        <div className="mb-1 flex justify-center">
    <Logo size="default" />
</div>

        {/* Heading */}

        <div className="mb-4 text-center">
          <h1 className="text-[28px] font-black leading-tight tracking-tight text-white">
            Create Account
            <span className="ml-2">🚀</span>
          </h1>

          <p className="mt-1 text-base leading-6 text-slate-400">
            Join NovaChat and start conversations instantly.
          </p>
        </div>

        <div className="mb-3 flex justify-center">
          <UploadAvatar
            image={image}
            setImage={setImage}
          />
        </div>

        {/* Form */}
      <div className="pl-10 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 "
        > <div className="px-3">
          <InputField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            icon={<FiUser />}
          />
          </div>
          <div className="px-3">
          <InputField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Choose a username"
            icon={<FiAtSign />}
          />
          </div>
          <div className="px-3">
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            icon={<FiMail />}
          />
          </div>
          <div className="px-3">
          <InputField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            icon={<FiLock />}
            rightIcon={showPassword ? <FiEyeOff /> : <FiEye />}
            onRightIconClick={() =>
              setShowPassword(!showPassword)
            }
          />
          </div>
          <div className="px-3 ">
          <InputField
            label="Confirm Password "
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            icon={<FiLock />}
            rightIcon={showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            onRightIconClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
          />
        </div>
          {/* Button */}
  <br/>
       <button
  type="submit"
  disabled={loading}
  className="
    login-btn
    flex
    h-[40px]
    w-full
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
  {loading ? "Creating Account..." : "Create Account"}

  {!loading && <FiArrowRight />}
</button>

          {/* Google */}

          <SocialLogin />

          {/* Footer */}

          <div className="pt-1 flex items-center justify-center gap-1.5 text-base text-slate-400">
  <span>Already have an account?</span>
  <Link
    to="/login"
    className="font-semibold text-cyan-400 transition hover:text-cyan-300"
  >
    Login
  </Link>
</div>

        </form>
        </div>

      </div>
    </motion.div>
  );
};

export default SignupCard;