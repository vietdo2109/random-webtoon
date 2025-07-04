import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FiltersState {
  selectedGenres: string[];
  selectedGenresStatus: number[];
  selectedTags: string[];
  selectedTagsStatus: number[];
  scoreRange: [number, number];
  yearRange: [number, number];
  chapterRange: [number, number];
}

const initialState: FiltersState = {
  selectedGenres: [],
  selectedGenresStatus: [],
  selectedTags: [],
  selectedTagsStatus: [],
  scoreRange: [0, 10],
  yearRange: [1970, new Date().getFullYear()],
  chapterRange: [0, 0],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSelectedGenres(state, action: PayloadAction<string[]>) {
      state.selectedGenres = action.payload;
    },
    setSelectedGenresStatus(state, action: PayloadAction<number[]>) {
      state.selectedGenresStatus = action.payload;
    },
    setSelectedTags(state, action: PayloadAction<string[]>) {
      state.selectedTags = action.payload;
    },
    setSelectedTagsStatus(state, action: PayloadAction<number[]>) {
      state.selectedTagsStatus = action.payload;
    },
    setScoreRange(state, action: PayloadAction<[number, number]>) {
      state.scoreRange = action.payload;
    },
    setYearRange(state, action: PayloadAction<[number, number]>) {
      state.yearRange = action.payload;
    },
    setChapterRange(state, action: PayloadAction<[number, number]>) {
      state.chapterRange = action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const {
  setSelectedGenres,
  setSelectedGenresStatus,
  setSelectedTags,
  setSelectedTagsStatus,
  setScoreRange,
  setYearRange,
  setChapterRange,
  resetFilters,
} = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
