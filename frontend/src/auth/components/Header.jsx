import React from "react";
import { Link } from "react-router";
// import LoginPage from "../LoginPage";
import { ArrowRight } from "lucide-react";

const Header = () => {
  return (
    <div className=" flex items-center justify-between py-4 px-6 sm:px-8 font-serif">
      <h1 className="text-cyan-400 text-2xl sm:text-4xl font-extrabold">
        Todo App
      </h1>
      <Link to={"/login"}>
        <button className="flex items-center gap-2 bg-cyan-500 rounded-full px-5 py-2 sm:px-8 sm:py-3 text-black font-bold text-md sm:text-xl cursor-pointer">
          Login
          <ArrowRight className="size-5"></ArrowRight>
        </button>
      </Link>
    </div>
  );
};

export default Header;
