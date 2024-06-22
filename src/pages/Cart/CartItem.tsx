import React from 'react';
import plusImage from '../../accert/img/plus.svg';
import trashImage from '../../accert/img/trash.svg';
import minusImage from '../../accert/img/minus.svg';
import { CartItem, addItem, minusItem, removeItem } from '../../redux/slices/cartSlice.ts';
import { useDispatch } from 'react-redux';
import CartEmpty from './CartEmpty.tsx';

type CartItemProps = {
  id: string;
  title: string;
  price: number;
  size: number;
  type: string;
  imageUrl: string;
  count: number;
};

const CartItemBlock: React.FC<CartItemProps> = ({
  id,
  title,
  price,
  size,
  type,
  imageUrl,
  count,
}) => {
  const dispatch = useDispatch();
  const onClickPlus = () => {
    dispatch(
      addItem({
        id,
        title,
        price,
        size,
        type,
        imageUrl,
        count,
      } as CartItem),
    );
  };

  const onClickMinus = () => {
    dispatch(minusItem(id));
  };

  const onClickRemove = () => {
    if (window.confirm('ты действительно хочешь удалить этот товар?')) {
      dispatch(removeItem(id));
    }
  };

  if (!count) {
    return <CartEmpty />;
  }
  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {type}, {size} см.
        </p>
      </div>
      <div className="cart__item-count">
        <button
          disabled={count === 1}
          onClick={onClickMinus}
          className="button button--outline button--circle cart__item-count-minus"
        >
          <img src={minusImage} alt="Минус Свг" />
        </button>
        <b>{count}</b>
        <button
          onClick={onClickPlus}
          className="button button--outline button--circle cart__item-count-plus"
        >
          <img className="button--circle__plus" src={plusImage} alt="Плюс Свг" />
        </button>
      </div>
      <div className="cart__item-price">
        <b>{price * count} ₽</b>
      </div>
      <div onClick={onClickRemove} className="cart__item-remove">
        <div className="button button--outline button--circle">
          <img src={trashImage} alt="Кнопка удаления" />
        </div>
      </div>
    </div>
  );
};

export default CartItemBlock;
