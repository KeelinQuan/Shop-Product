import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: "",
  user: {},
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRedux: (state, actions) => {
      state.token = actions.payload.jwt;
      state.user = actions.payload.user;
    },
    logoutRedux: (state) => {
      state.token = "";
      state.user = {};
    },
  },
});
export const { loginRedux, logoutRedux } = authSlice.actions;
export default authSlice.reducer;
