import client from "@/lib/apolloClient";
import { GET_WEBTOONS_BY_GENRES } from "@/app/graphql/queries/dailyWebtoonsByGenres";
import { DailyWebtoon } from "@/types/dailyWebtoon";

export async function getWebtoonsByGenres(
  perPage = 20,
  genres: string[]
): Promise<any[]> {
  console.log(perPage, genres);
  try {
    const { data } = await client.query({
      query: GET_WEBTOONS_BY_GENRES,
      variables: {
        page: 1,
        perPage,
        type: "MANGA",
        countryOfOrigin: "KR",
        sort: ["POPULARITY_DESC"], // You can swap this for RANDOM if supported later
        genres: genres,
      },
      fetchPolicy: "no-cache",
    });

    const results = data?.Page?.media || [];
    const webtoonsByGenres: DailyWebtoon[] = results.map((webtoon: any) => {
      return {
        coverImage: webtoon.coverImage.extraLarge,
        description: webtoon.description,
        id: webtoon.id,
        title: webtoon.title.english || webtoon.title.romaji,
      };
    });

    // Optional: pick a random 1 from result list
    return webtoonsByGenres;
  } catch (error) {
    console.error("Error fetching random webtoons:", error);
    return [];
  }
}
