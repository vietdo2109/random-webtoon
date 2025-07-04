import { ChevronDown } from "lucide-react";

const MobileIntroduce = () => {
  return (
    <div className="w-full flex flex-col gap-3 items-center md:hidden mb-5">
      <ChevronDown className="text-purple-400" />

      <p className="max-w-[80%] text-center text-white font-zain text-xl md:text-2xl">
        ✌️ Hello! I{"’"}m VDuck, creator of this site that helps you find random
        webtoons when you{"’"}re looking for something new and interesting.
        There{"’"}s a ton out there — let{"’"}s find your next binge.
      </p>
      <ChevronDown className="text-purple-400" />
    </div>
  );
};

export default MobileIntroduce;
