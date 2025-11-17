import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../lib/axios";
import { AppContent } from "../context/AppContext";

const UpdatePage = () => {
  const [loading, setLoading] = useState(false);
  const [newTask, setNewTask] = useState({});

  const { setDoing } = useContext(AppContent);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/tasks/task/${id}`);
        setNewTask(data);
      } catch (error) {
        // console.log("Error geting task", error);
        if (error.response.status === 429) {
          toast.error("Too many requests. Retry later", {
            duration: 4000,
            icon: "💀",
          });
        } else {
          toast.error(error.response.data.message);
          // navigate("/home");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    /* if (!newTask.title.trim() || !newTask.description.trim()) {
      toast.error("All fields are required");
      return;
    } */
    newTask.complete = false;
    setLoading(true);
    try {
      const { data } = await api.put(`/tasks/${id}`, newTask);
      if (data.success) {
        toast.success(data.message);
        setDoing({ done: false, id: id });
        navigate("/home");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error updating task", error);
      if (error.response.status === 429) {
        toast.error("Too many requests. Retry later", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to update task");
        // navigate("/home");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="h-screen flex justify-center items-center font-serif flex-col">
        <div className="flex justify-start w-[290px] sm:w-[370px]">
          <Link
            to={"/home"}
            className="flex text-slate-200 p-2 rounded-lg gap-1 "
          >
            {" "}
            <ArrowLeft></ArrowLeft>Back to Tasks
          </Link>
        </div>

        <div className="flex items-center w-[290px] sm:w-[370px] flex-col justify-center p-6 bg-slate-800 rounded-xl border-[1px] border-cyan-500 text-cyan-600 shadow-md shadow-cyan-600">
          <h2 className="text-3xl font-extrabold sm:text-5xl">Update Task</h2>
          <p className="text-xl font-semibold mb-4 sm:text-2xl text-slate-400">
            Update a task
          </p>
          <form className="text-lg sm:text-xl" onSubmit={handleSave}>
            <div className="flex flex-col gap-1 mb-4">
              <label htmlFor="title" className="font-bold">
                Title
              </label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => {
                  setNewTask({ ...newTask, title: e.target.value });
                }}
                placeholder="Task title"
                className="border-1 border-cyan-600 p-2 rounded-xl text-slate-400 text-sm sm:text-lg outline-0 w-[220px] sm:w-[300px]  focus:border-[3px] focus:border-cyan-600"
              />
            </div>
            <div className="flex flex-col gap-1 mb-4">
              <label htmlFor="description" className="font-bold">
                Description
              </label>
              <textarea
                value={newTask.description}
                onChange={(e) => {
                  setNewTask({
                    ...newTask,
                    description: e.target.value,
                  });
                }}
                placeholder="Task description"
                className="border-1 border-cyan-600 p-2 rounded-xl text-slate-400 text-sm sm:text-lg outline-0 h-[100px] focus:border-[3px] focus:border-cyan-600 mb-2"
              ></textarea>
            </div>
            <div className="flex justify-end ">
              <button
                type="submit"
                disabled={loading}
                className="bg-cyan-600 text-slate-200 font-semibold rounded-xl px-6 py-2 cursor-pointer sm:text-xl hover:bg-cyan-700"
              >
                {loading ? "Saving changes..." : "Save changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <TaskCard newTask={newTask} /> */}
    </div>
  );
};

export default UpdatePage;
