import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import Layout from "./components/layout";
import PostPage from "./pages/postPage";
import "./pages/styles/globals.css";
import SignupPage from "./pages/signupPage";

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
