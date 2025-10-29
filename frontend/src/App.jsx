import React from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import UpdatePage from "./pages/UpdatePage";

const App = () => {
  return (
    <div className="bg-gradient-to-tr from-slate-800 to-cyan-700">
      <title>Todo App</title>
      <Routes>
        <Route index element={<HomePage />}></Route>
        <Route path="/create" element={<CreatePage />}></Route>
        <Route path="/update/:id" element={<UpdatePage />}></Route>
      </Routes>
    </div>
  );
};

export default App;
