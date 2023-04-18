import React, { createContext, useState } from "react";

export const CartContext = createContext();
export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (id, name, price, quantity) => {
    const existingCartID = cart.find((item) => item.id !== id);
    const existingProduct = cart.find((item) => item.order.product === name);

    if (existingCartID) {
      setCart([
        { id: id, order: { product: name, price: price, quantity: quantity } },
      ]);
    } else if (!existingCartID && !existingProduct) {
      setCart([
        ...cart,
        { id: id, order: { product: name, price: price, quantity: quantity } },
      ]);
    } else if (!existingCartID && existingProduct) {
      const updatedCart = cart.map((item) =>
        item.order.product === name
          ? {
              ...item,
              order: {
                ...item.order,
                quantity: item.order.quantity + quantity,
              },
            }
          : item
      );
      setCart(updatedCart);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
