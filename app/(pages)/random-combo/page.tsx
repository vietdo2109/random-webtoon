import WebtoonSlotMachine from "@/components/WebtoonSlotMachine";

const Spinner = async () => {
  return (
    <main className="flex flex-col gap-2">
      <h1 className="font-lilita-one text-3xl">Random Combo</h1>
      <div className="bg-white w-full h-[1px]"></div>
      <p>
        A fun way to find a new webtoon to read. Spin the slot machine to find a
        random combo of 1 tag and 1 genre. Have fun! {">.<"}!
      </p>
      <WebtoonSlotMachine />
    </main>
  );
};

export default Spinner;
