import { slugify } from "@/lib/slugify";
import { WebtoonSearch } from "@/types/webtoon";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

const SearchResult = ({
  searchResult,
  hasNextPage,
  loadmore,
  navigateTo,
}: {
  searchResult: WebtoonSearch[];
  hasNextPage: boolean;
  loadmore: () => void;
  navigateTo: string;
}) => {
  return (
    <>
      {searchResult.length > 0 && (
        <ul className=" w-full flex flex-col gap-4 mt-4 md:grid grid-cols-2">
          {searchResult.map((item) => {
            return (
              <li key={item.id} className="w-full flex h-[100px] font-poppins">
                <Link
                  href={`${navigateTo}/${item.id}/${slugify(
                    item.title.english || item.title.romaji
                  )}`}
                  className="w-full flex h-[100px] font-poppins hover:bg-input-field-gray"
                >
                  <div className="h-[100px] aspect-[3/4] relative rounded-xs overflow-hidden">
                    <Image
                      src={item.coverImage}
                      alt="character image"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-1 h-full font-medium text-md justify-center px-3 ">
                    <h3>{item.title.english || item.title.romaji}</h3>
                    <p className="text-gray-500 text-xs">
                      {item.genres?.join(" · ")}
                    </p>
                    <p className="text-purple-400 font-poppins text-xs tracking-wide mt-2">
                      {item.status}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      {hasNextPage && (
        <Button onClick={loadmore} className="mt-4 cursor-pointer w-full">
          load more
        </Button>
      )}
    </>
  );
};

export default SearchResult;
