import { createContext } from "react";

export interface CartContextProps {
  handleCartItem: (x: CartItem, y: CartItem[]) => CartItem[];
  cartItem: CartItem[];
}
export interface CartItem {
  name: string | undefined;
  image: string | undefined;
  price: number | undefined;
  count: number;
}

export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps
);
