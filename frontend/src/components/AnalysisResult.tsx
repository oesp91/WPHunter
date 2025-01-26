import { useState, useEffect } from 'react';
import { AnalysisResult } from '@types/analysis';
import { mockAnalysisResult } from '@types/mockData.ts'

interface Props {
  taskId: string;
}

const AnalysisResults = ({ taskId }: Props) => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        //const response = await fetch(`http://localhost:8000/api/analysis/result/${taskId}`);
        //const data = await response.json();
        setResult(mockAnalysisResult);
      } catch (error) {
        console.error('Failed to fetch results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [taskId]);

  if (loading) return <div>Loading results...</div>;
  if (!result) return <div>No results found</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Analysis Results</h2>
      <div className="space-y-4">
        {result.vulnerabilities.map((vuln, index) => (
          <div key={index} className="border p-4 rounded">
            <div className="flex justify-between">
              <span className="font-semibold">{vuln.type}</span>
              <span className={`px-2 py-1 rounded text-sm ${
                vuln.severity === 'high' ? 'bg-red-100 text-red-800' :
                vuln.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {vuln.severity}
              </span>
            </div>
            <p className="text-gray-600 mt-2">{vuln.description}</p>
            <pre className="bg-gray-100 p-2 mt-2 rounded">
              <code>{vuln.code_snippet}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisResults;
