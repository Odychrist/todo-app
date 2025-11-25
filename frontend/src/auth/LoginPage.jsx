import React, { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state === "Sign Up") {
      setLoading(true);

      try {
        const { data } = await api.post("/auth/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          toast.success(data.message);
          navigate("/home");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        // console.log("Error signing up", error);
        if (error.response.status === 429) {
          toast.error("Too many requests. Retry later", {
            duration: 4000,
            icon: "💀",
          });
        } else {
          toast.error(error.response.data.message);
        }
      } finally {
        setLoading(false);
      }
    }

    if (state === "Login") {
      setLoading(true);
      try {
        const { data } = await api.post("/auth/login", { email, password });
        if (data.success) {
          toast.success("Connected successfully");
          navigate("/home");
        } else {
          toast.error(data.message);
          navigate("/");
        }
      } catch (error) {
        // console.log("Error connecting", error);
        if (error.response.status === 429) {
          toast.error("Too many requests. Retry later", {
            duration: 4000,
            icon: "💀",
          });
        } else {
          toast.error(error.response.data.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <h1
        onClick={() => navigate("/")}
        className="text-cyan-400 text-2xl sm:text-4xl font-extrabold absolute left-4 sm:left-6 cursor-pointer"
      >
        Todo App
      </h1>
      <div className="flex flex-col items-center text-cyan-500 bg-slate-800 shadow-md shadow-slate-900 p-4 mt-20 rounded-lg">
        <h1 className="text-xl sm:text-3xl font-bold text-cyan-400">{state}</h1>
        <p className="mt-2 sm:text-lg mb-2">
          {state === "Sign Up"
            ? "Create your account"
            : "Login to your account"}
        </p>
        <form onSubmit={handleSubmit}>
          {state === "Sign Up" ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-sm sm:text-lg">Name</p>
                <div className="flex gap-1 bg-cyan-700 rounded-full p-2 items-center">
                  <User className="text-slate-700 size-5"></User>
                  <input
                    value={name}
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="bg-transparent outline-0 placeholder-slate-700 px-2 text-black"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-sm sm:text-lg">Email</p>
                <div className="flex gap-1 bg-cyan-700 rounded-full p-2 items-center">
                  <Mail className="text-slate-700 size-5"></Mail>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="bg-transparent outline-0 placeholder-slate-700 px-2 text-black"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-sm sm:text-lg">Password</p>
                <div className="flex gap-1 bg-cyan-700 rounded-full p-2 items-center">
                  <Lock className="text-slate-700 size-5"></Lock>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="bg-transparent outline-0 placeholder-slate-700 px-2 text-black"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-sm sm:text-lg">Email</p>
                <div className="flex gap-1 bg-cyan-700 rounded-full p-2 items-center">
                  <Mail className="text-slate-700 size-5"></Mail>
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent outline-0 placeholder-slate-700 px-2 text-black"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-sm sm:text-lg">Password</p>
                <div className="flex gap-1 bg-cyan-700 rounded-full p-2 items-center">
                  <Lock className="text-slate-700 size-5"></Lock>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-transparent outline-0 placeholder-slate-700 px-2 text-black"
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-cyan-400 px-4 py-2 text-slate-950 rounded-xl text-sm sm:text-lg mt-4 w-full cursor-pointer hover:bg-cyan-500"
          >
            {state === "Sign Up" && (loading ? "Signing up..." : "Sign Up")}
            {state !== "Sign Up" && (loading ? "Connecting..." : "Login")}
          </button>
        </form>

        <div className="flex flex-col items-center justify-center px-8 py-2 text-sm sm:text-lg mt-6 rounded-xl border-[1px] shadow-md shadow-cyan-500">
          <p className="text-sm sm:text-lg">
            {state === "Sign Up"
              ? "Already have an account ?"
              : "Don't have an account ?"}
          </p>
          <span
            onClick={() => {
              state === "Sign Up" ? setState("Login") : setState("Sign Up");
            }}
            className="text-sm sm:text-lg underline cursor-pointer text-cyan-400 hover:text-cyan-600"
          >
            {state === "Sign Up" ? "Login" : "Sign Up"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
