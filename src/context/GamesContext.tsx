import React, { createContext } from "react";

export interface GamesContextProps {
  handleCartItem: (x: CartItem, y: CartItem[]) => CartItem[];
  increaseCartItemFromCart: (x: string, y: CartItem[]) => CartItem[];
  decreaseCartItemFromCart: (x: string, y: CartItem[]) => CartItem[];
  removeCartItemFromCart: (x: string, y: CartItem[]) => CartItem[];
  cartItem: CartItem[];
  addCartNotAvailable: boolean;
  setAddCartNotAvailable: (x: boolean) => void;
  setCartItem: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  cartCount: number;
  cartCountFunction: (x: CartItem[], cartCount: number) => number;
  platform: string;
  setPlatform: (x: string) => void;
}
export interface CartItem {
  name: string;
  stock: number;
  count: number;
  price: number;
  image: string;
  totalPrice: number;
}
export interface findByname {
  name: string;
  cartItem: CartItem[];
}
export const GamesContext = createContext<GamesContextProps>(
  {} as GamesContextProps
);
