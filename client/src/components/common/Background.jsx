import { motion } from "framer-motion";

function Background() {

  return (

    <>

      <div className="absolute inset-0 bg-[#050816]" />

      {/* Left Glow */}

      <motion.div

        animate={{

          x:[0,120,0],

          y:[0,-80,0]

        }}

        transition={{

          duration:18,

          repeat:Infinity,

          ease:"linear"

        }}

        className="
        absolute
        -left-60
        top-0
        w-[700px]
        h-[700px]
        rounded-full
        bg-cyan-500/15
        blur-[190px]
        "

      />

      {/* Right Glow */}

      <motion.div

        animate={{

          x:[0,-100,0],

          y:[0,100,0]

        }}

        transition={{

          duration:20,

          repeat:Infinity,

          ease:"linear"

        }}

        className="
        absolute
        right-[-250px]
        bottom-[-200px]
        w-[800px]
        h-[800px]
        rounded-full
        bg-blue-700/15
        blur-[220px]
        "

      />

    </>

  );

}

export default Background;