import React from "react";
import { ZapIcon } from "lucide-react";

const RateLimiter = () => {
  return (
    <div className=" flex items-center justify-center flex-col text-white mt-8">
      <div className="rounded-full border-2 border-cyan-500 p-4 sm:p-8 mb-4 mt-4 shadow-md shadow-slate-800">
        <ZapIcon className="size-10 text-cyan-500 font-bold"></ZapIcon>
      </div>
      <h2 className="text-2xl sm:text-4xl font-extrabold text-cyan-300 mb-4 text-shadow-md text-shadow-cyan-700">
        Rate Limit Reached
      </h2>
      <p className="text-center text-sm sm:text-lg px-4 mb-6 sm:mb-10 text-slate-200 font-semibold">
        You've made too many requests in a short period. Please wait a moment.
      </p>
      <p className="text-cyan-500 text-sm sm:text-lg font-bold">
        Refresh page in a few seconds for the best experience.
      </p>
    </div>
  );
};

export default RateLimiter;
