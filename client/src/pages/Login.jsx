

import HeroSection from "../components/auth/HeroSection";
import LoginCard from "../components/auth/LoginCard";
import earthBg from "../assets/background/earthBg.png";
const Login = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020817]">
     {/* Background Gradient */}
<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#0ea5e922,transparent_28%),radial-gradient(circle_at_bottom_right,#2563eb22,transparent_30%),linear-gradient(to_bottom,#030712,#020617)]" />

{/* Top Left Glow */}
<div className="absolute -left-44 -top-40 h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-[170px]" />

{/* Right Glow */}
<div className="absolute -right-52 top-1/2 h-[650px] w-[650px] -translate-y-1/2 rounded-full bg-blue-500/10 blur-[180px]" />

{/* Planet Glow */}
<div className="absolute left-1/2 bottom-[-150px] h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[160px]" />

{/* Planet */}
<div
  className="absolute left-1/2 bottom-[-220px] h-[560px] w-[560px] -translate-x-1/2 rounded-full"
  style={{
    background:
      "radial-gradient(circle at 28% 28%, #7dd3fc 0%, #3b82f6 35%, #1d4ed8 60%, #020617 84%, transparent 100%)",
    boxShadow:
      "0 0 140px rgba(59,130,246,.35), inset -40px -40px 80px rgba(0,0,0,.45)",
  }}
/>

      {/* Main Content */}
      <div className="relative z-10 p-6">
        <div
          className="
            mx-auto
            min-h-[calc(100vh-48px)]
            max-w-[1800px]
            rounded-[30px]
            border
            border-white/10
            bg-[#070d1b]/65
            backdrop-blur-xl
            shadow-[0_0_60px_rgba(0,170,255,.08)]
            overflow-hidden
          "
        >
          <div
            className="
              grid
              min-h-[100vh]
              w-full
              h-full
              xl:grid-cols-[52%_48%]
            "
          >
            {/* Background Image */}
<div className="absolute inset-0">
  <img
    src={earthBg}
    alt="Background"
    className="h-full w-full object-cover object-center select-none pointer-events-none"
  />
</div>

{/* Dark Overlay */}
<div className="absolute inset-0 bg-black/35" />
            {/* Hero */}
            <div className="hidden lg:flex items-center pl-16 pr-8 py-10">
              <HeroSection />
            </div>

            {/* Login */}
            <div className="flex items-center justify-center px-5 sm:px-8 md:px-10 lg:px-12 py-10 ">
              <LoginCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;