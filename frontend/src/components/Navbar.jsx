import React, { useContext } from "react";
import { PlusIcon, MenuIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { AppContent } from "../context/AppContext";

const Navbar = (props) => {
  const setState = props.setState;
  const navigate = useNavigate();
  const { userData, logout } = useContext(AppContent);
  // const [open, setOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between bg-slate-900 text-cyan-600 px-3 sm:px-6 py-4 font-serif ">
        <h1
          onClick={() => navigate("/")}
          className="text-[17px] sm:text-2xl font-bold text-cyan-500 xs:text-xs cursor-pointer"
        >
          Todo App
        </h1>
        <div className="flex items-center justify-between gap-2 mr-4">
          <div
            onClick={() => navigate("/create")}
            className="border border-cyan-500 rounded-lg p-2 shadow-sm shadow-cyan-600 hover:shadow-md cursor-pointer relative group "
          >
            <PlusIcon className="size-4 sm:size-7 text-cyan-400 font-bold "></PlusIcon>
            <p className="text-slate-200 hidden group-hover:block absolute  top-9 sm:top-13 w-20 text-center">
              New Task
            </p>
          </div>
          <div className="border border-cyan-500 rounded-lg p-2 shadow-sm shadow-cyan-600 hover:shadow-md cursor-pointer relative group">
            <MenuIcon className="size-4 sm:size-7 text-cyan-400 font-bold"></MenuIcon>
            <div className="hidden group-hover:flex flex-col gap-1 text-sm text-cyan-400 bg-slate-800 p-1 rounded-lg absolute left-6 top-8 sm:top-11">
              <button
                onClick={() => {
                  setState("all");
                }}
                className="bg-slate-900 text-xs sm:text-sm border border-cyan-500 p-1 rounded-lg shadow-sm shadow-cyan-600 hover:shadow-md cursor-pointer"
              >
                All
              </button>
              <button
                onClick={() => setState("open")}
                className="bg-slate-900 text-xs sm:text-sm border border-cyan-500 p-1 rounded-lg shadow-sm shadow-cyan-600 hover:shadow-md cursor-pointer"
              >
                Open
              </button>
              <button
                onClick={() => {
                  setState("complete");
                }}
                className="bg-slate-900 text-xs sm:text-sm border border-cyan-500 p-1 rounded-lg shadow-sm shadow-cyan-600 hover:shadow-md cursor-pointer"
              >
                Complete
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center bg-white rounded-full h-9 w-9 sm:w-12 sm:h-12 text-xl relative group cursor-pointer">
            {userData && userData.name ? userData.name[0].toUpperCase() : "?"}
            <div className="hidden absolute group-hover:block text-sm top-10 right-2 text-black bg-white p-2">
              <ul className="w-24">
                <li
                  onClick={logout}
                  className="bg-slate-200 rounded-lg cursor-pointer p-1 hover:bg-slate-300"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
