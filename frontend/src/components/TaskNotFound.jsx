import React from "react";
import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const TaskNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-white mt-8 font-serif">
      <div className="rounded-full border-2 border-cyan-500 p-4 sm:p-8 mb-4 mt-4 shadow-md shadow-slate-800">
        <NotebookIcon className="size-10 text-cyan-500 font-bold" />
      </div>
      <h3 className="text-2xl sm:text-4xl font-extrabold text-cyan-300 mb-4 text-shadow-md text-shadow-cyan-700">
        No tasks yet
      </h3>
      <p className="text-center text-sm sm:text-lg px-4 mb-6 sm:mb-10 text-slate-200 font-semibold">
        Ready to organize your thoughts? Create your first task to get started
        on your journey.
      </p>
      <Link
        to="/create"
        className="bg-blue-500 py-2 px-4 rounded-full font-bold shadow-md shadow-slate-800 text-xs sm:text-lg hover:bg-blue-600"
      >
        Create Your First Task
      </Link>
    </div>
  );
};

export default TaskNotFound;
