import { getDailyWebtoons } from "@/data/dailyWebtoons";
import { updateDailyWebtoons } from "./actions";
import { DailyWebtoon } from "@/types/dailyWebtoon";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import { getWebtoonsByGenres } from "@/lib/getWebtoonsByGenres";
export default async function Home() {
  const dailyConfig = await getDailyWebtoons();
  if (!dailyConfig.todayFetch) {
    dailyConfig.webtoons = await updateDailyWebtoons(dailyConfig.webtoons);
  }

  const webtoonsByDailyGenre: DailyWebtoon[] = await getWebtoonsByGenres(6, [
    dailyConfig.genre,
  ]);
  console.log("by random genre: ", webtoonsByDailyGenre);

  return (
    <main className="flex flex-col">
      <h1 className="font-lilita-one text-3xl mt-5 flex items-center gap-3">
        {" "}
        <StarIcon fill="white" />
        Random webtoon of the day
      </h1>
      <div className="flex w-full max-w-[1110px] h-auto gap-3 mt-4">
        {dailyConfig.webtoons.map((webtoon: DailyWebtoon, index) => {
          if (index === 0) {
            return (
              <div
                key={index}
                className="relative aspect-[1/1] w-[43%] rounded-md overflow-hidden  cursor-pointer"
              >
                <Image
                  src={webtoon.coverImage}
                  alt={webtoon.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 h-[60%] w-full bg-gradient-to-b from-black/0 to-black/100 z-10" />

                <div className="absolute z-100 bottom-0 left-0 p-6 font-zain px-6">
                  <div className="bg-black p-1 text-sm rounded-sm font-[700] text-green-400 px-2 w-fit uppercase mb-1">
                    {" "}
                    Today
                  </div>{" "}
                  <p className="text-3xl font-lilita-one font-thin tracking-wide">
                    {webtoon.title}
                  </p>{" "}
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className="relative flex-1 h-auto rounded-md overflow-hidden cursor-pointer"
              >
                <div className="relative h-full w-full aspect-[315/480] sm:aspect-auto">
                  <Image
                    src={webtoon.coverImage}
                    alt={webtoon.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 h-[60%] w-full bg-gradient-to-b from-black/0 to-black/100 z-10" />
                  <div className="absolute z-100 bottom-0 left-0 font-zain p-4">
                    <div className="bg-black p-1 text-sm rounded-sm font-[600] px-2 w-fit">
                      {" "}
                      {index === 1 ? "Yesterday" : "2 days ago"}
                    </div>

                    <p className="text-3xl font-lilita-one font-thin tracking-wide">
                      {webtoon.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>

      <h1 className="font-lilita-one text-3xl mt-[50px] flex items-center gap-3">
        {" "}
        Genre of the day: {dailyConfig.genre}
      </h1>
      <div className="flex gap-2 mt-4">
        {webtoonsByDailyGenre.map((webtoon, index) => (
          <div
            key={index}
            className="relative max-h-[480px] h-[270px] flex-1 cursor-pointer"
          >
            <div className="relative h-[90%] w-full aspect-[315/480] sm:aspect-auto rounded-[4px] overflow-hidden ">
              <Image
                src={webtoon.coverImage}
                alt={webtoon.title}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <p className="text-xl font-zain mt-1 font-semibold">
              {webtoon.title}
            </p>
          </div>
        ))}
      </div>
      <div className="flex w-full max-w-[1110px] h-auto gap-3 mt-4"></div>
    </main>
  );
}
