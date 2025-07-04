import { FiltersState } from "./features/filters/filterSlice";

export const filtersToQueryVariables = (filters: FiltersState) => {
  // get included and excluded tags and genres

  const includedTags: string[] = [];
  const excludedTags: string[] = [];

  filters.selectedTags.forEach((selectedTag, index) => {
    if (filters.selectedTagsStatus[index] === 0) includedTags.push(selectedTag);
    if (filters.selectedTagsStatus[index] === 1) excludedTags.push(selectedTag);
  });

  const includedGenres: string[] = [];
  const excludedGenres: string[] = [];

  filters.selectedGenres.forEach((selectedGenre, index) => {
    if (filters.selectedGenresStatus[index] === 0)
      includedGenres.push(selectedGenre);
    if (filters.selectedGenresStatus[index] === 1)
      excludedGenres.push(selectedGenre);
  });
  return {
    tags: includedTags.length === 0 ? undefined : includedTags,
    excludedTags: excludedTags.length === 0 ? undefined : excludedTags,
    genres: includedGenres.length === 0 ? undefined : includedGenres,
    excludedGenres: excludedGenres.length === 0 ? undefined : excludedGenres,
    chapterGreater: filters.chapterRange[0],
    chapterLesser:
      filters.chapterRange[1] === 0 ? undefined : filters.chapterRange[1],
    scoreGreater: filters.scoreRange[0],
    scoreLesser: filters.scoreRange[1],
    yearGreater: filters.yearRange[0],
    yearLesser: filters.yearRange[1],
  };
};
