import { GENRE_COLLECTION } from "@/constants/genres";
import { getDailyWebtoons } from "@/data/dailyWebtoons";
import { firestore } from "@/firebase/server";
import { getRandomWebtoons } from "@/lib/getRandomWebtoons";
import { DailyWebtoon } from "@/types/dailyWebtoon";

export async function GET() {
  const dailyConfig = await getDailyWebtoons();

  const randomWebtoon = await getRandomWebtoons(1); // your random GraphQL logic
  const newDailyWebtoon: DailyWebtoon = {
    id: randomWebtoon[0].id,
    title: randomWebtoon[0].title.english || randomWebtoon[0].title.romaji,
    coverImage: randomWebtoon[0].coverImage.extraLarge,
    date: randomWebtoon[0].date,
    description: randomWebtoon[0].description,
  };
  const updatedWebtoons = [
    newDailyWebtoon,
    ...dailyConfig.webtoons.slice(0, 2),
  ];
  const cleanedWebtoons = updatedWebtoons.map((item) => ({
    ...item,
    date: item.date ?? new Date(), // fallback if undefined
  }));

  const randomGenre =
    GENRE_COLLECTION[Math.floor(Math.random() * GENRE_COLLECTION.length)];
  try {
    await firestore.collection("randomConfig").doc("dailyPicks").update({
      webtoons: cleanedWebtoons,
      lastModified: new Date(),
      genre: randomGenre,
    });
    return;
  } catch (error) {
    console.error("Error fetching random webtoons:", error);
    return;
  }
}
