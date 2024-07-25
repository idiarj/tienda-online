import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import Producto from '../components/producto';

const Carrito = () => {
  const { getCartProducts, removeFromCart } = useContext(CartContext);
  const products = getCartProducts();

  const handleDeleteFromCart = (id) => {
    removeFromCart(id);
  };

  return (
    <div>
      <h1>Carrito</h1>
      <div className="productos-lista">
        {products.map(product => (
          <Producto 
            key={product.id} 
            id={product.id} 
            vista="carrito" 
            onDelete={handleDeleteFromCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Carrito;
