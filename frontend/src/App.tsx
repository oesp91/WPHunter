import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "@components/Layout"
import Home from "@pages/Home"
import Analysis from "@pages/Analysis"
import Scanner from "@pages/Scanner"

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/scanner" element={<Scanner />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
