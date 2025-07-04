import { StarIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const DailyWebtoonsSkeleton = () => {
  return (
    <div>
      <>
        <h1 className="font-lilita-one text-xl md:text-3xl mt-5 flex items-center gap-3">
          {" "}
          <StarIcon fill="white" />
          Random webtoon of the day
        </h1>
        <div className="flex w-full max-w-[1110px] h-auto gap-3 mt-4 bg">
          <Skeleton className="aspect-[1/1] w-[43%] rounded-md bg-input-field-gray" />
          <Skeleton className="flex-1 aspect-[315/480] bg-input-field-gray" />
          <Skeleton className="flex-1 aspect-[315/480] bg-input-field-gray" />
        </div>

        <h1 className="font-lilita-one text-xl md:text-3xl mt-[50px] flex items-center gap-3">
          {" "}
          Genre of the day:
        </h1>
        <div className="flex gap-2 mt-4 w-full relative">
          <Skeleton className="flex-1  aspect-[315/480] rounded-[4px] bg-input-field-gray" />
          <Skeleton className="flex-1  aspect-[315/480] rounded-[4px] bg-input-field-gray" />
          <Skeleton className="flex-1  aspect-[315/480] rounded-[4px] bg-input-field-gray" />
          <Skeleton className="flex-1  aspect-[315/480] rounded-[4px] bg-input-field-gray" />
          <Skeleton className="flex-1  aspect-[315/480] rounded-[4px] bg-input-field-gray" />
          <Skeleton className="flex-1  aspect-[315/480] rounded-[4px] bg-input-field-gray" />
        </div>
      </>
    </div>
  );
};

export default DailyWebtoonsSkeleton;
