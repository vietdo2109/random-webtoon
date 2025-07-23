"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { GENRE_COLLECTION } from "@/constants/genres";
import { TAG_COLLECTION } from "@/constants/tags";
import { getRandomWebtoonsByFilters } from "@/lib/getRandomWebtoonsByFilters";
import type { Webtoon } from "@/types/webtoon";
import { slugify } from "@/lib/slugify";
import Description from "./Description";
import Link from "next/link";

const spinDuration = 2;

const WebtoonSlotMachine = () => {
  const [spinning, setSpinning] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [webtoon, setWebtoon] = useState<Webtoon | null>(null);
  const [tagOffset, setTagOffset] = useState(0);
  const [genreOffset, setGenreOffset] = useState(0);
  const [noMatch, setNoMatch] = useState(false);
  const spin = async () => {
    setSpinning(true);
    setNoMatch(false);
    setWebtoon(null);

    const randomTagIndex = Math.floor(Math.random() * TAG_COLLECTION.length);
    const randomGenreIndex = Math.floor(
      Math.random() * GENRE_COLLECTION.length
    );

    const selectedTag = TAG_COLLECTION[randomTagIndex];
    const selectedGenre = GENRE_COLLECTION[randomGenreIndex];

    // Animate offset
    setTagOffset(randomTagIndex * 40);
    setGenreOffset(randomGenreIndex * 40);

    setSelectedTag(selectedTag);
    setSelectedGenre(selectedGenre);

    // Wait for the "spin" animation
    setTimeout(async () => {
      const result = await getRandomWebtoonsByFilters(1, {
        tags: [selectedTag],
        genres: [selectedGenre],
      });

      setWebtoon(result[0] || null);
      if (!webtoon) {
        setNoMatch(true);
      }
      setSpinning(false);
    }, spinDuration * 1000);
  };

  return (
    <div className="flex flex-col items-center mt-6 space-y-6 font-poppins">
      {/* SPINNERS */}
      <div className="flex space-x-4 items-end">
        {/* Genre reel */}
        <div className="flex flex-col">
          <div className="w-full text-center mb-2 font-semibold">Genre</div>
          <div className="w-[160px] h-[40px] overflow-hidden border rounded bg-black text-white text-center">
            <motion.div
              animate={{ y: spinning ? -genreOffset : -genreOffset }}
              transition={{ duration: spinDuration, ease: "easeInOut" }}
            >
              {GENRE_COLLECTION.map((genre, index) => (
                <div
                  key={index}
                  className="h-[40px] flex items-center justify-center"
                >
                  {genre}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Tag reel */}
        <div>
          <div className="w-full text-center mb-2 font-semibold">Tag</div>
          <div className="w-[160px] h-[40px] overflow-hidden border rounded bg-black text-white text-center">
            <motion.div
              animate={{ y: spinning ? -tagOffset : -tagOffset }}
              transition={{ duration: spinDuration, ease: "easeInOut" }}
            >
              {TAG_COLLECTION.map((tag, index) => (
                <div
                  key={index}
                  className="h-[40px] flex items-center justify-center"
                >
                  {tag}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        <Button
          onClick={spin}
          className=" h-[40px] bg-purple-500 hover:bg-purple-600 text-white text-lg"
          disabled={spinning}
        >
          {spinning ? (
            <div className="w-4 h-4 border-2 border-white border-b-transparent rounded-full animate-spin"></div>
          ) : (
            "Spin"
          )}
        </Button>
      </div>
      {/* RESULT */}
      {webtoon && (
        <div className="w-[450px] flex flex-col gap-3 md:gap-4 md:min-w-[300px] bg-input-field-gray rounded-xl p-2 sm:p-4 md:p-6 h-fit">
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
              {webtoon.genres?.join(" · ")}
            </p>
            <div className="w-full flex justify-between relative">
              <Link
                href={`webtoon/${webtoon.id}/${slugify(webtoon.title)}`}
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
      )}
      {noMatch && (
        <div className="text-center text-yellow-500 font-medium mt-4">
          🎰 Oops! No match this time. Try another spin!
        </div>
      )}{" "}
    </div>
  );
};

export default WebtoonSlotMachine;
