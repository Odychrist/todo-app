import React, { useContext } from "react";
import Header from "./components/Header";
import { Rocket, ArrowUp } from "lucide-react";
import { AppContent } from "../context/AppContext";
import { useNavigate } from "react-router";

const FirstPage = () => {
  const { userData, isAuth } = useContext(AppContent);
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center font-serif">
        <h2 className="flex items-center gap-2 mt-15 text-xl text-slate-100 sm:text-3xl mb-6">
          Hey{" "}
          <p className="text-cyan-500 font-bold font-sans">
            {userData.name ? userData.name : "🖐"}
          </p>
        </h2>
        <h1 className="mt-4 text-cyan-500 font-extrabold text-2xl sm:text-5xl flex items-center gap-3 font-sans text-shadow-md text-shadow-slate-800">
          Welcome to our App ! <Rocket className="sm:size-10"></Rocket>
        </h1>
        <p className="text-md sm:text-xl text-center px-10 mt-10 text-slate-200 sm:w-[450px] font-sans">
          Efficiently organize your day by creating a clear list of tasks to
          accomplish. You’re in the right place! Log in or sign up for free now
          to plan your day with ease.
        </p>
        <div className="flex flex-col items-center p-4 mt-6 text-white gap-2 justify-center">
          <button
            onClick={() => (isAuth ? navigate("/home") : navigate("/"))}
            className="text-sm sm:text-md px-4 py-2 bg-text-cyan border-2 border-cyan-500 rounded-full shadow-md shadow-cyan-600 cursor-pointer hover:bg-cyan-600 hover:border-cyan-600 hover:shadow-none mb-2"
          >
            Get started
          </button>
          <ArrowUp className="w-8 h-8 text-cyan-500 animate-bounce"></ArrowUp>
          <p className="font-bold text-md sm:text-lg">
            Click here after logging in
          </p>
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
