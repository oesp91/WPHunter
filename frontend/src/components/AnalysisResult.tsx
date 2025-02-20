import { useEffect, useState } from 'react';

// 결과 데이터 타입 정의
export type AnalysisResult = {
  check_id: string;
  path: string;
  start: { line: number };
  end: { line: number };
  extra: {
    severity: 'ERROR' | 'WARNING' | 'INFO';
    message: string;
    lines: string;
  };
};

export type AnalysisResultsData = {
  status: 'processing' | 'completed';
  result?: {
    results: AnalysisResult[];
  };
};

interface AnalysisResultsProps {
  taskId: string;
  onComplete?: () => void;
}

const AnalysisResults = ({ taskId, onComplete }: AnalysisResultsProps) => {
  const [result, setResult] = useState<AnalysisResultsData | null>(null);

  // 결과 폴링
  useEffect(() => {
    if (!taskId) return;

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/analysis/result/${taskId}`);
        const data = await response.json();
        setResult(data);
        if (data.status === 'completed') {
          clearInterval(interval);
          if (onComplete) onComplete();
        }
      } catch (error) {
        console.error('Error fetching result:', error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [taskId, onComplete]);

  if (!result) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
      
      {result.status === 'processing' ? (
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          Analysis in progress...
        </div>
      ) : (
        <div className="space-y-4">
          {result.result?.results.map((finding, index) => (
            <div 
              key={index}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  finding.extra.severity === 'ERROR' ? 'bg-red-100 text-red-800' :
                  finding.extra.severity === 'WARNING' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {finding.extra.severity}
                </span>
                <span className="font-medium">{finding.check_id}</span>
              </div>
              <p className="text-gray-600 mb-2">{finding.extra.message}</p>
              <div className="bg-gray-50 p-3 rounded-md font-mono text-sm text-zinc-950">
                <pre>{finding.extra.lines}</pre>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                File: {finding.path} (Lines {finding.start.line}-{finding.end.line})
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnalysisResults;
