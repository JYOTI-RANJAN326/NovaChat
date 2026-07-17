import { motion } from "framer-motion";
import {
  FiPhone,
  FiPhoneOff,
} from "react-icons/fi";

const IncomingCallModal = ({
  caller,
  onAccept,
  onReject,
}) => {
  return (
    <div
      className="
        fixed
        inset-0
        z-[999]
        flex
        items-center
        justify-center
        bg-black/60
        backdrop-blur-sm
      "
    >
      <motion.div
        initial={{
          scale: 0.8,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        className="
          w-[380px]
          rounded-3xl
          bg-[#111C2F]
          p-8
          text-center
        "
      >
        {/* Avatar */}

        <div
          className="
            mx-auto
            flex
            h-24
            w-24
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-cyan-500
            to-blue-600
            text-4xl
            font-bold
            text-white
          "
        >
          {caller?.callerName?.charAt(0)}
        </div>

        <h2
          className="
            mt-6
            text-2xl
            font-bold
            text-white
          "
        >
          Incoming Call
        </h2>

        <p
          className="
            mt-2
            text-slate-400
          "
        >
          {caller?.callerName}
        </p>

        <div
          className="
            mt-8
            flex
            justify-center
            gap-6
          "
        >
          {/* Reject */}

          <button
            onClick={onReject}
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-red-500
              text-white
            "
          >
            <FiPhoneOff size={24} />
          </button>

          {/* Accept */}

          <button
            onClick={onAccept}
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-green-500
              text-white
            "
          >
            <FiPhone size={24} />
          </button>

        </div>

      </motion.div>
    </div>
  );
};

export default IncomingCallModal;