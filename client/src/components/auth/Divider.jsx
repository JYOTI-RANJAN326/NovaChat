function Divider() {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="h-px flex-1 bg-slate-700"></div>

      <span className="text-sm text-slate-400">
        or continue with
      </span>

      <div className="h-px flex-1 bg-slate-700"></div>
    </div>
  );
}

export default Divider;