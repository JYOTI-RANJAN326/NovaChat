// // // // import HeroSection from "../components/Auth/HeroSection";
// // // // import LoginCard from "../components/Auth/LoginCard";

// // // // const Login = () => {
// // // //   return (
// // // //     <div className="relative h-screen overflow-hidden bg-[#020817]">

// // // //       {/* Background Glow */}

// // // //       <div className="absolute inset-0">

// // // //         <div className="absolute -left-52 -top-52 h-[550px] w-[550px] rounded-full bg-cyan-500/10 blur-[180px]" />

// // // //         <div className="absolute -right-52 bottom-0 h-[550px] w-[550px] rounded-full bg-blue-600/10 blur-[180px]" />

// // // //         <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-sky-400/5 blur-[180px]" />

// // // //       </div>

// // // //       <div className="relative h-screen w-screen">

// // // //         <div className="grid h-full grid-cols-[54%_46%]">

// // // //           <div className="hidden xl:flex">
// // // //             <HeroSection />
// // // //           </div>

// // // //           <div className="flex items-center justify-center px-10 py-10">
// // // //             <LoginCard />
// // // //           </div>

// // // //         </div>

// // // //       </div>

// // // //     </div>
// // // //   );
// // // // };

// // // // export default Login;


// // // import HeroSection from "../components/Auth/HeroSection";
// // // import LoginCard from "../components/Auth/LoginCard";

// // // const Login = () => {
// // //   return (
// // //     <div className="relative h-screen w-full overflow-hidden bg-[#020817]">

// // //       {/* Background Glow */}

// // //       <div className="absolute inset-0">
// // //         <div className="absolute -left-52 -top-52 h-[550px] w-[550px] rounded-full bg-cyan-500/10 blur-[180px]" />
// // //         <div className="absolute -right-52 bottom-0 h-[550px] w-[550px] rounded-full bg-blue-600/10 blur-[180px]" />
// // //         <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-sky-400/5 blur-[180px]" />
// // //       </div>

// // //       <div className="relative h-full w-full">
// // //         <div className="grid h-full grid-cols-[54%_46%]">

// // //           <div className="hidden xl:flex overflow-hidden">
// // //             <HeroSection />
// // //           </div>

// // //           <div className="flex items-center justify-center px-10 py-10">
// // //             <LoginCard />
// // //           </div>

// // //         </div>
// // //       </div>

// // //     </div>
// // //   );
// // // };

// // // export default Login;


// // import HeroSection from "../components/Auth/HeroSection";
// // import LoginCard from "../components/Auth/LoginCard";

// // const Login = () => {
// //   return (
// //     <div className="relative h-screen w-full pl-16 pr-8 overflow-hidden bg-[#020817]">

// //       {/* Background Glow */}

// //       <div className="absolute inset-0">
// //         <div className="absolute -left-52 -top-52 h-[550px] w-[550px] rounded-full bg-cyan-500/10 blur-[180px]" />
// //         <div className="absolute -right-52 bottom-0 h-[550px] w-[550px] rounded-full bg-blue-600/10 blur-[180px]" />
// //         <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-sky-400/5 blur-[180px]" />
// //       </div>

// //       <div className="relative h-full w-full pl-16 pr-8 p-8">
// //         <div className="grid h-full grid-cols-[54%_46%] gap-6">

// //           <div className="hidden xl:flex overflow-hidden">
// //             <HeroSection />
// //           </div>

// //           <div className="flex items-center justify-center">
// //             <LoginCard />
// //           </div>

// //         </div>
// //       </div>

// //     </div>
// //   );
// // };

// // export default Login;


// import HeroSection from "../components/Auth/HeroSection";
// import LoginCard from "../components/Auth/LoginCard";
// import AuthLayout from "../components/Auth/AuthLayout";

// const Login = () => {
//   return (
//     <AuthLayout>
//       <div className="hidden xl:flex overflow-hidden">
//         <HeroSection />
//       </div>

//       <div className="flex items-center justify-center">
//         <LoginCard />
//       </div>
//     </AuthLayout>
//   );
// };

// export default Login;


import HeroSection from "../components/Auth/HeroSection";
import LoginCard from "../components/Auth/LoginCard";

const Login = () => {
  return (
    <div className="min-h-screen w-full bg-[#020817] p-6">
      <div className="relative h-[calc(100vh-3rem)] w-full overflow-hidden rounded-[28px] border border-white/10">

        <div className="absolute inset-0">
          <div className="absolute -left-52 -top-52 h-[550px] w-[550px] rounded-full bg-cyan-500/10 blur-[180px]" />
          <div className="absolute -right-52 bottom-0 h-[550px] w-[550px] rounded-full bg-blue-600/10 blur-[180px]" />
          <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-sky-400/5 blur-[180px]" />
        </div>

        <div className="relative h-full w-full pl-16 pr-8 py-10">
          <div className="grid h-full grid-cols-[54%_46%] gap-6">

            <div className="hidden xl:flex overflow-hidden">
              <HeroSection />
            </div>

            <div className="flex items-center justify-center">
              <LoginCard />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;