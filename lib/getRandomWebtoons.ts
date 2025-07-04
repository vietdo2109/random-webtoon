import client from "@/lib/apolloClient";
import { GET_RANDOM_WEBTOONS } from "@/app/graphql/queries/randomDailyWebtoons";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getRandomWebtoons(perPage = 20): Promise<any[]> {
  const maxPages = 100; // You can adjust this
  const randomPage = Math.floor(Math.random() * maxPages) + 1;

  try {
    const { data } = await client.query({
      query: GET_RANDOM_WEBTOONS,
      variables: {
        page: randomPage,
        perPage,
        type: "MANGA",
        countryOfOrigin: "KR",
        sort: ["POPULARITY_DESC"], // You can swap this for RANDOM if supported later
      },
      fetchPolicy: "no-cache",
    });

    const results = data?.Page?.media || [];

    // Optional: pick a random 1 from result list
    return results;
  } catch (error) {
    console.error("Error fetching random webtoons:", error);
    return [];
  }
}
