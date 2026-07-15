import Background from "../components/common/Background";

function AuthLayout({ children }) {
  return (
    <div className="relative min-h-screen bg-[#050816] overflow-hidden">

      <Background />

      {/* Outer Border */}

      <div
        className="
        absolute
        inset-7
        rounded-[28px]
        border
        border-[#1A2547]
        "
      />

      <div
        className="
        relative
        z-10
        
        mx-auto
        flex
        min-h-screen
        max-w-[1450px]
        items-center xl:items-start
        pt-12 xl:pt-20
        justify-center xl:justify-between
        gap-24
        px-16 xl:px-24
        "
      >
        {children}
      </div>

    </div>
  );
}

export default AuthLayout;