// import { motion } from "framer-motion";

// const FeatureCard = ({
//   icon: Icon,
//   title,
//   description,
// }) => {
//   return (
//     <motion.div
//       whileHover={{
//         y: -5,
//         scale: 1.02,
//       }}
//       transition={{
//         duration: 0.25,
//       }}
//       className="
//       group
//       flex
//       items-center
//       gap-5
//       rounded-3xl
//       border
//       border-white/10
//       bg-[#111827]/65
//       backdrop-blur-xl
//       px-5
//       py-5
//       transition-all
//       duration-300
//       hover:border-cyan-400/30
//       hover:shadow-[0_0_25px_rgba(6,182,212,.15)]
//       "
//     >
//       <div
//         className="
//         flex
//         h-14
//         w-14
//         items-center
//         justify-center
//         rounded-2xl
//         bg-gradient-to-br
//         from-cyan-500/20
//         to-blue-600/20
//         transition
//         group-hover:scale-110
//       "
//       >
//         <Icon
//           className="
//           text-[28px]
//           text-cyan-400
//         "
//         />
//       </div>

//       <div className="flex-1">

//         <h3
//           className="
//           text-lg
//           font-semibold
//           text-white
//         "
//         >
//           {title}
//         </h3>

//         <p
//           className="
//           mt-1
//           text-sm
//           leading-6
//           text-slate-400
//         "
//         >
//           {description}
//         </p>

//       </div>
//     </motion.div>
//   );
// };

// export default FeatureCard;


import { motion } from "framer-motion";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <motion.div
      whileHover={{
        x: 4,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
      group
      flex
      items-center
      gap-4
      "
    >
      <div
        className="
        flex
        h-12
        w-12
        shrink-0
        items-center
        justify-center
        rounded-xl
        border
        border-white/10
        bg-[#0B1324]
        transition
        group-hover:border-cyan-400/30
      "
      >
        <Icon
          className="
          text-[20px]
          text-cyan-400
        "
        />
      </div>

      <div className="flex-1">

        <h3
          className="
          text-base
          font-semibold
          text-white
        "
        >
          {title}
        </h3>

        <p
          className="
          text-sm
          leading-6
          text-slate-400
        "
        >
          {description}
        </p>

      </div>
    </motion.div>
  );
};

export default FeatureCard;