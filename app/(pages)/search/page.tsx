import WebtoonSearch from "@/components/WebtoonSearch";

const Search = () => {
  return (
    <main className="flex flex-col gap-2">
      <h1 className="font-lilita-one text-3xl">Search</h1>
      <div className="bg-white w-full h-[1px]"></div>
      <p>
        Looking for something in particular? Perform a search of the entire site
        to find the webtoon you are looking for. This is a simple search
        function, so keep in mind spelling is important. If you can{"’"}t find
        the webtoon you are looking for, feel free to suggest it be added 🧐🧐.
      </p>
      <WebtoonSearch />
    </main>
  );
};

export default Search;
