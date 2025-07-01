// components/WebtoonSlotMachine.tsx
"use client";

import { useState, useEffect } from "react";
import { Webtoon } from "@/types/webtoon";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  webtoons: Webtoon[];
}

const WebtoonSlotMachine = ({ webtoons }: Props) => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<Webtoon | null>(null);
  const [reel, setReel] = useState<Webtoon[]>([]);

  useEffect(() => {
    setReel([...webtoons, ...webtoons]); // double the list for loop illusion
  }, [webtoons]);

  const spin = () => {
    setSpinning(true);
    setResult(null);
    const duration = 2000 + Math.random() * 1000;

    const timeout = setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * webtoons.length);
      setResult(webtoons[randomIndex]);
      setSpinning(false);
    }, duration);

    return () => clearTimeout(timeout);
  };

  return (
    <div className="mt-6 flex flex-col items-center w-full">
      <div className="w-[220px] h-[320px] bg-black overflow-hidden rounded-xl relative border-2 border-purple-500">
        <motion.div
          className="flex flex-col justify-center"
          animate={{ y: spinning ? `-${webtoons.length * 320}px` : 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          {reel.map((webtoon, idx) => (
            <img
              key={idx}
              src={webtoon.coverImage || ""}
              alt={webtoon.title}
              className="w-[220px] h-[300px] object-cover"
            />
          ))}
        </motion.div>
      </div>

      <Button
        onClick={spin}
        className="mt-4 text-lg bg-purple-500 hover:bg-purple-600"
      >
        Spin Slot Machine
      </Button>

      {result && (
        <div className="mt-6 flex flex-col items-center">
          <h3 className="text-xl font-semibold">{result.title}</h3>
        </div>
      )}
    </div>
  );
};

export default WebtoonSlotMachine;
