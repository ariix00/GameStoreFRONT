import { createContext } from "react";

export interface CartContextProps {
  handleCartItem: (x: CartItem, y: CartItem[]) => CartItem[];
  increaseCartItemFromCart: (x: string, y: CartItem[]) => void;
  decreaseCartItemFromCart: (x: string, y: CartItem[]) => void;
  removeCartItemFromCart: (x: string, y: CartItem[]) => CartItem[];
  cartItem: CartItem[];
  addCartNotAvailable: boolean;
  setAddCartNotAvailable: (x: boolean) => void;
  setCartItem: (x: CartItem[]) => void;
}
export interface CartItem {
  name: string | undefined;
  image: string | undefined;
  price: number | undefined;
  stock: number | undefined;
  count: number;
}
export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps
);
