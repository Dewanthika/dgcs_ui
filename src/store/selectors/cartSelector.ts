import { RootState } from "../store";

export const getAllCartItems = (state: RootState) => state.cart.items;
