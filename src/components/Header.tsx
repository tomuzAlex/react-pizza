import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import logoPizza from '../accert/img/logo.svg'; // Изменил импорт
import basketImage from '../accert/img/basket.svg';
import Search from './Search/index.tsx';
import { useSelector } from 'react-redux';


export const Header: React.FC = () => {
  const { items, totalPrice } = useSelector((state: any) => state.cart);
  const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0);
  const isMounted = React.useRef(false);

  const location = useLocation();

  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem('cart', json);
    };

    isMounted.current = true;
  }, [items]);

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img src={logoPizza} alt="Pizza Logo" />{' '}
            {/* Использование изображения через тег <img> */}
            <div>
              <h1>Bek Brat</h1>
              <p>самый вкусный черный во вселенной</p>
            </div>
          </div>
        </Link>
        {location.pathname !== '/cart' && <Search />}
        {location.pathname !== '/cart' && (
          <div className="header__cart">
            <Link to="/cart" className="button button--cart">
              <span>{totalPrice} ₽</span>

              <div className="button__delimiter">
                <img src={basketImage} alt="Иконка корзины" />
                <div>{totalCount}</div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
