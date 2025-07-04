"use client";
import { useEffect, useState } from "react";
const initialText =
  "_DEVELOPED_USING_NEXTJS_（づ￣3￣）づ╭❤️～_DEPLOYED_ON_VERCEL_(👉ﾟヮﾟ)👉_NOT_FOR_COMMERCIAL_USE_👈(ﾟヮﾟ👈)_".repeat(
    5
  ); // repeat for longer scroll
const SlidingTextFooter = () => {
  const [text, setText] = useState(initialText);

  useEffect(() => {
    const interval = setInterval(() => {
      setText((prev) => prev.slice(-1) + prev.slice(0, -1));
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden whitespace-nowrap text-[12px] font-bold text-light-gray bg-dark-gray hover:text-yellow-400 p-2 mt-10">
      {text}
    </div>
  );
};

export default SlidingTextFooter;
