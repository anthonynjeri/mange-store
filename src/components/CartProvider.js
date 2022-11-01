import React, { useState, createContext } from "react";

const CartContext = createContext();
const CartProvider = (props) => {
  const [cart, setCart] = useState([]);
  const handleProductAdd = (newProduct) => {
    const existingProduct = cart.find(
      (product) => product.id === newProduct.id
    );
    if (existingProduct) {
      const cartUpdate = cart.map((product) => {
        if (product.id === newProduct.id) {
          return { ...product, quantity: product.quantity + 1 };
        } else {
          return product;
        }
      });
      setCart(cartUpdate);
    } else {
      setCart([...cart, { ...newProduct, quantity: 1 }]);
    }
    console.log(`Adding product ${newProduct.id}`);
  };
  const handleProductDelete = (id) => {
    const updateCart = cart.filter((product) => product.id !== id);
    setCart(updateCart);
    console.log(`Deleting product ${id}`);
  };

  const values = {
    cart: cart,
    setCart: setCart,
    handleProductAdd: handleProductAdd,
    handleProductDelete: handleProductDelete,
  };
  return (
    <CartContext.Provider value={values}>{props.children}</CartContext.Provider>
  );
};
export { CartContext, CartProvider };
