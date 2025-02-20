import Layout from "@components/Layout";
import Container from "@components/Container";
import FileUpload from "@components/FileUpload";
import AnalysisResult from "@components/AnalysisResult";
import { useState } from "react";

const Analysis = () => {
  const [taskId, setTaskId] = useState<string | null>(null);

  return (
    <Container title="Menulal Analysis">
      <FileUpload onUploadSuccess={(taskId) => setTaskId(taskId)}/>
      {taskId && <AnalysisResult taskId={taskId} />}
    </Container>
  );
};

export default Analysis;
