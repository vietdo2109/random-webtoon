import client from "@/lib/apolloClient";
import { GET_WEBTOONS_BY_FILTERS } from "@/app/graphql/queries/webtoonsByFilters";
import { DailyWebtoon } from "@/types/dailyWebtoon";

export async function getRandomWebtoonsByFilters(
  perPage = 20,
  vars: {
    genres?: string[];
    excludedGenres?: string[];
    tags?: string[];
    excludedTags?: string[];
    chapterLesser?: number;
    chapterGreater?: number;
    averageScoreGreater?: number;
    averageScoreLesser?: number;
    yearLesser?: number;
    yearGreater?: number;
  } = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any[]> {
  const maxPages = 10; // You can adjust this
  const randomPage = Math.floor(Math.random() * maxPages) + 1;
  const yearGreaterInt = vars.yearGreater
    ? vars.yearGreater * 10000
    : undefined;
  const yearLesserInt = vars.yearLesser ? vars.yearLesser * 10000 : undefined;
  try {
    const { data } = await client.query({
      query: GET_WEBTOONS_BY_FILTERS,
      variables: {
        page: randomPage,
        perPage,
        type: "MANGA",
        countryOfOrigin: "KR",
        ...(vars.genres && vars.genres.length > 0 && { genres: vars.genres }),
        ...(vars.excludedGenres &&
          vars.excludedGenres.length > 0 && {
            excludedGenres: vars.excludedGenres,
          }),
        ...(vars.tags && vars.tags.length > 0 && { tags: vars.tags }),
        ...(vars.excludedTags &&
          vars.excludedTags.length > 0 && {
            excludedTags: vars.excludedTags,
          }),
        ...(typeof vars.chapterGreater === "number" && {
          chapterGreater: vars.chapterGreater,
        }),
        ...(typeof vars.chapterLesser === "number" && {
          chapterLesser: vars.chapterLesser,
        }),
        ...(typeof vars.averageScoreGreater === "number" && {
          averageScoreGreater: vars.averageScoreGreater,
        }),
        ...(typeof vars.averageScoreLesser === "number" && {
          averageScoreLesser: vars.averageScoreLesser,
        }),
        ...(yearGreaterInt && { yearGreater: yearGreaterInt }),
        ...(yearLesserInt && { yearLesser: yearLesserInt }),
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
        bannerImage: webtoon.bannerImage,
        characters: webtoon.characters,
        status: webtoon.status,
        startDate: webtoon.startDate,
        endDate: webtoon.endDate,
        chapters: webtoon.chapters,
        tags: webtoon.tags,
        rankings: webtoon.rankings,
        genres: webtoon.genres,
        sort: ["POPULARITY_DESC"], // You can swap this for RANDOM if supported later
      };
    });

    // Optional: pick a random 1 from result list
    return webtoonsByGenres;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching random webtoons:", error.cause);
    return [];
  }
}
