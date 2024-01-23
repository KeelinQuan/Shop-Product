import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: "",
  user: {},
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
  addItem:(state,actions)=>{},
  deleteItem:(state,actions)=>{},
  },
});
export const { addItem,deleteItem } = cartSlice.actions;
export default authSlice.reducer;
