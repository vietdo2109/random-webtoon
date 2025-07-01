import { getWebtoonById } from "@/lib/getWebtoonById";
import type { Webtoon } from "@/types/webtoon";

const Webtoon = async ({
  params,
}: {
  params: { id: string; slug: string };
}) => {
  const webtoon: Webtoon = await getWebtoonById(parseFloat(params.id));
  console.log(webtoon);
  return <div>{webtoon.title}</div>;
};

export default Webtoon;
