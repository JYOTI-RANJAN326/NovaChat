import { motion } from "framer-motion";
import Logo from "../common/Logo";

function AuthBranding() {

    return (

        <motion.div

            initial={{opacity:0,x:-80}}

            animate={{opacity:1,x:0}}

            transition={{duration:.8}}

            className="hidden lg:flex flex-col w-[45%]"

        >

            <Logo />

            <h1 className="text-6xl font-black mt-10 leading-tight">

                Where

                <br />

                Conversations

                <br />

                Meet

                <span className="text-cyan-400">

                    {" "}Intelligence

                </span>

            </h1>

            <p className="text-slate-400 mt-8 text-lg leading-8">

                Secure messaging.

                AI Assistant.

                Groups.

                Voice & Video Calls.

                Everything in one place.

            </p>

        </motion.div>

    );

}

export default AuthBranding;