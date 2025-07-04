import WebtoonSearch from "@/components/WebtoonSearch";
const SimilarWebtoon = () => {
  return (
    <main className="flex flex-col gap-2">
      <h1 className="font-lilita-one text-3xl">Webtoon like..</h1>
      <div className="bg-white w-full h-[1px]"></div>
      <p>
        Using AI to find similar webtoons. Webtoons similarity is scored with a
        wide variety of parameters such as synopsis, score, reviews, and more.
        Getting started is easy, simply choose an webtoon you{"’"}d like to find
        simliar titles to.
      </p>
      <WebtoonSearch />
    </main>
  );
};

export default SimilarWebtoon;
