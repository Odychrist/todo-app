import React, { useContext, useEffect } from "react";
import { Link } from "react-router";
import { AppContent } from "../../context/AppContext";

const Header = () => {
  const { isAuth, getAuth, getUserData, userData, logout, setLoginState } =
    useContext(AppContent);
  useEffect(() => {
    getAuth();
    getUserData();
  }, []);
  return (
    <div className=" flex items-center justify-between py-4 px-6 sm:px-8 font-serif">
      <h1 className="text-cyan-400 text-2xl sm:text-4xl font-extrabold">
        Todo App
      </h1>
      {isAuth ? (
        <div className="flex items-center justify-center bg-white h-8 w-8 p-5 rounded-full text-xl relative group cursor-pointer">
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
      ) : (
        <Link to={"/login"} className="flex gap-2">
          <button
            onClick={() => {
              setLoginState("Sign Up");
            }}
            className="bg-cyan-500 rounded-xl px-3 py-2 sm:px-6 sm:py-3 text-slate-100 font-bold text-md sm:text-xl cursor-pointer"
          >
            Sign Up
          </button>
          <button
            onClick={() => {
              setLoginState("Login");
            }}
            className="bg-cyan-500 rounded-xl px-3 py-2 sm:px-6 sm:py-3 text-slate-100 font-bold text-md sm:text-xl cursor-pointer"
          >
            Login
          </button>
        </Link>
      )}
    </div>
  );
};

export default Header;
