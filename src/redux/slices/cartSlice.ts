import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getCartDataLS } from '../../utils/getCartDataLS.ts';
import { removeCartDataLS } from '../../utils/removeCartDataLS.ts';

export type CartItem = {
  id: string;
  imageUrl: string;
  title: string;
  type: string;
  size: number;
  price: number;
  category: number;
  rating: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const { items, totalPrice } = getCartDataLS();

const initialState: CartSliceState = {
  items,
  totalPrice,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const filterItem = state.items.find((item) => item.id === action.payload.id);
      if (filterItem) {
        filterItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, item) => item.price * item.count + sum, 0);
    },

    minusItem(state, action: PayloadAction<string>) {
      const filter = state.items.find((item) => item.id === action.payload);

      if (filter && filter.count > 0 && filter) {
        filter.count--;
      }
      state.totalPrice = totalPrice;
    },

    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      removeCartDataLS();
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);
export const selectCart = (state: RootState) => state.cart;

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
