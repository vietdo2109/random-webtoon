import client from "@/lib/apolloClient";
import { GET_RANDOM_WEBTOONS } from "@/app/graphql/queries/randomDailyWebtoons";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getRandomWebtoons(perPage = 20): Promise<any[]> {
  const lowerBound = 1;
  const upperBound = 1000;
  let lastValidPage = 1;
  let attempts = 0;
  const maxAttempts = 8; // Safe under rate limit

  try {
    let low = lowerBound;
    let high = upperBound;

    while (low <= high && attempts < maxAttempts) {
      const mid = Math.floor((low + high) / 2);
      attempts++;

      const { data } = await client.query({
        query: GET_RANDOM_WEBTOONS,
        variables: {
          page: mid,
          perPage,
          type: "MANGA",
          countryOfOrigin: "KR",
          sort: ["POPULARITY_DESC"],
        },
        fetchPolicy: "no-cache",
      });

      const media = data?.Page?.media || [];

      if (media.length > 0) {
        lastValidPage = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    const randomPage = Math.floor(Math.random() * lastValidPage) + 1;
    const { data: randomData } = await client.query({
      query: GET_RANDOM_WEBTOONS,
      variables: {
        page: randomPage,
        perPage,
        type: "MANGA",
        countryOfOrigin: "KR",
        sort: ["POPULARITY_DESC"],
      },
      fetchPolicy: "no-cache",
    });

    return randomData?.Page?.media || [];
  } catch (error) {
    console.error("Error fetching random webtoons:", error);
    return [];
  }
}
