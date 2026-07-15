import { motion } from "framer-motion";

function SidebarItem({
    icon,
    active,
    title,
    onClick,
}) {

    return (

        <motion.button

            whileHover={{ scale: 1.05 }}

            whileTap={{ scale: 0.95 }}

            onClick={onClick}

            className={`
                relative
                flex
                items-center
                justify-center

                h-14
                w-14

                rounded-2xl

                transition-all

                ${
                    active
                        ? "bg-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,.35)]"
                        : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-cyan-400"
                }
            `}
        >

            {active && (

                <span
                    className="
                    absolute
                    left-[-12px]
                    h-8
                    w-1
                    rounded-full
                    bg-cyan-400
                    "
                />

            )}

            <span className="text-2xl">

                {icon}

            </span>

        </motion.button>

    );

}

export default SidebarItem;