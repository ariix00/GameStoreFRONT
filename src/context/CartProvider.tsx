/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, type PropsWithChildren } from "react";
import { CartContext, type CartItem } from "./CartContext";

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItem, setCartItem] = useState<CartItem[]>([]);
  const [addCartNotAvailable, setAddCartNotAvailable] =
    useState<boolean>(false);
  const handleCartItem = (addCart: CartItem, cartItem: CartItem[]) => {
    const alreadyOnCart = cartItem.find((item) => item.name === addCart.name);
    if (alreadyOnCart) {
      alreadyOnCart.count += addCart.count;
      if (alreadyOnCart.stock) {
        if (alreadyOnCart.count > alreadyOnCart.stock) {
          alreadyOnCart.count = alreadyOnCart.stock;
          setAddCartNotAvailable(true);
          setTimeout(() => {
            setAddCartNotAvailable(false);
          }, 2000);
        }
      }
    } else {
      setCartItem((prev) => [...prev, addCart]);
    }
    return cartItem;
  };
  const increaseCartItemFromCart = (
    increaseByName: string,

    cartItem: CartItem[]
  ) => {
    const currentCartItem = cartItem.find(
      (item) => item.name === increaseByName
    );
    if (currentCartItem && currentCartItem.stock) {
      if (currentCartItem.count < currentCartItem.stock) {
        currentCartItem.count += 1;
      }
    }
  };
  const decreaseCartItemFromCart = (
    decreaseByName: string,
    cartItem: CartItem[]
  ) => {
    const currentCartItem = cartItem.find(
      (item) => item.name === decreaseByName
    );
    if (currentCartItem && currentCartItem.stock) {
      if (currentCartItem.count > 1) {
        currentCartItem.count -= 1;
      }
    }
  };

  const removeCartItemFromCart = (
    removeByName: string,
    cartItem: CartItem[]
  ) => {
    return cartItem.filter((item) => item.name !== removeByName);
  };

  return (
    <CartContext.Provider
      value={{
        handleCartItem,
        increaseCartItemFromCart,
        decreaseCartItemFromCart,
        removeCartItemFromCart,
        cartItem,
        addCartNotAvailable,
        setAddCartNotAvailable,
        setCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
