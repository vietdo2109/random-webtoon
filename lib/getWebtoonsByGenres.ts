import client from "@/lib/apolloClient";
import { GET_WEBTOONS_BY_GENRES } from "@/app/graphql/queries/dailyWebtoonsByGenres";
import { DailyWebtoon } from "@/types/dailyWebtoon";

export async function getWebtoonsByGenres(
  perPage = 20,
  genres: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any[]> {
  try {
    const { data } = await client.query({
      query: GET_WEBTOONS_BY_GENRES,
      variables: {
        page: 1,
        perPage,
        type: "MANGA",
        countryOfOrigin: "KR",
        genres: genres,
      },
      fetchPolicy: "no-cache",
    });

    const results = data?.Page?.media || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
