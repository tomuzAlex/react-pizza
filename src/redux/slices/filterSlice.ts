import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum sortPropertyEnum {
  RATING_DESC = 'rating',
  TITLE_DESC = 'title',
  PRICE_DESC = 'price',
  RATING_ASC = '-rating',
  TITLE_ASC = '-title',
  PRICE_ASC = '-price',
}

interface FilterSliceState {
  categoriesId: number;
  currentPage: number;
  searchValue: string;
  sortType: Sort;
}

export type Sort = {
  name: string;
  sortProperty: sortPropertyEnum;
};

const initialState: FilterSliceState = {
  categoriesId: 0,
  currentPage: 1,
  searchValue: '',
  sortType: {
    name: 'популярности (DESC)',
    sortProperty: sortPropertyEnum.RATING_DESC,
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoriesId(state, action: PayloadAction<number>) {
      state.categoriesId = action.payload;
    },

    setSortType(state, action: PayloadAction<Sort>) {
      state.sortType = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },

    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },

    setFilter(state, action: PayloadAction<FilterSliceState>) {
      state.sortType = action.payload.sortType;
      state.categoriesId = Number(action.payload.categoriesId);
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});

export const selectSort = (state: RootState) => state.filter.sortType;
export const selectFilter = (state: RootState) => state.filter;

export const { setCategoriesId, setSortType, setCurrentPage, setFilter, setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;
