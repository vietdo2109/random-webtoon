"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const Description = ({ text }: { text: string }) => {
  const [isFullText, setIsFullText] = useState(false);
  return (
    <div className="w-full flex gap-4 items-start">
      <p
        className={`${
          !isFullText ? "line-clamp-2" : ""
        } text-gray-300 font-poppins text-xs tracking-wide flex-1 leading-5`}
      >
        {" "}
        {text}
      </p>
      <div className="w-50px">
        <div
          onClick={() => {
            setIsFullText(!isFullText);
          }}
          className="mt-2"
        >
          {" "}
          {isFullText ? (
            <ChevronUp className="w-[20px] h-[20px]" />
          ) : (
            <ChevronDown className="w-[20px] h-[20px]" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Description;
