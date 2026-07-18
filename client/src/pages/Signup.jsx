import HeroSection from "../components/Auth/HeroSection";
import SignupCard from "../components/Auth/SignupCard";
import earthBg from "../assets/background/earthBg.png";


const Signup = () => {
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
  className="absolute left-1/2 bottom-[-240px] h-[620px] w-[620px] -translate-x-1/2 rounded-full overflow-hidden"
  style={{
    background: `
      radial-gradient(circle at 30% 25%,
        #8be9fd 0%,
        #38bdf8 18%,
        #2563eb 42%,
        #1e3a8a 70%,
        #020617 100%)
    `,
    boxShadow: `
      0 0 180px rgba(56,189,248,.45),
      0 0 280px rgba(37,99,235,.28),
      inset -60px -60px 120px rgba(0,0,0,.55),
      inset 35px 35px 60px rgba(255,255,255,.08)
    `,
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
            {/* Left */}
            <div className="hidden xl:flex items-center ">
              <HeroSection />
            </div>

            {/* Right */}
            <div className="flex items-center  justify-center px-10 py-8">
              <SignupCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;