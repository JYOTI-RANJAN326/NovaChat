import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiEyeOff } from "react-icons/fi";

import GlassCard from "../common/GlassCard";
import Logo from "../common/Logo";
import Input from "../common/Input";
import Button from "../common/Button";

import Divider from "./Divider";
import SocialButton from "./SocialButton";

function LoginCard() {

  return (

    <GlassCard>

      <div className="w-full space-y-6">

        <Logo />

        <div>

          <h2 className="text-[52px] font-bold">

            Welcome Back 👋

          </h2>

          <p className="mt-2 text-lg text-slate-400">

            Login to continue chatting

          </p>

        </div>

        <Input
          label="Email"
          placeholder="Enter your email"
          icon={<HiOutlineMail size={24} />}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          icon={<RiLockPasswordLine size={22} />}
          endIcon={
            <FiEyeOff
              className="
              cursor-pointer
              text-slate-400
              hover:text-cyan-400
              "
              size={22}
            />
          }
        />

        <div className="flex justify-end">

          <button
            className="
            text-cyan-400
            transition
            hover:text-cyan-300
            "
          >
            Forgot Password?
          </button>

        </div>

        <Button>

          Login

        </Button>

        <Divider />

        <SocialButton />

        <p className="text-center text-lg text-slate-400">

          Don't have an account?

          <span
            className="
            ml-2
            cursor-pointer
            font-semibold
            text-cyan-400
            hover:text-cyan-300
            "
          >
            Sign Up
          </span>

        </p>

      </div>

    </GlassCard>

  );
}

export default LoginCard;