import { getDailyWebtoons } from "@/data/dailyWebtoons";
import { updateDailyWebtoons } from "./actions";
import { DailyWebtoon } from "@/types/dailyWebtoon";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import { getWebtoonsByGenres } from "@/lib/getWebtoonsByGenres";
import WebtoonsFiltersForm from "@/components/WebtoonsFiltersForm";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
export default async function Home() {
  const dailyConfig = await getDailyWebtoons();
  let webtoonsByDailyGenre: DailyWebtoon[];
  if (!dailyConfig.todayFetch) {
    dailyConfig.webtoons = await updateDailyWebtoons(dailyConfig.webtoons);
    webtoonsByDailyGenre = await getWebtoonsByGenres(18, [dailyConfig.genre]);
  } else {
    webtoonsByDailyGenre = await getWebtoonsByGenres(18, [dailyConfig.genre]);
  }

  const chunkedWebtoons = [];
  for (let i = 0; i < webtoonsByDailyGenre.length; i += 6) {
    chunkedWebtoons.push(webtoonsByDailyGenre.slice(i, i + 6));
  }
  console.log("by random genre: ", webtoonsByDailyGenre);

  const handleSubmit = () => {};
  return (
    <main className="flex flex-col">
      <h1 className="font-lilita-one text-xl md:text-3xl mt-5 flex items-center gap-3">
        {" "}
        <StarIcon fill="white" />
        Random webtoon of the day
      </h1>
      <div className="flex w-full max-w-[1110px] h-auto gap-3 mt-4">
        {dailyConfig.webtoons.map((webtoon: DailyWebtoon, index) => {
          if (index === 0) {
            return (
              <Link
                href={`webtoon/${webtoon.id}`}
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

                <div className="absolute z-100 bottom-0 left-0 p-2 px-2 md:p-6 font-zain md:px-6">
                  <div className="bg-black p-1 text-[10px] md:text-sm rounded-sm font-[700] text-green-400 px-2 w-fit uppercase mb-1">
                    {" "}
                    Today
                  </div>{" "}
                  <p className="text-md md:text-3xl font-lilita-one font-thin tracking-wide">
                    {webtoon.title}
                  </p>{" "}
                </div>
              </Link>
            );
          } else {
            return (
              <Link
                href={`webtoon/${webtoon.id}`}
                key={index}
                className="relative flex-1 h-auto rounded-md overflow-hidden cursor-pointer"
              >
                <div className="relative h-full w-full aspect-[315/480] sm:aspect-auto">
                  <Image
                    src={webtoon.coverImage}
                    alt={webtoon.title + ""}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 h-[60%] w-full bg-gradient-to-b from-black/0 to-black/100 z-10" />
                  <div className="absolute z-100 bottom-0 left-0 font-zain p-2 px-2 md:p-6 md:px-6">
                    <div className="bg-black p-1 text-[10px] md:text-sm rounded-sm font-[600] px-2 w-fit">
                      {" "}
                      {index === 1 ? "Yesterday" : "2 days ago"}
                    </div>

                    <p className="text-md md:text-3xl font-lilita-one font-thin tracking-wide">
                      {webtoon.title}
                    </p>
                  </div>
                </div>
              </Link>
            );
          }
        })}
      </div>

      <h1 className="font-lilita-one text-xl md:text-3xl mt-[50px] flex items-center gap-3">
        {" "}
        Genre of the day: {dailyConfig.genre}
      </h1>
      <div className="flex gap-2 mt-4 w-full relative">
        <Carousel draggable={false} className="w-full">
          <CarouselContent>
            {chunkedWebtoons.map((group, groupIndex) => (
              <CarouselItem key={groupIndex} className="w-full">
                <div className="grid grid-cols-6 gap-2 ">
                  {group.map((webtoon, index) => (
                    <div key={index} className="">
                      <Link href={`/webtoon/${webtoon.id}`}>
                        <div className="relative w-full aspect-[315/480] rounded-[4px] overflow-hidden cursor-pointer">
                          <Image
                            src={webtoon.coverImage}
                            alt={webtoon.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </Link>

                      <p className="text-xl font-zain mt-1 font-semibold">
                        {webtoon.title}
                      </p>
                    </div>
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute my-auto left-0 -ml-5 z-1000 bg-black cursor-pointer opacity-80 hover:bg-black hover:text-white transition-opacity duration-300 disabled:opacity-0 disabled:pointer-events-none border-0 h-10 w-10" />
          <CarouselNext className="absolute my-auto right-0 -mr-5 z-1000 bg-black cursor-pointer opacity-80  hover:bg-black hover:text-white transition-opacity duration-300 disabled:opacity-0 disabled:pointer-events-none border-0 h-10 w-10" />
        </Carousel>
      </div>
      <div className="flex flex-col w-full ">
        <div className="w-full flex">
          <div className="w-1/2 border-2 z-10 border-dark-gray"></div>
          <div className="flex-1 h-[40px] border-l-2 border-b-2 border-purple-400 mr-4 rounded-bl-2xl"></div>
        </div>
        <div className="w-full flex relative ml-5 pr-5 justify-center">
          <div className="w-[52%] border-b-2 border-purple-400"></div>
          <div className="w-[48%] h-[180px] border-r-2 border-b-2 border-t-2 border-purple-400 -mt-[1.6px] rounded-r-2xl"></div>
          <div className="absolute inset-0 flex justify-center items-center px-8 py-6">
            <p className="max-w-[80%] text-center text-white font-zain text-2xl">
              ✌️Hello there! I'm VDuck, creator of this website which suggests
              random webtoons for those who are finding something new and
              interesting to read. There is a ton of webtoons out there, so
              let's find your next one to binge.
            </p>
          </div>
        </div>
        <div className="w-full flex relative mr-5 pr-5 ">
          <div className="w-[48%] h-[180px] border-l-2 border-b-2 border-t-2 border-purple-400 -mt-[1.6px] rounded-l-2xl"></div>
          <div className="w-[52%] border-b-2 border-purple-400"></div>
          <div className="absolute inset-0 flex justify-center items-center px-8 py-6">
            <p className="max-w-[80%] text-center text-white font-zain text-2xl">
              🎲 Generate Randomized Webtoon Lists Our generator creates
              randomized lists of webtoons from the AniList database. You can go
              full random for a surprise, or fine-tune your preferences like
              genre, score, or status to get results that match your taste.
            </p>
          </div>
        </div>
        <div className="w-full flex relative ml-5 pr-5">
          <div className="w-[52%] border-b-2 border-purple-400"></div>
          <div className="w-[48%] h-[180px] border-r-2 border-b-2 border-t-2 border-purple-400 -mt-[1.6px] rounded-r-2xl"></div>
          <div className="absolute inset-0 flex justify-center items-center px-8 py-6">
            <p className="max-w-[80%] text-center text-white font-zain text-2xl">
              📚 Learn About Each Series Each webtoon comes with detailed
              information: cover art, descriptions, tags, and more. You can view
              them one by one, or explore a list at a time — the choice is
              yours!
            </p>
          </div>
        </div>
        <div className="w-full flex relative mr-5 pr-5">
          <div className="w-[48%] h-[140px] border-l-2 border-b-2 border-t-2 border-purple-400 -mt-[1.6px] rounded-l-2xl"></div>
          <div className="absolute inset-0 flex justify-center items-center px-8 py-6">
            <p className="max-w-[80%] text-center text-white font-zain text-2xl">
              ❤️ Save What You Love Logged-in users can save their favourite
              webtoons and build their own collection. Keep track of what you’ve
              found and come back any time!
            </p>
          </div>
        </div>
        <div className="w-full flex ml-3 pl-4">
          <div className="w-[50%] h-[60px] border-r-2 border-t-2 border-purple-400 mr-4 rounded-tr-2xl -mt-[1.6px]"></div>
          <div className="w-[40%] border-2 z-10 border-dark-gray"></div>
        </div>
        <div className="w-full flex flex-col items-center p-8 rounded-2xl border-purple-400 border-4">
          <div className="w-[60%] text-center text-2xl">
            <h2 className="font-lilita-one">🚀 Let’s Get Started </h2>

            <p className="font-zain mt-2">
              Set your preferences (or not!), and click that button. Your next
              webtoon obsession is just a click away.
            </p>

            <WebtoonsFiltersForm />
          </div>
        </div>
      </div>
    </main>
  );
}
