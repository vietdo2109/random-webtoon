"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import type { WebtoonSearch } from "@/types/webtoon";
import { getWebtoonsBySearch } from "@/lib/getWebtoonsBySearch";

import SearchResult from "./SearchResult";
import LoadingSpinner from "./skeletons/LoadingSpinner";
import { usePathname } from "next/navigation";
const WebtoonSearch = () => {
  const [titleSearch, setTitleSearch] = useState("");
  const [hasNextPage, setHasNextPage] = useState(false);
  const [searchResult, setSearchResult] = useState<WebtoonSearch[]>([]);
  const [debouncedTitle, setDebouncedTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  let navigateTo;
  if (pathname === "/search") navigateTo = "webtoon";
  if (pathname === "/similar-webtoon") navigateTo = "similar-webtoon";
  let page = 1;
  // Debounce input (throttle-like behavior)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTitle(titleSearch);
    }, 300); // Adjust delay as needed (ms)

    return () => {
      clearTimeout(handler);
    };
  }, [titleSearch]);

  // Fetch search results when debounced title changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (debouncedTitle.trim() === "") {
        setSearchResult([]);
        return;
      }

      const data = await getWebtoonsBySearch(page, 10, debouncedTitle);
      setLoading(false);

      setSearchResult(data.webtoonsBySearch);
      setHasNextPage(data.hasNextPage);
    };

    fetchData();
  }, [debouncedTitle]);

  const loadmore = async () => {
    page += 1;
    const data = await getWebtoonsBySearch(page, 10, debouncedTitle);
    setSearchResult([...searchResult, ...data.webtoonsBySearch]);
    setHasNextPage(data.hasNextPage);
  };
  return (
    <div className="w-full flex flex-col ">
      <div className="flex justify-center mt-3 md:w-[70%] self-center">
        <div className="flex items-center pl-2 rounded-l-sm bg-input-field-gray">
          <SearchIcon className="text-gray-400" />
        </div>
        <Input
          className="border-0 bg-input-field-gray rounded-r-sm rounded-l-[0px]  focus-visible:ring-0 "
          type="text"
          placeholder="Search for title"
          value={titleSearch}
          onChange={(e) => {
            setTitleSearch(e.target.value);
          }}
        />
      </div>
      <div className="w-full md:w-[70%] self-center">
        {loading && titleSearch !== "" && (
          <div className="w-full h-[100px] flex justify-center">
            <LoadingSpinner />
          </div>
        )}
        <SearchResult
          navigateTo={navigateTo || ""}
          searchResult={searchResult}
          loadmore={loadmore}
          hasNextPage={hasNextPage}
        />
      </div>
    </div>
  );
};

export default WebtoonSearch;
