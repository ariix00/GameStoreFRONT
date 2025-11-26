/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, type PropsWithChildren } from "react";
import { GamesContext, type CartItem, type findByname } from "./GamesContext";
import { useParams } from "react-router-dom";

export const GamesProvider = ({ children }: PropsWithChildren) => {
  const [cartItem, setCartItem] = useState<CartItem[]>([]);
  const [addCartNotAvailable, setAddCartNotAvailable] =
    useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>(0);
  const [platform, setPlatform] = useState<string>("PlayStation");

  console.log("se recagrgó la pagina");
  const handleCartItem = (addCart: CartItem, cartItem: CartItem[]) => {
    const existing = cartItem.find((item) => item.name === addCart.name);

    if (existing) {
      return cartItem.map((item) => {
        if (item.name === addCart.name) {
          const newCount = item.count + addCart.count;

          if (newCount > item.stock) {
            setAddCartNotAvailable(true);
            setTimeout(() => setAddCartNotAvailable(false), 2000);
          } else {
            return {
              ...item,
              count: newCount,
              totalPrice: item.price * newCount,
            };
          }
        }
        return item;
      });
    }

    console.log("agregado");
    return [
      ...cartItem,
      { ...addCart, totalPrice: addCart.price * addCart.count },
    ];
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
          const newCount = item.count + 1;
          return {
            ...item,
            count: newCount,
            totalPrice: item.price * newCount,
          };
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
          const newCount = item.count - 1;
          return {
            ...item,
            count: newCount,
            totalPrice: item.price * newCount,
          };
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
    <GamesContext.Provider
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

        platform,
        setPlatform,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};
