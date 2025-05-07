import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IProduct from "../../types/IProduct";

interface CartItem extends IProduct {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isBulkOrder: boolean;
  isCredit: boolean;
  total: number,
  shippingAmount: number,
  discount: number,
}

const initialState: CartState = {
  items: [],
  isBulkOrder: false,
  isCredit: false,
  total: 0,
  shippingAmount: 0,
  discount: 0,
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

    addOrderDetails: (state, action) => {
      const { shippingAmount, discount } = action.payload;
      state.shippingAmount = shippingAmount;
      state.discount = discount;
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  updateBulkOrder,
  updateCreditOrder,
  addOrderDetails
} = cartSlice.actions;

export default cartSlice.reducer;
