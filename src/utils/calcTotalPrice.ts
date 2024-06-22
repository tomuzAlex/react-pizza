import { CartItem } from "../redux/slices/cartSlice";

export const calcTotalPrice = (items: CartItem[]) => {
   const totalPrice = items.reduce((sum, item) => (item.price * item.count) + sum, 0);
   return totalPrice;
}