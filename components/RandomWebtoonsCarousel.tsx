"use client";

import { filtersToQueryVariables } from "@/lib/filtersToQueryVariables";
import { getRandomWebtoonsByFilters } from "@/lib/getRandomWebtoonsByFilters";
import { useAppSelector } from "@/lib/hooks";
import { Webtoon } from "@/types/webtoon";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Image from "next/image";
import Description from "./Description";
import Link from "next/link";
import { slugify } from "@/lib/slugify";
import LoadingSpinner from "./skeletons/LoadingSpinner";

const RandomWebtoonsCarousel = () => {
  const filters = useAppSelector((state) => state.filters);
  const queryVariables = filtersToQueryVariables(filters);
  const [webtoons, setWebtoons] = useState<Webtoon[]>([]); // adjust type if needed
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchWebtoons = async () => {
      setLoading(true);
      const result = await getRandomWebtoonsByFilters(10, queryVariables);
      setWebtoons(result);
      setLoading(false);
    };

    fetchWebtoons();
  }, [filters]);
  return (
    <div className="w-full mt-4 relative ">
      {" "}
      {loading && (
        <div className=" flex justify-center pr-2 h-full items">
          <LoadingSpinner width={100} height={100} />
        </div>
      )}
      {/* Add horizontal padding */}
      {!loading && (
        <Carousel opts={{ loop: true }} className="overflow-visible">
          <CarouselContent className="flex">
            {webtoons.map((webtoon) => {
              const genres = webtoon.genres?.join(" · ");
              return (
                <CarouselItem
                  key={webtoon.id}
                  className="basis-[76%] sm:basis-[50%] md:basis-[50%] lg:basis-[40%] flex mr-1 md:mr-2"
                >
                  <div className="w-full flex flex-col gap-3 md:gap-4 md:min-w-[300px] bg-input-field-gray rounded-xl p-2 sm:p-4 md:p-6 h-fit min-h-[480px] sm:min-h-[580px] md:min-h-[620px] lg:md:min-h-[630px]">
                    <div className="w-full aspect-[1/1] rounded-xl relative overflow-hidden xs:bg-black">
                      <Image
                        unoptimized
                        src={webtoon.coverImage || ""}
                        alt="webtoon cover image"
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="flex flex-col gap-1 mt-2 px-2 sm:px-0">
                      <p className="font-poppins text-gray-500 text-xs">
                        {genres}
                      </p>
                      <div className="w-full flex justify-between relative">
                        <Link
                          href={`webtoon/${webtoon.id}/${slugify(
                            webtoon.title
                          )}`}
                          className="max-w-[90%]"
                        >
                          {" "}
                          <h1 className="font-poppins font-semibold text-xl md:text-3xl  cursor-pointer hover:text-purple-400">
                            {webtoon.title}
                          </h1>
                        </Link>
                      </div>
                    </div>
                    <div className="px-2 sm:px-0">
                      <Description text={webtoon.description || ""} />
                    </div>
                    <div className="px-2 sm:px-0">
                      <p className="text-purple-400 font-poppins text-xs tracking-wide ">
                        Status: {webtoon.status}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          {/* Arrows */}
          <CarouselPrevious className="max-[768px]:hidden absolute left-2 top-[300px] -translate-y-1/2 z-10 bg-black opacity-80 hover:text-black border-0 h-10 w-10" />
          <CarouselNext className="max-[768px]:hidden absolute right-2 top-[300px] -translate-y-1/2 z-10 bg-black opacity-80 hover:text-black border-0 h-10 w-10" />
        </Carousel>
      )}
    </div>
  );
};

export default RandomWebtoonsCarousel;
