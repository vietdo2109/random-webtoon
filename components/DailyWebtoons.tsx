import { getDailyWebtoons } from "@/data/dailyWebtoons";
import { DailyWebtoon } from "@/types/dailyWebtoon";
import Image from "next/image";
import { ChevronLeft, ChevronRight, StarIcon } from "lucide-react";
import { getWebtoonsByGenres } from "@/lib/getWebtoonsByGenres";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { slugify } from "@/lib/slugify";

const DailyWebtoons = async () => {
  const dailyConfig = await getDailyWebtoons();
  const webtoonsByDailyGenre: DailyWebtoon[] = await getWebtoonsByGenres(18, [
    dailyConfig.genre,
  ]);
  const [todayWebtoon, yesterdayWebtoon, twoDaysAgoWebtoon] = [
    ...dailyConfig.webtoons,
  ];
  const chunkedWebtoons: DailyWebtoon[][] = [];
  for (let i = 0; i < webtoonsByDailyGenre.length; i += 6) {
    chunkedWebtoons.push(webtoonsByDailyGenre.slice(i, i + 6));
  }
  return (
    <>
      <h1 className="font-lilita-one text-xl md:text-3xl mt-5 flex items-center gap-3">
        {" "}
        <StarIcon fill="white" />
        Random webtoon of the day
      </h1>
      <div className="flex flex-col md:flex-row w-full max-w-[1110px] h-auto gap-3 mt-4">
        <Link
          href={`webtoon/${todayWebtoon.id}/${slugify(todayWebtoon.title)}`}
          className="relative aspect-[1.5/1] md:aspect-[1/1] w-full md:w-[43%] rounded-md overflow-hidden  cursor-pointer"
        >
          <Image
            src={todayWebtoon.coverImage}
            alt={todayWebtoon.title}
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
              {todayWebtoon.title}
            </p>{" "}
          </div>
        </Link>
        <div className="w-full flex gap-3 md:flex-1">
          <Link
            href={`webtoon/${yesterdayWebtoon.id}/${slugify(
              yesterdayWebtoon.title
            )}`}
            className="relative flex-1 h-auto rounded-md overflow-hidden cursor-pointer"
          >
            <div className="relative h-full w-full aspect-[0.8/1] md:aspect-[315/480] ">
              <Image
                src={yesterdayWebtoon.coverImage}
                alt={yesterdayWebtoon.title + ""}
                fill
                unoptimized
                className="object-cover object-top"
              />
              <div className="absolute bottom-0 left-0 h-[60%] w-full bg-gradient-to-b from-black/0 to-black/100 z-10" />
              <div className="absolute z-100 bottom-0 left-0 font-zain p-2 px-2 md:p-6 md:px-4">
                <div className="bg-black p-1 text-[10px] md:text-sm rounded-sm font-[600] px-2 w-fit">
                  {" "}
                  Yesterday
                </div>

                <p className="text-md md:text-xl font-lilita-one font-thin tracking-wide">
                  {yesterdayWebtoon.title}
                </p>
              </div>
            </div>
          </Link>

          <Link
            href={`webtoon/${twoDaysAgoWebtoon.id}/${slugify(
              twoDaysAgoWebtoon.title
            )}`}
            className="relative flex-1 h-auto rounded-md overflow-hidden cursor-pointer"
          >
            <div className="relative h-full w-full aspect-[0.8/1] md:aspect-[315/480] ">
              <Image
                src={twoDaysAgoWebtoon.coverImage}
                alt={twoDaysAgoWebtoon.title + ""}
                fill
                unoptimized
                className="object-cover object-top"
              />
              <div className="absolute bottom-0 left-0 h-[60%] w-full bg-gradient-to-b from-black/0 to-black/100 z-10" />
              <div className="absolute z-100 bottom-0 left-0 font-zain p-2 px-2 md:p-6 md:px-4">
                <div className="bg-black p-1 text-[10px] md:text-sm rounded-sm font-[600] px-2 w-fit">
                  {" "}
                  2 days ago
                </div>

                <p className="text-md md:text-xl font-lilita-one font-thin tracking-wide">
                  {twoDaysAgoWebtoon.title}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="w-full flex justify-between">
        <h1 className="font-lilita-one text-xl md:text-3xl mt-[50px] gap-3">
          {" "}
          Genre of the day: {dailyConfig.genre}
        </h1>
        <div className="flex mt-[50px] md:hidden">
          {" "}
          <ChevronLeft className="cursor-pointer" />
          <ChevronRight className="cursor-pointer" />
        </div>
      </div>

      <div className="flex gap-2 mt-4 w-full relative">
        <Carousel draggable={false} className="w-full">
          <CarouselContent>
            {chunkedWebtoons.map((group, groupIndex) => (
              <CarouselItem key={groupIndex} className="w-full ">
                <div className="grid grid-cols-3 md:grid-cols-6 gap-x-2 gap-y-3 ">
                  {group.map((webtoon, index) => {
                    const slug = slugify(webtoon.title);
                    return (
                      <div key={index} className="">
                        <Link href={`/webtoon/${webtoon.id}/${slug}`}>
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
                    );
                  })}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="max-[768px]:hidden absolute mt-[-40px] md:mt-[-30px] left-0 -ml-5 z-100 bg-black cursor-pointer opacity-80 hover:bg-black hover:text-white transition-opacity duration-300 disabled:opacity-0 disabled:pointer-events-none border-0 h-10 w-10" />
          <CarouselNext className="max-[768px]:hidden absolute mt-[-40px] md:mt-[-30px] right-0 -mr-5 z-100 bg-black cursor-pointer opacity-80  hover:bg-black hover:text-white transition-opacity duration-300 disabled:opacity-0 disabled:pointer-events-none border-0 h-10 w-10" />
        </Carousel>
      </div>
    </>
  );
};

export default DailyWebtoons;
