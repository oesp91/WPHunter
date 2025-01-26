import ContrastBlock from "@components/ContrastBlock.tsx"

const Test = () => (
  <div className="mx-auto max-w-6xl px-4">
    {/* Hero Section */}
    <div className="flex py-24 items-center">
      <div className="flex-1">
        <h1 className="text-5xl font-bold mb-6">
          WPHunter
        </h1>
        <p className="text-xl mb-8 text-gray-300">
          Beat other hackers to the punch and discover critical vulnerabilities first. The hunt begins now.
        </p>
        <div className="flex gap-4">
          <a 
            href="/analysis" 
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold"
          >
            Start Analysis
          </a>
          <a 
            href="/scanner" 
            className="border border-white px-6 py-3 rounded-lg font-semibold"
          >
            Auto Scanner
          </a>
        </div>
      </div>
      
      {/* Feature Highlight */}
      <div className="flex-1">
        <ContrastBlock className="p-6">
          <code className="text-sm">
            {/* Analysis result preview */}
          </code>
        </ContrastBlock>
      </div>
    </div>
  </div>
);

export default Test;
