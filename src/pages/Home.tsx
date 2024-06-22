import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Categories from '../components/Categories.tsx';
import PizzaBlock from '../components/PizzaBlock/index.tsx';
import Skeleton from '../components/PizzaBlock/Skeleton.tsx';
import Pagination from '../Pagination/index.tsx';
import SortPopUp, { sortList } from '../components/SortPopUp.tsx';

import { useAppDispatch } from '../redux/store.ts';

import {
  setCategoriesId,
  setCurrentPage,
  setFilter,
  selectFilter,
} from '../redux/slices/filterSlice.ts';
import { fetchPizzas, setItems, selectPizzaData } from '../redux/slices/pizzaSlice.ts';

export const Home: React.FC = () => {
  const { items, status } = useSelector(selectPizzaData);
  
  const { searchValue } = useSelector(selectFilter);
  const { categoriesId, sortType, currentPage } = useSelector(selectFilter);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  type FetchPizzaParams = {
    page: string;
    limit: string;
    category: string;
    sortBy: string;
    order: string;
  };

  const fetchData = async () => {
    const params: FetchPizzaParams = {
      page: String(currentPage),
      limit: '4',
      category: categoriesId > 0 ? String(categoriesId) : '',
      sortBy: sortType.sortProperty.replace('-', ''),
      order: sortType.sortProperty.includes('-') ? 'asc' : 'desc',
    };

    try {
      const res: any = await dispatch(fetchPizzas(params));
      if (isMounted.current) {
        window.scrollTo(0, 0);
      }
      dispatch(setItems(res.payload));
    } catch (error) {
      console.error('Поиск пицц не удался', error);
    }
  };

  const onChangeCategories = React.useCallback((id: number) => {
    dispatch(setCategoriesId(id));
  }, []);

  const onChangePage = (value: number) => {
    dispatch(setCurrentPage(value));
  };

  React.useEffect(() => {
    if (isMounted) {
      const qweryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoriesId,
        currentPage,
      });
      navigate(`?${qweryString}`);
    }
    isMounted.current = true;
  }, [categoriesId, sortType.sortProperty, currentPage]);

  React.useEffect(() => {
    const searchString = window.location.search;
    if (searchString) {
      const params = qs.parse(searchString.substring(1));
      const sortType = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      if (sortType) {
        dispatch(
          setFilter({
            ...params,
            sortType,
            categoriesId: Number(params.categoriesId),
            currentPage: Number(params.currentPage),
            searchValue: String(params.searchValue),
          }),
        );
      }
    }
    isSearch.current = true;
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchData();
    }
    isSearch.current = false;
  }, [categoriesId, sortType, currentPage, searchValue]);

  const skeletonItems = Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} />);
  const pizzas = items && items
    .filter((obj: any) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj: any) => (
        <PizzaBlock key={obj.id} {...obj} />
    ));
  

  return (
    <>
      <div className="content__top">
        <Categories value={categoriesId} onChangeCategories={onChangeCategories} />
        <SortPopUp value = {sortType}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>

      {status === 'error' || !items ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletonItems : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
