import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../lib/axios.js";
// import axios from "axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/tasks/create/", {
        title,
        description,
      });
      toast.success("Task created successfully");
      navigate("/home");
    } catch (error) {
      console.log("Error creating task", error);
      toast.error("Failed to create task");
      navigate("/home");
      if (error.response.status === 429) {
        toast.error("Too many requests. Retry later", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create task");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
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

      <div className="flex w-[290px] sm:w-[370px] items-center flex-col justify-center p-4 bg-slate-800 rounded-xl border-[1px] border-cyan-500 text-cyan-600 shadow-md shadow-cyan-600">
        <h2 className="text-3xl font-extrabold sm:text-5xl">Create Task</h2>
        <p className="text-xl font-semibold mb-4 sm:text-2xl text-slate-400">
          Create a new task
        </p>
        <form className="text-lg sm:text-xl" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 mb-4">
            <label htmlFor="title" className="font-bold">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Task title"
              className="border-1 border-cyan-600 p-2 rounded-xl text-slate-400 text-sm sm:text-lg outline-0 w-[220px] sm:w-[300px] focus:border-[3px] focus:border-cyan-600"
            />
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <label htmlFor="description" className="font-bold">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
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
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
