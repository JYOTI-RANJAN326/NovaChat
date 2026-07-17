// // // import { useState } from "react";
// // // import { motion } from "framer-motion";
// // // import { Link } from "react-router-dom";
// // // import {
// // //   FiMail,
// // //   FiLock,
// // //   FiEye,
// // //   FiEyeOff,
// // //   FiArrowRight,
// // // } from "react-icons/fi";

// // // import Logo from "../Common/Logo";
// // // import InputField from "./InputField";
// // // import SocialLogin from "./SocialLogin";
// // // import toast from "react-hot-toast";
// // // import { useNavigate } from "react-router-dom";

// // // import { loginAPI } from "../../services/authAPI";

// // // const LoginCard = () => {
// // //   const [showPassword, setShowPassword] = useState(false);

// // //   const [formData, setFormData] = useState({
// // //     email: "",
// // //     password: "",
// // //   });

// // //   const navigate = useNavigate();

// // // const [loading, setLoading] = useState(false);

// // //   const handleChange = (e) => {
// // //     setFormData((prev) => ({
// // //       ...prev,
// // //       [e.target.name]: e.target.value,
// // //     }));
// // //   };

// // //  const handleSubmit = async (e) => {
// // //   e.preventDefault();

// // //   if (!formData.email || !formData.password) {
// // //     toast.error("Please fill all fields");
// // //     return;
// // //   }

// // //   setLoading(true);

// // //   try {
// // //     const response = await loginAPI({
// // //       email: formData.email,
// // //       password: formData.password,
// // //     });

// // //     toast.success(response.message);

// // //     navigate("/chat");

// // //   } catch (error) {

// // //     toast.error(
// // //       error.response?.data?.message ||
// // //       "Login Failed"
// // //     );

// // //   } finally {

// // //     setLoading(false);

// // //   }
// // // };

// // //   return (
// // //     <motion.div
// // //       initial={{ opacity: 0, x: 60 }}
// // //       animate={{ opacity: 1, x: 0 }}
// // //       transition={{ duration: 0.8 }}
// // //       className="w-full max-w-[620px]"
// // //     >
// // //       <div
// // //         className="
// // //           login-card
// // //           rounded-[34px]
// // //           border
// // //           border-white/10
// // //           bg-[#0B1324]/90
          
          
// // //           pl-10
// // //           pr-8
// // //           py-12
// // //           backdrop-blur-xl
// // //           shadow-[0_25px_70px_rgba(0,0,0,.45)]
// // //         "
// // //       > 
// // //         {/* Logo */}

// // //         <div className="mb-7  flex justify-center">
// // //           <Logo />
// // //         </div>

// // //         {/* Heading */}

// // //         <div className="mb-9  text-center">

// // //           <h1 className="text-[56px] font-black leading-[1.8] tracking-tight text-white">
// // //             Welcome Back
// // //             <span className="ml-3">👋</span>
// // //           </h1>

// // //           <p className="mt-4 text-lg leading-6 text-slate-400">
// // //             Sign in to continue your conversations.
// // //           </p>

// // //         </div>

// // //         {/* Form */}

// // //         <form
// // //           onSubmit={handleSubmit}
// // //           className="space-y-7 leading-10 "
// // //         >
// // //           <InputField
// // //             label="Email Address"
// // //             name="email"
// // //             type="email"
// // //             value={formData.email}
// // //             onChange={handleChange}
// // //             placeholder="Enter your email"
// // //             icon={<FiMail />}
// // //           />

// // //           <InputField
// // //             label="Password"
// // //             name="password"
// // //             type={showPassword ? "text" : "password"}
// // //             value={formData.password}
// // //             onChange={handleChange}
// // //             placeholder="Enter your password"
// // //             icon={<FiLock />}
// // //             rightIcon={
// // //               showPassword ? <FiEyeOff /> : <FiEye />
// // //             }
// // //             onRightIconClick={() =>
// // //               setShowPassword(!showPassword)
// // //             }
// // //           />

// // //           {/* Forgot Password */}

// // //           <div className="flex justify-end ">

// // //             <button
// // //               type="button"
// // //               className="text-sm  leading-10 font-medium text-cyan-400 transition hover:text-cyan-300"
// // //             >
// // //               Forgot Password?
// // //             </button>

