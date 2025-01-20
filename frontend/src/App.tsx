import { useState } from 'react'
import FileUpload from './components/FileUpload.tsx'
import AnalysisResults from './components/AnalysisResult.tsx'

const App = () => {
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  return (
    <div className="container mx-auto max-w-4xl">
      <h1 className="text-2xl font-bold text-center my-8">WPHunter</h1>
      <FileUpload onUploadSuccess={id => setCurrentTaskId(id)} />
      {currentTaskId && <AnalysisResults taskId={currentTaskId} />}
      <AnalysisResults taskId={'mock-task-id'} />
    </div>
  );
}

export default App;
