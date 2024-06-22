import React from 'react';
import styles from './Cart.module.scss';
import CartItem from './CartItem.tsx';
import CartEmpty from './CartEmpty.tsx';
import trashImage from '../../accert/img/trash.svg';
import { useDispatch} from 'react-redux';
import { clearItems } from '../../redux/slices/cartSlice.ts';


type CartProps = {
  totalPrice: number;
  items: any;
}

const Cart: React.FC<CartProps> = ({ totalPrice, items}) => {
  const dispatch = useDispatch();
  
  const totalCount = items.reduce((sum: any, item: any) => sum + item.count, 0);

  const onClickClear = () => {
    if (window.confirm('ты действительно хочешь очистить корзину?')) {
      dispatch(clearItems());
    }
  };

  if (!totalCount) {
    return <CartEmpty />;
  }
  return (
    <div className={styles.wrapper}>
      <div className="content">
        <div className="container container--cart">
          <div className="cart">
            <div className="cart__top">
              <h2 className="content__title">Корзина</h2>
              <div className="cart__clear">
                <span onClick={onClickClear}>Очистить корзину</span>
                <img src={trashImage} alt="Иконка Мусора" />
              </div>
            </div>
            <div className="content__items">
              {items.map((item: any) => (
                <CartItem key={item.id} {...item} />
              ))}
            </div>
            <div className="cart__bottom">
              <div className="cart__bottom-details">
                <span>
                  {' '}
                  Всего пицц: <b>{totalCount} шт.</b>{' '}
                </span>
                <span>
                  {' '}
                  Сумма заказа: <b>{totalPrice} ₽</b>{' '}
                </span>
              </div>
              <div className="cart__bottom-buttons">
                <a href="/" className="button button--outline button--add go-back-btn">
                  <span>Вернуться назад</span>
                </a>
                <div className="button pay-btn">
                  <span>Оплатить сейчас</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