// // //           </div>
 
// // //           {/* Login Button */}

// // //  <button
// // //   type="submit"
// // //   disabled={loading}
// // //   className="
// // //     login-btn
// // //     flex
// // //     h-[62px]
// // //     w-full
// // //     items-center
// // //     justify-center
// // //     gap-3
// // //     rounded-2xl
// // //     bg-gradient-to-r
// // //     from-cyan-500
// // //     to-blue-600
// // //     text-lg
// // //     font-semibold
// // //     text-white
// // //     disabled:opacity-60
// // //     disabled:cursor-not-allowed
// // //   "
// // // >
// // //   {loading ? "Signing In..." : "Login"}

// // //   {!loading && <FiArrowRight />}
// // // </button>

// // //           {/* Social Login */}
// // //            <br/>
// // //           <div className="pt-2">
// // //             <SocialLogin />
// // //           </div>

// // //           {/* Signup */}
           
// // //           <p className="pt-3 leading-10 text-center text-base text-slate-400">
// // //             Don't have an account?

// // //             <Link
// // //               to="/signup"
// // //               className="ml-2 leading -9 font-semibold text-cyan-400 transition hover:text-cyan-300"
// // //             >
// // //               Sign Up
// // //             </Link>
// // //           </p>

// // //         </form>
      
  
// // //       </div>
// // //     </motion.div>
// // //   );
// // // };

// // // export default LoginCard;

// // import { useState } from "react";
// // import { motion } from "framer-motion";
// // import { Link } from "react-router-dom";
// // import {
// //   FiMail,
// //   FiLock,
// //   FiEye,
// //   FiEyeOff,
// //   FiArrowRight,
// // } from "react-icons/fi";

// // import InputField from "./InputField";
// // import SocialLogin from "./SocialLogin";
// // import toast from "react-hot-toast";
// // import { useNavigate } from "react-router-dom";

// // import { loginAPI } from "../../services/authAPI";

// // const LoginCard = () => {
// //   const [showPassword, setShowPassword] = useState(false);

// //   const [formData, setFormData] = useState({
// //     email: "",
// //     password: "",
// //   });

// //   const navigate = useNavigate();

// // const [loading, setLoading] = useState(false);

// //   const handleChange = (e) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       [e.target.name]: e.target.value,
// //     }));
// //   };

// //  const handleSubmit = async (e) => {
// //   e.preventDefault();

// //   if (!formData.email || !formData.password) {
// //     toast.error("Please fill all fields");
// //     return;
// //   }

// //   setLoading(true);

// //   try {
// //     const response = await loginAPI({
// //       email: formData.email,
// //       password: formData.password,
// //     });

// //     toast.success(response.message);

// //     navigate("/chat");

// //   } catch (error) {

// //     toast.error(
// //       error.response?.data?.message ||
// //       "Login Failed"
// //     );

// //   } finally {

// //     setLoading(false);

// //   }
// // };

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, x: 60 }}
// //       animate={{ opacity: 1, x: 0 }}
// //       transition={{ duration: 0.8 }}
// //       className="w-full max-w-[520px]"
// //     >
// //       <div
// //         className="
// //           login-card
// //           rounded-[28px]
// //           border
// //           border-cyan-500/20
// //           bg-[#0B1324]/90
// //           px-9
// //           py-9
// //           backdrop-blur-xl
// //           shadow-[0_0_60px_rgba(6,182,212,.15),0_25px_70px_rgba(0,0,0,.45)]
// //         "
// //       > 
// //         {/* Logo */}

// //         <div className="mb-8">
// //           <h2 className="text-3xl font-extrabold tracking-tight leading-none">
// //             <span className="text-cyan-400">Nova</span>
// //             <span className="text-white">Chat</span>
// //           </h2>
// //           <p className="mt-1 text-sm text-slate-400">
// //             AI Powered Messaging
// //           </p>
// //         </div>

// //         {/* Heading */}

// //         <div className="mb-8">

// //           <h1 className="text-[32px] font-black leading-tight tracking-tight text-white">
// //             Welcome Back
// //             <span className="ml-2">👋</span>
// //           </h1>

// //           <p className="mt-2 text-base leading-6 text-slate-400">
// //             Login to continue chatting
// //           </p>

