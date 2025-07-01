import WebtoonsFiltersForm from "@/components/WebtoonsFiltersForm";

const Generator = () => {
  return (
    <main>
      <div className="w-full flex flex-col items-center p-8 rounded-2xl border-purple-400 border-4">
        <div className="w-[60%] text-center text-2xl">
          <h2 className="font-lilita-one">Random Webtoon Generator</h2>

          <p className="font-zain mt-2">
            Set your preferences (or not!), and generate a single or a list of
            random webtoons
          </p>

          <WebtoonsFiltersForm />
        </div>
      </div>
    </main>
  );
};

export default Generator;
