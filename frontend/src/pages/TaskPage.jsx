import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import formatDate from "../lib/formatDate.js";
import { useContext } from "react";
import { AppContent } from "../context/AppContext";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../lib/axios.js";

const TaskPage = () => {
  const navigate = useNavigate();
  const { handleDelete, handleDone, handleUpdate, deleting, done } =
    useContext(AppContent);
  const [task, setTask] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const fetchTask = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/tasks/task/${id}`);
      // console.log(data);
      setTask(data);
    } catch (error) {
      // console.log("Error fetching task", error);
      if (error.response.status === 429) {
        toast.error("Too many requests. Retry later");
      } else {
        toast.error("Failed to fetch task");
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTask();
  }, [id, deleting, done]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center mt-24">
          <p className="text-2xl text-slate-100 sm:text-3xl font-serif font-extrabold text-shadow-md text-shadow-cyan-400 p-2">
            Loading...
          </p>
        </div>
      ) : (
        <div>
          <h1
            onClick={() => navigate("/home")}
            className="text-xl sm:text-3xl font-bold text-cyan-500 xs:text-xs cursor-pointer p-4"
          >
            Todo App
          </h1>
          <div className="p-4 text-cyan-500 font-serif ">
            <div
              key={task._id}
              className="bg-slate-900 rounded-lg shadow-md shadow-cyan-400 py-2 px-4 border-[1px] border-cyan-400 mb-2"
            >
              <h1
                onClick={() => navigate(`/task/${task._id}`)}
                className="text-xl sm:text-2xl font-extrabold mb-3 truncate cursor-pointer "
              >
                {task.title}
              </h1>
              <p className="text-justify mb-4 text-sm sm:text-lg">
                {task.description}
              </p>
              <p className="text-sm sm:text-lg mb-3 text-slate-400">
                {formatDate(new Date(task.createdAt))}
              </p>

              <div className="flex xs:text-xs text-slate-200 gap-2 text-sm sm:text-lg">
                <button
                  disabled={task.complete}
                  className="bg-green-800 rounded-lg py-1 px-2 cursor-pointer hover:bg-green-900"
                  onClick={() => {
                    handleDone(task._id, task.title, task.description);
                    // fetchTasks();
                  }}
                >
                  {done === task._id ? "Done..." : "Done"}
                </button>
                <button
                  onClick={() => handleUpdate(task._id)}
                  className="bg-blue-800 rounded-lg py-1 px-2 cursor-pointer hover:bg-blue-900"
                >
                  Update
                </button>
                <button
                  disabled={deleting === task._id}
                  onClick={() => {
                    handleDelete(task._id);
                    navigate("/home");
                  }}
                  className="bg-red-700 rounded-lg py-1 px-2 cursor-pointer hover:bg-red-900"
                >
                  {deleting === task._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskPage;
