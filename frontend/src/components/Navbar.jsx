import React from "react";
import { PlusIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";

const Navbar = (props) => {
  const setState = props.setState;
  const navigate = useNavigate();

  return (
    <>
      <header className="flex items-center justify-between bg-slate-900 text-cyan-600 px-3 sm:px-6 py-4 font-serif ">
        <h1
          onClick={() => navigate("/")}
          className="text-[17px] hidden sm:text-2xl font-bold text-cyan-500 xs:text-xs sm:block cursor-pointer"
        >
          Todo App
        </h1>
        <div className="flex items-center justify-center gap-1 text-[10px] sm:text-sm md:text-lg text-cyan-400 font-bold">
          <button
            onClick={() => {
              setState("all");
            }}
            className="border-[1px] border-cyan-600 rounded-lg p-2 shadow-sm shadow-cyan-600 hover:shadow-md cursor-pointer"
          >
            All
          </button>
          <button
            onClick={() => setState("open")}
            className="border-[1px] border-cyan-500 rounded-lg p-2 shadow-sm shadow-cyan-600 hover:shadow-md cursor-pointer"
          >
            Open
          </button>
          <button
            onClick={() => {
              setState("complete");
            }}
            className="border-[1px] border-cyan-500 rounded-lg p-2 shadow-sm shadow-cyan-600 hover:shadow-md cursor-pointer"
          >
            Complete
          </button>
        </div>
        <div>
          <Link to={"/create"}>
            <button className="flex align-center justify-center gap-1 bg-cyan-600 rounded-full text-xs sm:text-lg p-2 sm:p-3 text-slate-200 font-semibold shadow-sm shadow-slate-700 cursor-pointer hover:bg-cyan-700">
              <PlusIcon className="size-4 sm:size-7"></PlusIcon> New Task
            </button>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Navbar;
