import { configureStore } from "@reduxjs/toolkit";
import { filtersReducer } from "./features/filters/filterSlice";
import { slotMachineReducer } from "./features/slotMachine/slotMachine";

export const makeStore = () =>
  configureStore({
    reducer: {
      filters: filtersReducer,
      slotMachine: slotMachineReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
