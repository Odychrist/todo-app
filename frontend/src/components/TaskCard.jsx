import React, { useState } from "react";
import TaskNotFound from "./TaskNotFound";
import formatDate from "../lib/formatDate.js";
import { toast } from "react-hot-toast";
import api from "../lib/axios.js";
import { useNavigate } from "react-router";

const TaskCard = (props) => {
  const { tasks, rateLimited, state, fetchTasks } = props;
  const [deleting, setDeleting] = useState(null);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    setDeleting(id);
    try {
      await api.delete(`/tasks/${id}`);
      toast.success("Task deleted");

      fetchTasks();
    } catch (error) {
      console.log("Error deleting task", error);
      if (error.response.status === 429) {
        toast.error("Too many requests. Retry later");
      } else {
        toast.error("Failed to delete task");
      }
    } finally {
      setDeleting(null);
    }
  };

  const handleDone = async (id, title, description) => {
    try {
      await api.put(`/tasks/${id}`, { title, description, complete: true });
      toast.success("Task done successfully");
    } catch (error) {
      console.log("Error doing task", error);
      toast.error("Failed to done task");
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };
  return (
    <div>
      {tasks.length === 0 && !rateLimited && state === "all" && (
        <TaskNotFound />
      )}
      {tasks.length === 0 && !rateLimited && state !== "all" && (
        <div className="flex items-center justify-center mt-24">
          <p className="text-2xl text-slate-100 sm:text-3xl font-serif font-extrabold text-shadow-md text-shadow-cyan-400 p-2">
            No {state} task.
          </p>
        </div>
      )}
      {tasks.length > 0 && !rateLimited && (
        <div className="flex flex-col justify-center sm:grid sm:grid-cols-2 gap-3 lg:grid-cols-3 p-4 text-cyan-500 font-serif ">
          {tasks.map((task) => {
            return (
              <div
                key={task._id}
                className="bg-slate-900 rounded-lg shadow-md shadow-cyan-400 py-2 px-4 border-[1px] border-cyan-400 mb-2"
              >
                <h1 className="text-xl sm:text-2xl font-extrabold mb-3 truncate cursor-pointer ">
                  {task.title}
                </h1>
                <p className="text-justify mb-4 text-sm sm:text-lg line-clamp-3 ">
                  {task.description}
                </p>
                <p className="text-sm sm:text-lg mb-3 text-slate-400">
                  {formatDate(new Date(task.createdAt))}
                </p>

                <div className="flex xs:text-xs text-slate-200 gap-2 text-sm sm:text-lg">
                  <button
                    disabled={task.complete}
                    className="bg-green-800 rounded-lg py-1 px-2 cursor-pointer hover:bg-green-900"
                    onClick={() =>
                      handleDone(task._id, task.title, task.description)
                    }
                  >
                    Done
                  </button>
                  <button
                    onClick={() => handleUpdate(task._id)}
                    className="bg-blue-800 rounded-lg py-1 px-2 cursor-pointer hover:bg-blue-900"
                  >
                    Update
                  </button>
                  <button
                    disabled={deleting === task._id}
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-700 rounded-lg py-1 px-2 cursor-pointer hover:bg-red-900"
                  >
                    {deleting === task._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
