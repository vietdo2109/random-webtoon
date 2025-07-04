import client from "@/lib/apolloClient";
import { GET_WEBTOONS_BY_SEARCH } from "@/app/graphql/queries/webtoonsBySearch";
import { WebtoonSearch } from "@/types/webtoon";

export async function getWebtoonsBySearch(
  page: number = 1,
  perPage: number = 20,
  search: string
): Promise<{ webtoonsBySearch: WebtoonSearch[]; hasNextPage: boolean }> {
  try {
    const { data } = await client.query({
      query: GET_WEBTOONS_BY_SEARCH,
      variables: {
        page: page,
        perPage,
        type: "MANGA",
        countryOfOrigin: "KR",
        sort: ["POPULARITY_DESC"], // You can swap this for RANDOM if supported later
        search: search,
      },
      fetchPolicy: "no-cache",
    });

    const results = data?.Page?.media || [];
    const hasNextPage = data?.Page?.pageInfo.hasNextPage;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const webtoonsBySearch: WebtoonSearch[] = results.map((webtoon: any) => {
      return {
        id: webtoon.id,
        coverImage: webtoon.coverImage.large,
        title: webtoon.title,
        genres: webtoon.genres,
        status: webtoon.status,
      };
    });

    return { webtoonsBySearch, hasNextPage };
  } catch (error) {
    console.error("Error searching webtoons:", error);
    return { webtoonsBySearch: [], hasNextPage: false };
  }
}
