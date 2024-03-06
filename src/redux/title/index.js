import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  txt: "",
};
export const titleSlice = createSlice({
  name: "title",
  initialState,
  reducers: {
    titleTxt: (state, actions) => {
      state.txt = actions.payload;
    },
  },
});
export const { titleTxt } = titleSlice.actions;
export default titleSlice.reducer;
