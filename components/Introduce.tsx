const Introduce = () => {
  return (
    <div className="w-full hidden md:block">
      <div className="w-full flex">
        <div className="w-1/2 border-2 z-10 border-dark-gray"></div>
        <div className="flex-1 h-[40px] border-l-2 border-b-2 border-purple-400 mr-4 rounded-bl-2xl"></div>
      </div>
      <div className="w-full flex relative ml-5 pr-5 justify-center">
        <div className="w-[52%] border-b-2 border-purple-400"></div>
        <div className="w-[48%] h-[132px] border-r-2 border-b-2 border-t-2 border-purple-400 -mt-[1.6px] rounded-r-2xl"></div>
        <div className="absolute inset-0 flex justify-center items-center px-8 py-6">
          <p className="max-w-[80%] text-center text-white font-zain text-2xl">
            ✌️ Hello! I{"’"}m VDuck, creator of this site that helps you find
            random webtoons when you{"’"}re looking for something new and
            interesting. There{"’"}s a ton out there — let{"’"}s find your next
            binge.
          </p>
        </div>
      </div>
      <div className="w-full flex relative mr-5 pr-5 ">
        <div className="w-[48%] h-[132px] border-l-2 border-b-2 border-t-2 border-purple-400 -mt-[1.6px] rounded-l-2xl"></div>
        <div className="w-[52%] border-b-2 border-purple-400"></div>
        <div className="absolute inset-0 flex justify-center items-center px-8 py-6">
          <p className="max-w-[80%] text-center text-white font-zain text-2xl">
            🎲 Generate Random Webtoon Lists Our tool pulls random webtoons from
            AniList. Go fully random, or fine-tune by genre, score, or status to
            match your taste.
          </p>
        </div>
      </div>
      <div className="w-full flex relative ml-5 pr-5">
        <div className="w-[52%] border-b-2 border-purple-400"></div>
        <div className="w-[48%] h-[132px] border-r-2 border-b-2 border-t-2 border-purple-400 -mt-[1.6px] rounded-r-2xl"></div>
        <div className="absolute inset-0 flex justify-center items-center px-8 py-6">
          <p className="max-w-[80%] text-center text-white font-zain text-2xl">
            📚 Learn About Each Series Each webtoon comes with cover art,
            description, tags, and more. View them one by one or as a full list
            — your choice!
          </p>
        </div>
      </div>
      <div className="w-full flex relative mr-5 pr-5">
        <div className="w-[48%] h-[132px] border-l-2 border-b-2 border-t-2 border-purple-400 -mt-[1.6px] rounded-l-2xl"></div>
        <div className="absolute inset-0 flex justify-center items-center px-8 py-6">
          <p className="max-w-[80%] text-center text-white font-zain text-2xl">
            ❤️ Save What You Love Logged-in users can save favorite webtoons and
            build a personal collection to revisit anytime.
          </p>
        </div>
      </div>
      <div className="w-full flex ml-3 pl-4">
        <div className="w-[50%] h-[60px] border-r-2 border-t-2 border-purple-400 mr-4 rounded-tr-2xl -mt-[1.6px]"></div>
        <div className="w-[50%] border-2 z-10 border-dark-gray"></div>
      </div>
    </div>
  );
};

export default Introduce;
