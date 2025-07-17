import { Skeleton } from "../ui/skeleton";

const WebtoonSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-4 md:flex-row">
      <div className="w-full flex flex-col gap-4 md:min-w-[300px] md:max-w-[360px]">
        <Skeleton className=" w-full aspect-[1/1] bg-input-field-gray rounded-xl" />
        <Skeleton className=" w-[80%] h-[16px] bg-input-field-gray rounded-xl" />
        <Skeleton className=" w-full h-[24px] bg-input-field-gray rounded-xl" />
        <Skeleton className=" w-full h-[48px] bg-input-field-gray rounded-xl" />
        <Skeleton className=" w-[30%] h-[16px] bg-input-field-gray rounded-xl" />
      </div>{" "}
      <div className="flex flex-col gap-4 w-full lg:flex-row">
        <div className="w-full lg:flex lg:w-[45%] flex-col gap-4">
          <div className="w-full">
            <h2 className="font-poppins font-semibold">More information</h2>
            <div className="w-full flex flex-col gap-1">
              <Skeleton className=" w-full h-[36px] bg-input-field-gray rounded-sm mt-1" />
              <Skeleton className=" w-full h-[36px] bg-input-field-gray rounded-sm mt-1" />
              <Skeleton className=" w-full h-[36px] bg-input-field-gray rounded-sm mt-1" />
              <Skeleton className=" w-full h-[36px] bg-input-field-gray rounded-sm mt-1" />
            </div>
          </div>
          <div className="hidden lg:block">
            <h2 className="font-poppins font-semibold">Tags</h2>
            <div className="flex gap-1 mt-1">
              <Skeleton className=" w-[80px] h-[36px] bg-input-field-gray rounded-sm" />
              <Skeleton className=" w-[80px] h-[36px] bg-input-field-gray rounded-sm" />
              <Skeleton className=" w-[80px] h-[36px] bg-input-field-gray rounded-sm" />
              <Skeleton className=" w-[80px] h-[36px] bg-input-field-gray rounded-sm" />
            </div>
          </div>
        </div>
        <div className="lg:flex-1">
          <h2 className="font-poppins font-semibold">Characters</h2>
          <div className="w-full flex flex-col gap-2 mt-1">
            <Skeleton className="w-full bg-input-field-gray rounded-sm h-[80px] " />
            <Skeleton className="w-full bg-input-field-gray rounded-sm h-[80px] " />
            <Skeleton className="w-full bg-input-field-gray rounded-sm h-[80px] " />
            <Skeleton className="w-full bg-input-field-gray rounded-sm h-[80px] " />
            <Skeleton className="w-full bg-input-field-gray rounded-sm h-[80px] " />
          </div>
        </div>
        <div className="lg:hidden">
          <h2 className="font-poppins font-semibold">Tags</h2>

          <div className="flex gap-1 mt-1">
            <Skeleton className=" w-[80px] h-[36px] bg-input-field-gray rounded-sm" />
            <Skeleton className=" w-[80px] h-[36px] bg-input-field-gray rounded-sm" />
            <Skeleton className=" w-[80px] h-[36px] bg-input-field-gray rounded-sm" />
            <Skeleton className=" w-[80px] h-[36px] bg-input-field-gray rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebtoonSkeleton;
