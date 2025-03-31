import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

const selectSelf = (state: RootState) => state.global;

export const globalSelectors = {
  getPopupOpenStatus: createSelector(selectSelf, (global) => global.popupIsOpen),
};
