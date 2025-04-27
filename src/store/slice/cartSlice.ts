import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IProduct from "../../types/IProduct";

interface CartItem extends IProduct {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isBulkOrder: boolean;
  isCredit: boolean;
}

const initialState: CartState = {
  items: [],
  isBulkOrder: false,
  isCredit: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: IProduct; quantity: number }>) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item._id === product._id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item._id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    updateBulkOrder: (state, action: PayloadAction<boolean>) => {
      state.isBulkOrder = action.payload;
    },

    updateCreditOrder: (state, action: PayloadAction<boolean>) => {
      state.isCredit = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  updateBulkOrder,
  updateCreditOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
