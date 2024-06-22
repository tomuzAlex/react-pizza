import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { CartItem } from './cartSlice';


export const fetchPizzas = createAsyncThunk('pizza/fetchPizzas', async (params: Record<string, string>) => {
  const res = await axios.get<CartItem[]>('https://66147b222fc47b4cf27c6734.mockapi.io/items', {
    params,
  });
  const data = res.data;
  return data;
});

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

type Pizza = {
  id: string;
  imageUrl: string;
  title: string;
  type: string;
  size: number;
  price: number;
  category: number;
  rating: number;
};

type PizzaSliceState = {
  items: Pizza[];
  status: Status;

};

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,

};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;