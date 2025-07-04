import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Webtoon } from "@/types/webtoon";

interface SlotMachineState {
  webtoons: Webtoon[];
  spinning: boolean;
  resultIndex: number | null;
}

const initialState: SlotMachineState = {
  webtoons: [],
  spinning: false,
  resultIndex: null,
};

const slotMachineSlice = createSlice({
  name: "slotMachine",
  initialState,
  reducers: {
    setWebtoons(state, action: PayloadAction<Webtoon[]>) {
      state.webtoons = action.payload;
    },
    startSpinning(state) {
      state.spinning = true;
      state.resultIndex = null;
    },
    stopSpinning(state, action: PayloadAction<number>) {
      state.spinning = false;
      state.resultIndex = action.payload;
    },
    resetSlotMachine() {
      return initialState;
    },
  },
});

export const { setWebtoons, startSpinning, stopSpinning, resetSlotMachine } =
  slotMachineSlice.actions;

export const slotMachineReducer = slotMachineSlice.reducer;
