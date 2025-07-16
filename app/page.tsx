import WebtoonsFiltersForm from "@/components/WebtoonsFiltersForm";
import DailyWebtoons from "@/components/DailyWebtoons";
import { Suspense } from "react";
import DailyWebtoonsSkeleton from "@/components/skeletons/DailyWebtoonsSkeleton";
import Introduce from "@/components/Introduce";
import MobileIntroduce from "@/components/MobileIntroduce";
export const revalidate = 3600; // invalidate every hour
export default async function Home() {
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
