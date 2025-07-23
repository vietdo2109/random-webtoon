import { configureStore } from "@reduxjs/toolkit";
import { filtersReducer } from "./features/filters/filterSlice";
import { mySeriesReducer } from "./features/mySeries/mySeriesSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      filters: filtersReducer,
      mySeries: mySeriesReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
