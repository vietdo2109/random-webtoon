import client from "@/lib/apolloClient";
import { GET_WEBTOONS_BY_FILTERS } from "@/app/graphql/queries/webtoonsByFilters";
import { Webtoon } from "@/types/webtoon";

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
): Promise<Webtoon[]> {
  const yearGreaterInt = vars.yearGreater
    ? vars.yearGreater * 10000
    : undefined;
  const yearLesserInt = vars.yearLesser ? vars.yearLesser * 10000 : undefined;

  const baseVariables = {
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
    sort: ["POPULARITY_DESC"],
  };

  try {
    const lastValidPage = await findLastValidPage(baseVariables, perPage, 100);

    const randomPage = Math.floor(Math.random() * lastValidPage) + 1;

    const { data } = await client.query({
      query: GET_WEBTOONS_BY_FILTERS,
      variables: {
        ...baseVariables,
        page: randomPage,
        perPage,
      },
      fetchPolicy: "no-cache",
    });

    const results = data?.Page?.media || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return results.map((webtoon: any) => ({
      coverImage: webtoon.coverImage?.extraLarge,
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
    }));
  } catch (error) {
    console.error("Error in getRandomWebtoonsByFilters:", error);
    return [];
  }
}
async function findLastValidPage(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  baseVariables: Record<string, any>,
  perPage: number,
  maxPageCap = 100
): Promise<number> {
  let low = 1;
  let high = maxPageCap;
  let lastValid = 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const { data } = await client.query({
      query: GET_WEBTOONS_BY_FILTERS,
      variables: {
        ...baseVariables,
        page: mid,
        perPage,
      },
      fetchPolicy: "no-cache",
    });

    const media = data?.Page?.media || [];

    if (media.length > 0) {
      lastValid = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return lastValid;
}
