import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  productList: [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, actions) => {
      const { id, quantity, quantityAvailable } = actions.payload;
      let selectItem = state.productList?.find((item) => {
        return item.id == id;
      });
      if (selectItem) {
        let newQuantity = selectItem.quantity + quantity;
        selectItem.quantity =
          newQuantity <= quantity ? newQuantity : quantityAvailable;
      } else {
        state.productList?.push(actions.payload);
      }
    },
    setQuantityItem: (state, actions) => {
      const { id, quantity, quantityAvailable } = actions.payload;
      let selectItem = state?.productList?.find((item) => {
        return item.id == id;
      });
      if (selectItem) {
        let newQuantity = quantity;
        selectItem.quantity =
          newQuantity <= quantity ? newQuantity : quantityAvailable;
      }
    },
    removeItem: (state, actions) => {
      const id = actions.payload;
      state.productList=  state.productList?.filter((item) => {
        return item.id !== id;
      });
    
    },
  },
});
export const { addItem, setQuantityItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
