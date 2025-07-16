import { getWebtoonById } from "@/lib/getWebtoonById";
import { Webtoon } from "@/types/webtoon";
import Image from "next/image";

const SimilarWebtoonResults = async ({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) => {
  const { id } = await params;
  const webtoon: Webtoon = await getWebtoonById(parseFloat(id));

  return (
    <div>
      <h1 className="font-lilita-one text-3xl">
        Webtoons like {webtoon.title}
      </h1>
      <div className="bg-white w-full h-[2px]"></div>

      <Image
        src={"/under-construction.png"}
        width={360}
        height={360}
        alt="under construction"
        className="rounded-xl mx-auto mt-10"
      />
    </div>
  );
};

export default SimilarWebtoonResults;
