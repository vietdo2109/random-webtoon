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
      genre: "",
    };
  }
  return {
    webtoons: dailyPicks.webtoons as DailyWebtoon[],
    genre: dailyPicks.genre,
  };
}
