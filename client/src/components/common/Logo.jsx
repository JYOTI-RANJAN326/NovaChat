function Logo() {
  return (
    <div className="flex items-center gap-5">

      <div
        className="
        flex

        h-16

        w-16

        items-center

        justify-center

        rounded-2xl

        border

        border-cyan-400

        text-4xl

        font-black

        text-cyan-400
        "
      >
        N
      </div>

      <div>

        <h1 className="text-5xl font-black">

          <span className="text-cyan-400">
            Nova
          </span>

          Chat

        </h1>

        <p className="mt-1 text-lg text-slate-400">

          AI Powered Messaging

        </p>

      </div>

    </div>
  );
}

export default Logo;