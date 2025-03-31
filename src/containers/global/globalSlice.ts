import { createSlice } from "@reduxjs/toolkit";

export type GlobalState = {
  popupIsOpen: boolean,
}

const initialState: GlobalState = {
  popupIsOpen: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    openPopup: (state) => {
      state.popupIsOpen = true;
    },
    closePopup: (state) => {
      state.popupIsOpen = false;
    },
  },
});

export const {
  openPopup,
  closePopup,
} = globalSlice.actions;

export default globalSlice.reducer;
