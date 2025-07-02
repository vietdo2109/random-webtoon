import CharactersList from "@/components/CharactersList";
import Description from "@/components/Description";
import { getWebtoonById } from "@/lib/getWebtoonById";
import type { FuzzyDate, Webtoon } from "@/types/webtoon";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

const Webtoon = async ({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) => {
  const { id } = await params;
  const formatDate = (date: FuzzyDate): ReactNode => {
    if (date?.day && date?.month && date?.year) {
      const result = new Date(
        date.year,
        date.month - 1,
        date.day
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return result;
    } else {
      return "Unknown date";
    }
  };
  const webtoon: Webtoon = await getWebtoonById(parseFloat(id));
  console.log(webtoon);
  const genres = webtoon.genres?.join(" · ");
  return (
    <main className="w-full flex flex-col gap-4 md:flex-row">
      <div className="w-full flex flex-col gap-4 md:min-w-[300px] md:max-w-[360px]">
        <div className="w-full aspect-[1/1] bg-input-field-gray rounded-xl relative overflow-hidden xs:bg-black">
          <Image
            unoptimized
            src={webtoon.coverImage || ""}
            alt="webtoon cover image"
            fill
            className="object-cover object-top"
          ></Image>
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <p className="font-poppins text-gray-500 text-xs">{genres}</p>
          <div className="w-full flex items-center justify-between">
            {" "}
            <h1 className="font-poppins font-semibold text-3xl max-w-[90%]">
              {webtoon.title}
            </h1>
            <div className="cursor-pointer">
              {/* client component to add webtoon to my-series */}
              <PlusCircle />
            </div>
          </div>
        </div>

        <Description text={webtoon.description || ""} />
        <div>
          <p className="text-purple-400 font-poppins text-xs tracking-wide">
            Status: {webtoon.status}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full lg:flex-row">
        <div className="w-full lg:flex lg:w-[45%] flex-col gap-4">
          <div className="w-full">
            <h2 className="font-poppins font-semibold">More information</h2>
            <div className="w-full flex flex-col gap-1">
              <div className="bg-input-field-gray p-3 flex justify-between font-poppins text-xs rounded-sm mt-1">
                <h3>Chapters:</h3>
                <p>{webtoon.chapters ?? "No information"}</p>
              </div>
              <div className="bg-input-field-gray p-3 flex justify-between font-poppins text-xs rounded-sm mt-1">
                <h3>Start date:</h3>
                <p>{formatDate(webtoon.startDate)} </p>
              </div>
              <div className="bg-input-field-gray p-3 flex justify-between font-poppins text-xs rounded-sm mt-1">
                <h3>End date:</h3>
                <p> {formatDate(webtoon.endDate)} </p>
              </div>
              <div className="bg-input-field-gray p-3 flex justify-between font-poppins text-xs rounded-sm mt-1">
                <h3>Average score:</h3>
                <p>{webtoon.averageScore}</p>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <h2 className="font-poppins font-semibold">Tags</h2>

            <div className="flex flex-wrap gap-1 mt-1">
              {webtoon.tags?.map((tag) => (
                <div
                  className="p-2 bg-input-field-gray rounded-sm"
                  key={tag.name}
                >
                  <p className="text-gray-300 font-poppins text-xs">
                    {tag.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:flex-1">
          <h2 className="font-poppins font-semibold">Characters</h2>
          <CharactersList characters={webtoon.characters.nodes} />
        </div>
        <div className="lg:hidden">
          <h2 className="font-poppins font-semibold">Tags</h2>

          <div className="flex flex-wrap gap-1 mt-1">
            {webtoon.tags?.map((tag) => (
              <div
                className="p-2 bg-input-field-gray rounded-sm"
                key={tag.name}
              >
                <p className="text-gray-300 font-poppins text-xs">{tag.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Webtoon;