// //         </div>

// //         {/* Form */}

// //         <form
// //           onSubmit={handleSubmit}
// //           className="space-y-6"
// //         >
// //           <InputField
// //             label="Email"
// //             name="email"
// //             type="email"
// //             value={formData.email}
// //             onChange={handleChange}
// //             placeholder="Enter your email"
// //             icon={<FiMail />}
// //           />

// //           <InputField
// //             label="Password"
// //             name="password"
// //             type={showPassword ? "text" : "password"}
// //             value={formData.password}
// //             onChange={handleChange}
// //             placeholder="Enter your password"
// //             icon={<FiLock />}
// //             rightIcon={
// //               showPassword ? <FiEyeOff /> : <FiEye />
// //             }
// //             onRightIconClick={() =>
// //               setShowPassword(!showPassword)
// //             }
// //           />

// //           {/* Forgot Password */}

// //           <div className="flex justify-end ">

// //             <button
// //               type="button"
// //               className="text-sm  leading-10 font-medium text-cyan-400 transition hover:text-cyan-300"
// //             >
// //               Forgot Password?
// //             </button>

// //           </div>
 
// //           {/* Login Button */}

// //  <button
// //   type="submit"
// //   disabled={loading}
// //   className="
// //     login-btn
// //     flex
// //     h-[62px]
// //     w-full
// //     items-center
// //     justify-center
// //     gap-3
// //     rounded-2xl
// //     bg-gradient-to-r
// //     from-cyan-500
// //     to-blue-600
// //     text-lg
// //     font-semibold
// //     text-white
// //     disabled:opacity-60
// //     disabled:cursor-not-allowed
// //   "
// // >
// //   {loading ? "Signing In..." : "Login"}

// //   {!loading && <FiArrowRight />}
// // </button>

// //           {/* Social Login */}

// //           <div className="pt-2">
// //             <SocialLogin />
// //           </div>

// //           {/* Signup */}

// //          <p className="pt-1 text-center text-base text-slate-400">
// //   Don't have an account?{" "}
// //   <Link
// //     to="/signup"
// //     className="font-semibold text-cyan-400 transition hover:text-cyan-300"
// //   >
// //     Sign Up
// //   </Link>
// // </p>
// //         </form>
      
  
// //       </div>
// //     </motion.div>
// //   );
// // };

// // export default LoginCard;

import { useState } from "react";
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

import { loginAPI } from "../../services/authAPI";

const LoginCard = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

const [loading, setLoading] = useState(false);

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

  setLoading(true);

  try {
    const response = await loginAPI({
      email: formData.email,
      password: formData.password,
    });

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
      className="w-full max-w-[520px]"
    >
      <div
        className="
          login-card
          rounded-[28px]
          border
          border-cyan-500/20
          bg-[#0B1324]/90
          px-10
          py-11
          backdrop-blur-xl
          shadow-[0_0_60px_rgba(6,182,212,.15),0_25px_70px_rgba(0,0,0,.45)]
        "
      > 
        {/* Logo */}

        <div className="mb-9">
          <h2 className="text-3xl font-extrabold tracking-tight leading-none">
            <span className="text-cyan-400">Nova</span>
            <span className="text-white">Chat</span>
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            AI Powered Messaging
          </p>
        </div>

        {/* Heading */}

        <div className="mb-8">

          <h1 className="text-[32px] font-black leading-tight tracking-tight text-white">
            Welcome Back
            <span className="ml-2">👋</span>
          </h1>

          <p className="mt-2 text-base leading-6 text-slate-400">
            Login to continue chatting
          </p>

        </div>

        {/* Form */}

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
              className="text-sm  leading-10 font-medium text-cyan-400 transition hover:text-cyan-300"
            >
              Forgot Password?
            </button>

          </div>
 
          {/* Login Button */}

 <button
  type="submit"
  disabled={loading}
  className="
    login-btn
    flex
    h-[62px]
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
    disabled:opacity-60
    disabled:cursor-not-allowed
  "
>
  {loading ? "Signing In..." : "Login"}

  {!loading && <FiArrowRight />}
</button>

          {/* Social Login */}

          <div className="pt-2">
            <SocialLogin />
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
    </motion.div>
  );
};

export default LoginCard;

