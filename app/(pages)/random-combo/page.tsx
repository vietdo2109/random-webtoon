import { Button } from "@/components/ui/button";
import { getRandomWebtoonsByFilters } from "@/lib/getRandomWebtoonsByFilters";
import { Webtoon } from "@/types/webtoon";
import WebtoonSlotMachine from "@/components/WebtoonSlotMachine";

const Spinner = async () => {
  const initialWebtoons: Webtoon[] = await getRandomWebtoonsByFilters(20);
  return (
    <main className="flex flex-col gap-2">
      <h1 className="font-lilita-one text-3xl">Random Webtoon spinner</h1>
      <div className="bg-white w-full h-[1px]"></div>
      <p>
        A fun way to find a new webtoon to read. Spin the wheel to find a
        completely random webtoon, or update the settings so the wheel will
        generate a new list of 20 random webtoons that reflects your taste. Have
        gun {">.<"}!
      </p>
      <WebtoonSlotMachine webtoons={initialWebtoons} />
    </main>
  );
};

export default Spinner;
