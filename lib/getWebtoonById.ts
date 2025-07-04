import client from "@/lib/apolloClient";
import { GET_WEBTOON_BY_ID } from "@/app/graphql/queries/webtoonById";
import { Webtoon } from "@/types/webtoon";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getWebtoonById(id: number): Promise<any> {
  try {
    const { data } = await client.query({
      query: GET_WEBTOON_BY_ID,
      variables: {
        id: id,
      },
      fetchPolicy: "no-cache",
    });

    const result = data?.Media;
    const webtoon: Webtoon = {
      coverImage: result.coverImage.extraLarge,
      description: result.description,
      id: result.id,
      title: result.title.english || result.title.romaji,
      bannerImage: result.bannerImage,
      characters: result.characters,
      status: result.status,
      startDate: result.startDate,
      endDate: result.endDate,
      chapters: result.chapters,
      averageScore: result.averageScore,
      tags: result.tags,
      genres: result.genres,
    };

    // Optional: pick a random 1 from result list
    return webtoon;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching random webtoons:", error.cause);
    return;
  }
}
