import React, { useContext, useState } from 'react';
import { ProductContext } from '../context/ProductContext';
import './producto.css';

const Producto = ({ id, vista, onEdit }) => {
  const { getProductById, addProduct, deleteProduct, editProduct } = useContext(ProductContext);
  const [cantidad, setCantidad] = useState(1);
  const product = getProductById(id);

  const handleAddToCart = () => {
    addProduct({ ...product, cantidad });
  };

  const handleDeleteProduct = () => {
    deleteProduct(id);
  };

  const handleEditProduct = () => {
    onEdit(product);
  };

  const handleDeleteFromCart = () => {
    console.log(`Eliminar producto ${product.nombre} del carrito`);
  };

  const handleChangeQuantity = (e) => {
    setCantidad(Number(e.target.value));
  };

  if (!product) return <p>Producto no encontrado</p>;

  return (
    <div className="producto">
      <img src={product.imagen} alt={product.nombre} className="producto-imagen" />
      <h2 className="producto-nombre">{product.nombre}</h2>
      <p className="producto-marca">Marca: {product.marca}</p>
      <p className="producto-precio">Precio: ${product.precio}</p>

      {vista === 'productos' && (
        <button onClick={handleAddToCart} className="producto-agregar">Agregar al Carrito</button>
      )}

      {vista === 'vender' && (
        <div>
          <p className="producto-descripcion">Descripción: {product.descripcion}</p>
          <p className="producto-disponibilidad">Disponibilidad: {product.disponibilidad ? 'Disponible' : 'No disponible'}</p>
          <p className="producto-cantidad">Cantidad: {product.cantidad}</p>
          <button onClick={handleEditProduct} className="producto-editar">Editar</button>
          <button onClick={handleDeleteProduct} className="producto-eliminar">Eliminar</button>
        </div>
      )}

      {vista === 'carrito' && (
        <div>
          <button onClick={handleDeleteFromCart} className="producto-eliminar-carrito">Eliminar del Carrito</button>
          <input
            type="number"
            value={cantidad}
            onChange={handleChangeQuantity}
            min="1"
            className="producto-cantidad-input"
          />
        </div>
      )}
    </div>
  );
};

export default Producto;
