import React, { createContext, useState } from "react";
import { useNavigate } from "react-router";
import api from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const AppContent = createContext();
export const AppContextProvider = (props) => {
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(null);
  const [state, setState] = useState("all");
  const [tasks, setTasks] = useState([]);
  const [rateLimited, setRateLimited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState(false);
  const [loginState, setLoginState] = useState("Login");
  // const [loadingAuth, setLoadingAuth] = useState(true);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    setDeleting(id);
    try {
      const { data } = await api.delete(`/tasks/${id}`);
      if (data.success) {
        toast.success(data.message);
        fetchTasks();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // console.log("Error deleting task", error);
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
    setDone(id);
    try {
      const { data } = await api.put(`/tasks/${id}`, {
        title,
        description,
        complete: true,
      });
      if (data.success) {
        toast.success("Task done successfully");
        fetchTasks();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // console.log("Error doing task", error);
      if (error.response.status === 429) {
        toast.error("Too many requests. Retry later");
      } else {
        toast.error("Failed to done task");
      }
    } finally {
      setDone(null);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/tasks/${state}`);
      setTasks(data);
    } catch (error) {
      // console.log("Error loading tasks", error);
      if (error.response.status === 429) {
        setRateLimited(true);
      } else {
        toast.error("Failed to load tasks");
      }
    } finally {
      setLoading(false);
    }
  };

  const getAuth = async () => {
    try {
      const { data } = await api.get("/auth/is-auth");
      // console.log("get authresponse", data);
      if (data.success) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await api.get("/users/data");
      if (data.success) {
        setUserData(data.data);
      } else {
        setUserData(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    try {
      const { data } = await api.post("/auth/logout");
      if (data.success) {
        toast.success(data.message);
        setUserData(false);
        setIsAuth(false);
        navigate("/");
      } else {
        toast.error(data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const value = {
    state,
    setState,
    tasks,
    setTasks,
    rateLimited,
    setRateLimited,
    loading,
    setLoading,
    deleting,
    setDeleting,
    handleDelete,
    handleDone,
    handleUpdate,
    fetchTasks,
    done,
    isAuth,
    setIsAuth,
    getAuth,
    getUserData,
    userData,
    setUserData,
    logout,
    loginState,
    setLoginState,
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
