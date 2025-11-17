/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, type PropsWithChildren } from "react";
import { CartContext, type CartItem, type findByname } from "./CartContext";

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItem, setCartItem] = useState<CartItem[]>([]);
  const [addCartNotAvailable, setAddCartNotAvailable] =
    useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>(0);

  const handleCartItem = (addCart: CartItem, cartItem: CartItem[]) => {
    const existing = cartItem.find((item) => item.name === addCart.name);

    if (existing) {
      return cartItem.map((item) => {
        if (item.name === addCart.name) {
          const newCount = item.count + addCart.count;

          // if (newCount > item.stock) {
          //   newCount = item.stock;

          //   setAddCartNotAvailable(true);
          //   setTimeout(() => setAddCartNotAvailable(false), 2000);
          // }
          if (newCount > item.stock) {
            setAddCartNotAvailable(true);
            setTimeout(() => setAddCartNotAvailable(false), 2000);
          } else {
            return { ...item, count: newCount };
          }
        }
        return item;
      });
    }

    console.log("agregado");
    return [...cartItem, { ...addCart }];
  };

  // return cartItem.map((item) => {
  //   if (item.name == addCart.name) {
  //     if (item.count > item.stock) {
  //       setAddCartNotAvailable(true);
  //       setTimeout(() => {
  //         setAddCartNotAvailable(false);
  //       }, 2000);
  //       return { ...item, count: item.stock };
  //     }
  //     return { ...item, count: item.count + addCart.count };
  //   } else {
  //     setCartItem((prev) => [...prev, addCart]);
  //   }
  //   return item;
  // });

  const increaseCartItemFromCart = (
    increaseByName: string,
    cartItem: CartItem[]
  ) => {
    return cartItem.map((item) => {
      if (item.name === increaseByName) {
        if (item.stock && item.count < item.stock) {
          console.log("sumado");
          return { ...item, count: item.count + 1 };
        }
      }
      return item;
    });
  };
  const decreaseCartItemFromCart = (
    decreaseByName: string,
    cart: CartItem[]
  ) => {
    return cart.map((item) => {
      if (item.name === decreaseByName) {
        if (item.stock && item.count > 1) {
          return { ...item, count: item.count - 1 };
        }
      }
      return item;
    });
  };

  const removeCartItemFromCart = (
    removeByName: string,
    cartItem: CartItem[]
  ) => {
    return cartItem.filter((item) => item.name !== removeByName);
  };

  const cartCountFunction = (cartItem: CartItem[], cartCount: number) => {
    cartItem.forEach((item) => {
      cartCount += item.count;
    });
    return cartCount;
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
        setCartCount,
        cartCountFunction,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
