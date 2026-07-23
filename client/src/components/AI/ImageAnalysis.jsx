import AIWorkspace from "./AIWorkspace";

const ImageAnalysis = ({ setActiveTool }) => {
  return (
    <AIWorkspace
      header="🖼 AI Image Analysis"
      setActiveTool={setActiveTool}
      topPanel={
        <div className="flex items-center justify-center p-8">
          <div className="max-w-xl text-center">
            <div className="mb-4 text-6xl">🖼</div>

            <h2 className="mb-3 text-2xl font-bold text-white">
              AI Image Analysis
            </h2>

            <p className="leading-7 text-richblack-300">
              Upload an image and let Nova AI analyze, describe,
              explain, extract text, solve problems, or answer
              questions based on the image.
            </p>

            <div className="mt-8 rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-5">
              <p className="font-medium text-cyan-300">
                🚧 Coming Soon
              </p>

              <p className="mt-2 text-sm text-richblack-300">
                This feature will support image understanding,
                OCR, object detection, chart analysis, diagram
                explanation, document reading, and much more.
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

export default ImageAnalysis;