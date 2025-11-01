import React from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import UpdatePage from "./pages/UpdatePage";
import FirstPage from "./auth/FirstPage";
import LoginPage from "./auth/LoginPage";

const App = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-cyan-800 min-h-screen">
      <title>Todo App</title>
      <Routes>
        <Route index element={<FirstPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="home" element={<HomePage />}></Route>
        <Route path="/create" element={<CreatePage />}></Route>
        <Route path="/update/:id" element={<UpdatePage />}></Route>
      </Routes>
    </div>
  );
};

export default App;
