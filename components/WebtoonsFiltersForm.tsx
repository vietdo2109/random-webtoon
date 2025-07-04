"use client";

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
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  setChapterRange,
  setScoreRange,
  setSelectedGenres,
  setSelectedGenresStatus,
  setSelectedTags,
  setSelectedTagsStatus,
  setYearRange,
} from "@/lib/features/filters/filterSlice";
import { usePathname } from "next/navigation";
import { filtersToQueryVariables } from "@/lib/filtersToQueryVariables";

const WebtoonsFiltersForm = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);
  const router = useRouter();

  const genresCollection = GENRE_COLLECTION.map((str) => str); // all genres options
  const tagsCollection = TAG_COLLECTION.map((str) => str);
  const [genres, setGenres] = useState<string[]>(filters.selectedGenres); // selected genres (included and excluded)
  const [genresStatus, setGenresStatus] = useState<number[]>(
    filters.selectedGenresStatus
  ); // selected genres status (included = 0. excluded = 1.)
  const [tags, setTags] = useState<string[]>(filters.selectedTags); // selected tags (included and excluded)
  const [tagsStatus, setTagsStatus] = useState<number[]>(
    filters.selectedTagsStatus
  ); // selected tags status (included = 0. excluded = 1.)
  const [chapter, setChapter] = useState<[number, number]>(
    filters.chapterRange
  );

  const [score, setScore] = useState<[number, number]>(filters.scoreRange);
  const [year, setYear] = useState<[number, number]>(filters.yearRange);
  const pathname = usePathname();
  const handleSubmit = async (type: "single" | "list") => {
    // dispatch actions to update redux filter state
    dispatch(setSelectedGenres(genres));
    dispatch(setSelectedGenresStatus(genresStatus));
    dispatch(setSelectedTags(tags));
    dispatch(setSelectedTagsStatus(tagsStatus));
    dispatch(setYearRange(year));
    dispatch(setScoreRange(score));
    dispatch(setChapterRange(chapter));

    const queryVariables = filtersToQueryVariables(filters);

    if (type === "single") {
      // get single random webtoon with formData (id, name) => create slug
      const randomWebtoons: Webtoon[] = await getRandomWebtoonsByFilters(
        50,
        queryVariables
      );
      const randomOne = Math.floor(Math.random() * randomWebtoons.length) + 1;
      const slug = slugify(randomWebtoons[randomOne].title);
      // navigate to /webtoon/[id]/[slug - webtoon name]
      router.push(`/webtoon/${randomWebtoons[randomOne].id}/${slug}`);
    } else {
      // pass this formData to /webtoons (redux??)
      // navigate to /webtoons and get random webtoons list there

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
          selectedListSetter={setTags}
          statusListSetter={setTagsStatus}
          statusList={tagsStatus}
          selectedList={tags}
        />

        <FilterInput
          title="Genres"
          placeholder="filter genre..."
          filterList={genresCollection}
          selectedListSetter={setGenres}
          statusList={genresStatus}
          statusListSetter={setGenresStatus}
          selectedList={genres}
        />

        <div className="flex flex-col items-start">
          <h3>Additional fitlers</h3>
          <div className="flex w-full rounded-sm items-center justify-between gap-6 bg-input-field-gray p-4 flex-wrap">
            <div className=" flex-1  flex flex-col gap-2  items-center">
              <h4 className="text-[16px]">Number of chapters</h4>
              <div className="flex justify-center gap-4 items-center">
                <Input
                  type="number"
                  min={0}
                  value={chapter[0]}
                  onChange={(e) => {
                    const chapterRange = [...chapter];

                    setChapter([e.target.valueAsNumber, chapterRange[1]]);
                  }}
                  className="p-1 w-10 h-8 border-2 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
                -
                <Input
                  type="number"
                  min={0}
                  value={chapter[1]}
                  onChange={(e) => {
                    const chapterRange = [...chapter];
                    setChapter([chapterRange[0], e.target.valueAsNumber]);
                  }}
                  className="p-1 w-10 h-8 border-2 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
            </div>
            <div className=" flex-1  flex flex-col gap-2  items-center">
              <h4 className="text-[16px]">Score range</h4>
              <div className="flex justify-center gap-4 items-center">
                <Input
                  type="number"
                  min={0}
                  max={10}
                  step={0.1}
                  value={score[0]}
                  onChange={(e) => {
                    const scoreRange = [...score];
                    setScore([e.target.valueAsNumber, scoreRange[1]]);
                  }}
                  className="p-1 w-10 h-8 border-2 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
                -
                <Input
                  type="number"
                  min={0}
                  max={10}
                  step={0.1}
                  value={score[1]}
                  onChange={(e) => {
                    const scoreRange = [...score];
                    setScore([scoreRange[0], e.target.valueAsNumber]);
                  }}
                  className="p-1 w-10 h-8 border-2 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
            </div>
            <div className=" flex-1  flex flex-col gap-2 items-center">
              <h4 className="text-[16px]">Release year</h4>
              <div className="flex justify-center gap-4 items-center">
                <Input
                  type="number"
                  value={year[0]}
                  min={1970}
                  onChange={(e) => {
                    const yearRange = [...year];
                    setYear([e.target.valueAsNumber, yearRange[1]]);
                  }}
                  className="p-1 w-10 h-8 border-2 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
                -
                <Input
                  type="number"
                  value={year[1]}
                  min={1970}
                  onChange={(e) => {
                    const yearRange = [...year];
                    setYear([yearRange[0], e.target.valueAsNumber]);
                  }}
                  className="p-1 w-10 h-8 border-2 text-center [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                />
              </div>
            </div>
          </div>
        </div>
        {pathname !== "/webtoons" && pathname !== "/webtoon" && (
          <div className="flex gap-4 justify-center mt-6 mb-5 flex-col md:flex-row">
            <Button
              type="button"
              onClick={() => handleSubmit("single")}
              className="flex-1 text-xl font-zain cursor-pointer "
              variant="secondary"
            >
              Generate single, random webtoon
            </Button>
            <Button
              type="button"
              onClick={() => handleSubmit("list")}
              className="flex-1 text-xl font-zain cursor-pointer bg-purple-500 hover:bg-purple-600"
            >
              Generate list of random webtoons
            </Button>
          </div>
        )}
        {pathname === "/webtoons" && (
          <Button
            type="button"
            onClick={() => handleSubmit("list")}
            className="flex-1 text-xl font-zain cursor-pointer bg-purple-500 hover:bg-purple-600"
          >
            Re-generate list of random webtoons
          </Button>
        )}
        {pathname === "/webtoon" && (
          <Button
            type="button"
            onClick={() => handleSubmit("single")}
            className="flex-1 text-xl font-zain cursor-pointer bg-purple-500 hover:bg-purple-600"
          >
            Re-generate random webtoon
          </Button>
        )}
      </div>
    </form>
  );
};

export default WebtoonsFiltersForm;
