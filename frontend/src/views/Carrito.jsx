import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import Producto from '../components/producto';

const Carrito = () => {
  const { getProducts } = useContext(ProductContext);
  const products = getProducts(); 

  return (
    <div>
      <h1>Carrito</h1>
      <div className="productos-lista">
        {products.map(product => (
          <Producto key={product.id} id={product.id} vista="carrito" />
        ))}
      </div>
    </div>
  );
};

export default Carrito;
