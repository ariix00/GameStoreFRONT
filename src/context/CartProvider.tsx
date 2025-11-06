import { useState, type PropsWithChildren } from "react";
import { CartContext, type CartItem } from "./CartContext";

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItem, setCartItem] = useState<CartItem[]>([]);

  const handleCartItem = (addCart: CartItem, cartItem: CartItem[]) => {
    const alredyOnCart = cartItem.find((item) => item.name === addCart.name);
    if (alredyOnCart) {
      alredyOnCart.count += addCart.count;
    } else {
      setCartItem((prev) => [...prev, addCart]);
    }
    return cartItem;
  };

  return (
    <CartContext.Provider
      value={{
        handleCartItem,
        cartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
