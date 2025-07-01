"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { GENRE_COLLECTION } from "@/constants/genres";
import { TAG_COLLECTION } from "@/constants/tags";
import FilterInput from "./FilterInput";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/slugify";
import { getRandomWebtoonsByFilters } from "@/lib/getRandomWebtoonsByFilters";
import { Webtoon } from "@/types/webtoon";
import { safeParse } from "zod/v4/core";

const propertySchema = z.object({
  tags: z.array(z.string()),
  excludedTags: z.array(z.string()),
  genres: z.array(z.string()),
  excludedGenres: z.array(z.string()),
  chapterGreater: z.number(),
  chapterLesser: z.number(),
  scoreGreater: z.number(),
  scoreLesser: z.number(),
  yearGreater: z.number(),
  yearLesser: z.number(),
});

type Props = {
  defaultValues?: z.infer<typeof propertySchema>;
};

const WebtoonsFiltersForm = ({ defaultValues }: Props) => {
  const genresCollection = GENRE_COLLECTION.map((str) => str); // all genres options
  const tagsCollection = TAG_COLLECTION.map((str) => str);
  const [genresFilterList, setGenresFilterList] = useState<string[]>([]); // selected genres (included and excluded)
  const [genreStatus, setGenreStatus] = useState<number[]>([]); // selected genres status (included = 0. excluded = 1.)
  const [tagsFilterList, setTagsFilterList] = useState<string[]>([]); // selected tags (included and excluded)
  const [tagStatus, setTagStatus] = useState<number[]>([]); // selected tags status (included = 0. excluded = 1.)
  const [chapterGreater, setChapterGreater] = useState<number>(1);
  const [chapterLesser, setChapterLesser] = useState<string>("");
  const [scoreRange, setScoreRange] = useState<number[]>([0.0, 10.0]);
  const [yearRange, setYearRange] = useState<number[]>([
    1970,
    new Date().getFullYear(),
  ]);

  const router = useRouter();

  const handleSubmit = async (type: "single" | "list") => {
    // get included and excluded tags and genres

    const includedTags: string[] = [];
    const excludedTags: string[] = [];

    tagsFilterList.forEach((selectedTag, index) => {
      if (tagStatus[index] === 0) includedTags.push(selectedTag);
      if (tagStatus[index] === 1) excludedTags.push(selectedTag);
    });

    const includedGenres: string[] = [];
    const excludedGenres: string[] = [];

    genresFilterList.forEach((selectedGenre, index) => {
      if (genreStatus[index] === 0) includedGenres.push(selectedGenre);
      if (genreStatus[index] === 1) excludedGenres.push(selectedGenre);
    });

    const formData = {
      tags: includedTags.length === 0 ? undefined : includedTags,
      excludedTags: excludedTags.length === 0 ? undefined : excludedTags,
      genres: includedGenres.length === 0 ? undefined : includedGenres,
      excludedGenres: excludedGenres.length === 0 ? undefined : excludedGenres,
      chapterGreater: chapterGreater,
      chapterLesser:
        chapterLesser === "" ? undefined : parseFloat(chapterLesser),
      scoreGreater: scoreRange[0],
      scoreLesser: scoreRange[1],
      yearGreater: yearRange[0],
      yearLesser: yearRange[1],
    };

    if (type === "single") {
      // get single random webtoon with formData (id, name) => create slug
      const randomWebtoons: Webtoon[] = await getRandomWebtoonsByFilters(
        50,
        formData
      );
      console.log(formData);
      const randomOne = Math.floor(Math.random() * randomWebtoons.length) + 1;
      console.log(randomWebtoons[randomOne]);
      const slug = slugify(randomWebtoons[randomOne].title);
      // navigate to /webtoon/[id]/[slug - webtoon name]
      router.push(`/webtoon/${randomWebtoons[randomOne].id}/${slug}`);

      console.log(formData);
    } else {
      // pass this formData to /webtoons (redux??)
      // navigate to /webtoons and get rendom webtoons list there

      console.log(formData);
      router.push(`webtoons`);
    }
  };
  return (
    <form>
      <div className="flex flex-col gap-3 text-xl font-zain">
        <FilterInput
          title="Tags"
          placeholder="filter tag..."
          filterList={tagsCollection}
          selectedListSetter={setTagsFilterList}
          statusListSetter={setTagStatus}
          statusList={tagStatus}
          selectedList={tagsFilterList}
        />

        <FilterInput
          title="Genres"
          placeholder="filter genre..."
          filterList={genresCollection}
          selectedListSetter={setGenresFilterList}
          statusList={genreStatus}
          statusListSetter={setGenreStatus}
          selectedList={genresFilterList}
        />

        <div className="flex flex-col items-start">
          <h3>Additional fitlers</h3>
          <div className="flex w-full rounded-sm items-center justify-between gap-6 bg-input-field-gray p-4">
            <div className=" flex-1  flex flex-col gap-2">
              <h4 className="text-[16px]">Number of chapters</h4>
              <div className="flex justify-center gap-4 items-center">
                <Input
                  type="number"
                  min={0}
                  value={chapterGreater}
                  onChange={(e) => {
                    setChapterGreater(e.target.valueAsNumber);
                  }}
                  className="p-1 w-10 h-8 border-2 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
                -
                <Input
                  type="number"
                  min={0}
                  value={chapterLesser}
                  onChange={(e) => {
                    setChapterLesser(e.target.value);
                  }}
                  className="p-1 w-10 h-8 border-2 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
            </div>
            <div className=" flex-1  flex flex-col gap-2">
              <h4 className="text-[16px]">Score range</h4>
              <div className="flex justify-center gap-4 items-center">
                <Input
                  type="number"
                  min={0}
                  max={10}
                  step={0.1}
                  value={scoreRange[0]}
                  onChange={(e) => {
                    const scoreRangeUpdated = [...scoreRange];
                    scoreRangeUpdated[0] = e.target.valueAsNumber;
                    setScoreRange(scoreRangeUpdated);
                  }}
                  className="p-1 w-10 h-8 border-2 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
                -
                <Input
                  type="number"
                  min={0}
                  max={10}
                  step={0.1}
                  value={scoreRange[1]}
                  onChange={(e) => {
                    const scoreRangeUpdated = [...scoreRange];
                    scoreRangeUpdated[1] = e.target.valueAsNumber;
                    setScoreRange(scoreRangeUpdated);
                  }}
                  className="p-1 w-10 h-8 border-2 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
            </div>
            <div className=" flex-1  flex flex-col gap-2">
              <h4 className="text-[16px]">Release year</h4>
              <div className="flex justify-center gap-4 items-center">
                <Input
                  type="number"
                  value={yearRange[0]}
                  min={1970}
                  onChange={(e) => {
                    const yearRangeUpdated = [...yearRange];
                    yearRangeUpdated[0] = e.target.valueAsNumber;
                    setYearRange(yearRangeUpdated);
                  }}
                  className="p-1 w-10 h-8 border-2 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
                -
                <Input
                  type="number"
                  value={yearRange[1]}
                  min={1970}
                  onChange={(e) => {
                    const yearRangeUpdated = [...yearRange];
                    yearRangeUpdated[1] = e.target.valueAsNumber;
                    setYearRange(yearRangeUpdated);
                  }}
                  className="p-1 w-10 h-8 border-2 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center mt-6 mb-5">
          <Button
            type="button"
            onClick={() => handleSubmit("single")}
            className="flex-1 text-xl font-zain cursor-pointer  h-[50px]"
            variant="secondary"
          >
            Generate single, random webtoon
          </Button>
          <Button
            type="button"
            onClick={() => handleSubmit("list")}
            className="flex-1 text-xl font-zain cursor-pointer h-[50px] bg-purple-500 hover:bg-purple-600"
          >
            Generate list of random webtoons
          </Button>
        </div>
      </div>
    </form>
  );
};

export default WebtoonsFiltersForm;
