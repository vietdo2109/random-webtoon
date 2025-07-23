// src/lib/redux/mySeriesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MySeriesState {
  webtoonIds: number[]; // or store full objects if needed
}

const initialState: MySeriesState = {
  webtoonIds: [],
};

const mySeriesSlice = createSlice({
  name: "mySeries",
  initialState,
  reducers: {
    addSeries(state, action: PayloadAction<number>) {
      if (!state.webtoonIds.includes(action.payload)) {
        state.webtoonIds.push(action.payload);
      }
    },
    removeSeries(state, action: PayloadAction<number>) {
      state.webtoonIds = state.webtoonIds.filter((id) => id !== action.payload);
    },
    setSeries(state, action: PayloadAction<number[]>) {
      state.webtoonIds = action.payload;
    },
    resetSeries(state) {
      state.webtoonIds = [];
    },
  },
});

export const { addSeries, removeSeries, setSeries, resetSeries } =
  mySeriesSlice.actions;

export const mySeriesReducer = mySeriesSlice.reducer;
