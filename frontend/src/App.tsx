import { useState } from 'react'
import FileUpload from './components/FileUpload.tsx'
import AnalysisResults from './components/AnalysisResult.tsx'
import Button from "./components/Button.tsx"
import Layout from "./components/Layout.tsx"
import NavBar from "./components/Navbar.tsx"
import Container from "./components/Container.tsx"
import Divider from "./components/Divider.tsx"
import Home from "./pages/Home.tsx"

const App = () => {
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  return (
    <Layout>
      <Container title="Good Morning">
      </Container>
      <Home/>
    </Layout>
  );
}

export default App;

      //<div className="container mx-auto max-w-4xl text-white">
      //<h1 className="text-2xl font-bold text-center my-8">WPHunter</h1>
      //<FileUpload onUploadSuccess={id => setCurrentTaskId(id)} />
      //<Button color="zinc">Button</Button>
      //{currentTaskId && <AnalysisResults taskId={currentTaskId} />}
      //<AnalysisResults taskId={'mock-task-id'} />
      //</div>
