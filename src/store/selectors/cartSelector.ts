import { RootState } from "../store";

export const getAllCartItems = (state: RootState) => state.cart.items;
export const getCartDetail = (state: RootState) => state.cart;
