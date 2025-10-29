import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../lib/axios.js";
import { toast } from "react-hot-toast";
import RateLimiter from "../components/RateLimiter.jsx";
import TaskCard from "../components/TaskCard";

const HomePage = () => {
  const [state, setState] = useState("all");
  const [tasks, setTasks] = useState([]);
  const [rateLimited, setRateLimited] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/tasks/${state}`);
      setTasks(response.data);
    } catch (error) {
      console.log("Error loading tasks", error);
      if (error.response.status === 429) {
        setRateLimited(true);
      } else {
        toast.error("Failed to load tasks");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [state]);

  return (
    <div className="">
      <Navbar setState={setState} />
      {rateLimited && <RateLimiter />}
      {loading ? (
        <div className="flex items-center justify-center mt-24">
          <p className="text-2xl text-slate-100 sm:text-3xl font-serif font-extrabold text-shadow-md text-shadow-cyan-400 p-2">
            Loading...
          </p>
        </div>
      ) : (
        <TaskCard
          tasks={tasks}
          rateLimited={rateLimited}
          state={state}
          fetchTasks={fetchTasks}
        />
      )}
    </div>
  );
};

export default HomePage;
