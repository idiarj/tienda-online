import  { createContext, useState, useEffect } from 'react';


export const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);


  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
  };

 
  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(product => product.id !== id));
  };


  const getCartProducts = () => cart;

  return (
    <CartContext.Provider value={{ addToCart, removeFromCart, getCartProducts }}>
      {children}
    </CartContext.Provider>
  );
};
