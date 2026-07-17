import { motion } from "framer-motion";
import {
  FiEdit2,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiCamera,
} from "react-icons/fi";

function Profile() {
  return (
    <div className="min-h-screen overflow-auto bg-gradient-to-br from-[#030712] via-[#0B1120] to-[#111827] p-8">
      {/* Background Glow */}

      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[150px]" />
      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[180px]" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          relative
          mx-auto
          max-w-5xl
          rounded-[32px]
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-2xl
          shadow-[0_25px_80px_rgba(0,0,0,.45)]
          overflow-hidden
        "
      >
        {/* Cover */}

        <div className="relative h-52 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600">
          <button
            className="
              absolute
              bottom-5
              right-5
              rounded-full
              bg-white/20
              p-3
              backdrop-blur
              transition
              hover:bg-white/30
            "
          >
            <FiCamera className="text-xl text-white" />
          </button>
        </div>

        {/* Profile */}

        <div className="px-10 pb-10">
          <div className="-mt-16 flex items-end justify-between">
            <div className="flex items-end gap-6">
              <div
                className="
                  flex
                  h-32
                  w-32
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-cyan-500
                  to-blue-600
                  text-5xl
                  font-bold
                  text-white
                  ring-4
                  ring-[#111827]
                "
              >
                A
              </div>

              <div className="pb-3">
                <h1 className="text-4xl font-bold text-white">
                  Ashish
                </h1>

                <p className="mt-2 text-slate-400">
                  Full Stack Developer
                </p>

                <span
                  className="
                    mt-3
                    inline-flex
                    rounded-full
                    bg-green-500/15
                    px-3
                    py-1
                    text-sm
                    text-green-400
                  "
                >
                  ● Online
                </span>
              </div>
            </div>

            <button
              className="
                flex
                items-center
                gap-2
                rounded-2xl
                bg-cyan-500
                px-5
                py-3
                font-medium
                text-white
                transition
                hover:scale-105
              "
            >
              <FiEdit2 />
              Edit Profile
            </button>
          </div>

          {/* Info Cards */}

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="mb-6 text-xl font-semibold text-white">
                Personal Information
              </h2>

              <div className="space-y-5">
                <InfoRow
                  icon={<FiMail />}
                  label="Email"
                  value="ashish@example.com"
                />

                <InfoRow
                  icon={<FiPhone />}
                  label="Phone"
                  value="+91 XXXXX XXXXX"
                />

                <InfoRow
                  icon={<FiCalendar />}
                  label="Joined"
                  value="July 2026"
                />

                <InfoRow
                  icon={<FiMapPin />}
                  label="Location"
                  value="India"
                />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="mb-6 text-xl font-semibold text-white">
                About
              </h2>

              <p className="leading-8 text-slate-400">
                Passionate Full Stack Developer with a strong
                interest in scalable web applications, AI
                integrations and real-time communication
                systems. Always learning, building and solving
                challenging problems.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "React",
                  "Node.js",
                  "MongoDB",
                  "Socket.IO",
                  "Express",
                  "Tailwind",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="
                      rounded-full
                      bg-cyan-500/10
                      px-4
                      py-2
                      text-sm
                      text-cyan-300
                    "
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-4">
    <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
      {icon}
    </div>

    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="font-medium text-white">{value}</p>
    </div>
  </div>
);

export default Profile;