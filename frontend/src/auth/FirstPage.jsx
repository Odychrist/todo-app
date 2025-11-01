import React from "react";
import Header from "./components/Header";
import { Rocket } from "lucide-react";

const FirstPage = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center font-serif">
        <h2 className="mt-13 text-xl text-slate-100 sm:text-3xl">Hey 🖐</h2>
        <h1 className="mt-4 text-cyan-500 font-bold text-2xl sm:text-5xl flex items-center gap-3 font-sans">
          Welcome to our App ! <Rocket className="sm:size-10"></Rocket>
        </h1>
        <p className="text-md sm:text-xl text-center px-10 mt-10 text-slate-200 sm:w-[450px] font-sans">
          Efficiently organize your day by creating a clear list of tasks to
          accomplish. You’re in the right place! Log in or sign up for free now
          to plan your day with ease.
        </p>
      </div>
    </div>
  );
};

export default FirstPage;
