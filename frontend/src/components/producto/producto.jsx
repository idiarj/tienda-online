import { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { CartContext } from '../../context/CartContext';
import './producto.css';

const Producto = ({ id, item, vista, onEdit, onDelete }) => {
  const { getProductById, addProduct, deleteProduct } = useContext(ProductContext);
  const { addToCart, removeFromCart, isInCart } = useContext(CartContext);
  const [cantidad, setCantidad] = useState(1);
  const [inCart, setInCart] = useState(false);

  const product = getProductById(id);

  useEffect(() => {
    setInCart(isInCart(id));
  }, [id, isInCart]);

  const handleAddToCart = () => {
    addToCart({ ...product, cantidad });
    setInCart(true);
  };

  const handleDeleteFromCart = () => {
    removeFromCart(id);
    setInCart(false);
    if (onDelete) onDelete(id);
  };

  const handleDeleteProduct = async () => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (response.ok) {
        deleteProduct(id);
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Failed to fetch', error.message);
    }
  };

  const handleEditProduct = () => {
    if (onEdit) onEdit(product);
  };

  const handleChangeQuantity = (e) => {
    setCantidad(Number(e.target.value));
  };

  if (!item) return <p>Producto no encontrado</p>;

  return (
    <div className="producto">
      <img src={item.imagen} alt={item.nombre} className="producto-imagen" />
      <div>
        <h2 className="producto-nombre">{item.nombre}</h2>
        <p className="producto-marca">Marca: {item.marca}</p>
        <p className="producto-precio">Precio: ${item.precio}</p>

        {vista === 'productos' && (
          inCart ? (
            <button onClick={handleDeleteFromCart} className="producto-eliminar-carrito">Eliminar del Carrito</button>
          ) : (
            <button onClick={handleAddToCart} className="producto-agregar">Agregar al Carrito</button>
          )
        )}

        {vista === 'vender' && (
          <div>
            <p className="producto-descripcion">Descripción: {item.descripcion}</p>
            <p className="producto-disponibilidad">Disponibilidad: {item.disponibilidad ? 'Disponible' : 'No disponible'}</p>
            <p className="producto-cantidad">Cantidad: {item.cantidad}</p>
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
    </div>
  );
};

export default Producto;
