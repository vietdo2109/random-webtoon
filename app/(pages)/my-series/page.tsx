import SignInModal from "@/components/SignInModal";
import { getMySeriesIds } from "@/data/mySeries";
import { getWebtoonByIds } from "@/lib/getWebtoonbyIds";
import { slugify } from "@/lib/slugify";
import { PlusCircle } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const MySeries = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  const mySeriesIds = await getMySeriesIds();
  const trueWebtoonIds = Object.keys(mySeriesIds) // ["85143", "105398", "179445"]
    .filter((id) => mySeriesIds[id]) // keep those with value === true
    .map(Number);

  const mySeries = await getWebtoonByIds(
    1,
    trueWebtoonIds.length,
    trueWebtoonIds
  );
  console.log(mySeries);

  return (
    <main className="flex flex-col gap-2">
      <h1 className="font-lilita-one text-3xl">My Series</h1>
      <div className="bg-white w-full h-[1px]"></div>
      <div className="w-full ">
        {mySeries.webtoons.length > 0 && token && (
          <ul className=" w-full flex flex-col gap-4 mt-4 md:grid grid-cols-2">
            {mySeries.webtoons.map((item) => {
              return (
                <li
                  key={item.id}
                  className="w-full flex h-[100px] font-poppins"
                >
                  <Link
                    href={`webtoon/${item.id}/${slugify(
                      item.title.english || item.title.romaji
                    )}`}
                    className="w-full flex h-[100px] font-poppins hover:bg-input-field-gray"
                  >
                    <div className="h-[100px] aspect-[3/4] relative rounded-xs overflow-hidden">
                      <Image
                        src={item.coverImage}
                        alt="character image"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col flex-1 h-full font-medium text-md justify-center px-3 ">
                      <h3>{item.title.english || item.title.romaji}</h3>
                      <p className="text-gray-500 text-xs">
                        {item.genres?.join(" · ")}
                      </p>
                      <p className="text-purple-400 font-poppins text-xs tracking-wide mt-2">
                        {item.status}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        {mySeries.webtoons.length === 0 && token && (
          <div className="w-full h-[300px] flex items-center justify-center flex-col font-poppins text-center gap-3">
            <PlusCircle width={48} height={48} />
            <h3 className="mt-2 font-lilita-one text-3xl">
              You have 0 series saved
            </h3>
            <p className="text-light-gray">
              Save a series by tapping on the plus in the series page
            </p>
          </div>
        )}
        {!token && (
          <div className="w-full h-[300px] flex items-center justify-center flex-col font-poppins text-center gap-3">
            <PlusCircle width={48} height={48} />
            <h3 className="mt-2 font-lilita-one text-3xl">
              Sign in to save series{" "}
            </h3>
            <p className="text-light-gray">
              Save a series by tapping on the plus in the series page
            </p>
            <SignInModal />
          </div>
        )}
      </div>
    </main>
  );
};

export default MySeries;
