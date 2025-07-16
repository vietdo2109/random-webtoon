import client from "@/lib/apolloClient";
import { WebtoonSearch } from "@/types/webtoon";
import { GET_WEBTOON_BY_IDS } from "@/app/graphql/queries/webtoonByIds";

export async function getWebtoonByIds(
  page: number = 1,
  perPage: number = 20,
  ids: number[]
): Promise<{ webtoons: WebtoonSearch[]; hasNextPage: boolean }> {
  try {
    const { data } = await client.query({
      query: GET_WEBTOON_BY_IDS,
      variables: {
        page: page,
        perPage: perPage,
        ids: ids,
      },
      fetchPolicy: "no-cache",
    });

    const results = data?.Page?.media || [];
    const hasNextPage = data?.Page?.pageInfo.hasNextPage;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const webtoons: WebtoonSearch[] = results.map((webtoon: any) => {
      return {
        id: webtoon.id,
        coverImage: webtoon.coverImage.large,
        title: webtoon.title,
        genres: webtoon.genres,
        status: webtoon.status,
      };
    });

    return { webtoons, hasNextPage };
  } catch (error) {
    console.error("Error searching webtoons:", error);
    return { webtoons: [], hasNextPage: false };
  }
}
