import { firestore } from "@/firebase/server";
import { DailyWebtoon } from "@/types/dailyWebtoon";
import "server-only";

export async function getDailyWebtoons() {
  const dailyPicksSnapshot = await firestore
    .collection("randomConfig")
    .doc("dailyPicks")
    .get();

  const dailyPicks = dailyPicksSnapshot.data();

  if (!dailyPicks) {
    return {
      webtoons: [],
      todayFetch: false,
      genre: "",
    };
  }

  // Convert both to YYYY-MM-DD string for comparison
  const today = new Date().toISOString().slice(0, 10);
  const lastModifiedDate = dailyPicks.lastModified
    .toDate()
    .toISOString()
    .slice(0, 10);

  return {
    webtoons: dailyPicks.webtoons as DailyWebtoon[],
    todayFetch: lastModifiedDate === today,
    genre: dailyPicks.genre,
  };
}
