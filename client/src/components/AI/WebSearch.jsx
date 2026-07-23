import AIWorkspace from "./AIWorkspace";

const WebSearch = ({ setActiveTool }) => {
  return (
    <AIWorkspace
      header="🌐 AI Web Search"
      setActiveTool={setActiveTool}
      topPanel={
        <div className="flex items-center justify-center p-8">
          <div className="max-w-xl text-center">
            <div className="mb-4 text-6xl">🌐</div>

            <h2 className="mb-3 text-2xl font-bold text-white">
              AI Web Search
            </h2>

            <p className="leading-7 text-richblack-300">
              Search the web intelligently and get accurate,
              summarized answers powered by AI.
            </p>

            <div className="mt-8 rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-5">
              <p className="text-cyan-300 font-medium">
                🚧 Coming Soon
              </p>

              <p className="mt-2 text-sm text-richblack-300">
                This feature will allow you to search the internet,
                summarize webpages, compare sources, and answer
                real-time questions with citations.
              </p>
            </div>
          </div>
        </div>
      }
      messages={[]}
      loading={false}
      loadingText=""
      input=""
      setInput={() => {}}
      onSend={() => {}}
      placeholder="Coming Soon..."
      disabled={true}
    />
  );
};

export default WebSearch;