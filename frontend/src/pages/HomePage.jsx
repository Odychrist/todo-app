import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
// import api from "../lib/axios.js";
// import { toast } from "react-hot-toast";
import RateLimiter from "../components/RateLimiter.jsx";
import TaskCard from "../components/TaskCard.jsx";
import { useContext } from "react";
import { AppContent } from "../context/AppContext.jsx";

const HomePage = () => {
  const { state, fetchTasks, setState, rateLimited, loading } =
    useContext(AppContent);

  // const [loading, setLoading] = useState(false);
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
        <TaskCard />
      )}
    </div>
  );
};

export default HomePage;
