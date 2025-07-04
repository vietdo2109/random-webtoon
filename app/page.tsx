import { getDailyWebtoons } from "@/data/dailyWebtoons";
import { updateDailyWebtoons } from "./actions";
import { DailyWebtoon } from "@/types/dailyWebtoon";
import { getWebtoonsByGenres } from "@/lib/getWebtoonsByGenres";
import WebtoonsFiltersForm from "@/components/WebtoonsFiltersForm";
import DailyWebtoons from "@/components/DailyWebtoons";
import { Suspense } from "react";
import DailyWebtoonsSkeleton from "@/components/skeletons/DailyWebtoonsSkeleton";
import Introduce from "@/components/Introduce";
import MobileIntroduce from "@/components/MobileIntroduce";
export const dynamic = "force-dynamic";

export default async function Home() {
  const dailyConfig = await getDailyWebtoons();
  console.log("dailyConfig:", dailyConfig);

  let webtoonsByDailyGenre: DailyWebtoon[];
  if (!dailyConfig.todayFetch) {
    const response = await updateDailyWebtoons(dailyConfig.webtoons);
    if (response) {
      dailyConfig.genre = response.randomGenre;
      dailyConfig.webtoons = response.updatedWebtoons;
    }
    webtoonsByDailyGenre = await getWebtoonsByGenres(18, [dailyConfig.genre]);
  } else {
    webtoonsByDailyGenre = await getWebtoonsByGenres(18, [dailyConfig.genre]);
  }

  const chunkedWebtoons: DailyWebtoon[][] = [];
  for (let i = 0; i < webtoonsByDailyGenre.length; i += 6) {
    chunkedWebtoons.push(webtoonsByDailyGenre.slice(i, i + 6));
  }

  return (
    <main className="flex flex-col">
      <Suspense fallback={<DailyWebtoonsSkeleton />}>
        {" "}
        <DailyWebtoons />
      </Suspense>
      <div className="flex flex-col w-full ">
        <Introduce />
        <MobileIntroduce />
        <div className="w-full flex flex-col items-center p-8 rounded-2xl border-purple-400 border-4">
          <div className="w-full md:w-[70%] text-center text-2xl">
            <h2 className="font-lilita-one">🚀 Let’s Get Started </h2>

            <p className="font-zain mt-2">
              Set your preferences (or not!), and click that button. Your next
              webtoon obsession is just a click away.
            </p>

            <WebtoonsFiltersForm />
          </div>
        </div>
      </div>
    </main>
  );
}
