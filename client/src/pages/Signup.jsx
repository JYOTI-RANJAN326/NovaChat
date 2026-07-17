// import HeroSection from "../components/Auth/HeroSection";
// import SignupCard from "../components/Auth/SignupCard";

// const Signup = () => {
//   return (
//     <div className="relative h-screen overflow-hidden bg-[#020817]">

//       {/* Background Glow */}

//       <div className="absolute inset-0">

//         <div className="absolute -left-52 -top-52 h-[550px] w-[550px] rounded-full bg-cyan-500/10 blur-[180px]" />

//         <div className="absolute -right-52 bottom-0 h-[550px] w-[550px] rounded-full bg-blue-600/10 blur-[180px]" />

//         <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-sky-400/5 blur-[180px]" />

//       </div>

//       {/* Main Layout */}

//       <div className="relative h-screen w-screen">

//         <div className="grid h-full grid-cols-[54%_46%]">

//           {/* Left Hero */}

//           <div className="hidden xl:flex">
//             <HeroSection />
//           </div>

//           {/* Right Signup */}

//           <div className="flex items-center justify-center px-10 py-10">
//             <SignupCard />
//           </div>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default Signup;



import HeroSection from "../components/Auth/HeroSection";
import SignupCard from "../components/Auth/SignupCard";
import AuthLayout from "../components/Auth/AuthLayout";

const Signup = () => {
  return (
    <AuthLayout>
      <div className="hidden xl:flex overflow-hidden">
        <HeroSection />
      </div>

      <div className="flex items-center justify-center">
        <SignupCard />
      </div>
    </AuthLayout>
  );
};

export default Signup;
