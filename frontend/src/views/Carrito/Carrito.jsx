import { useContext } from 'react';
import { CartContext } from '../../context/CartContext.jsx';
import Producto from '../../components/producto/producto.jsx';
import Navbar from '../../components/Navbar/navbar.jsx'
import './carrito.css'

const Carrito = () => {
  const { getCartProducts, removeFromCart } = useContext(CartContext);
  const products = getCartProducts();

  const handleDeleteFromCart = (id) => {
    removeFromCart(id);
  };

  return (
    <>
    <Navbar/>
     <div className="carrito-container">
      <h1>Carrito</h1>
      <div className="productos-lista">
        {products.map(product => (
          <Producto 
            key={product.id} 
            id={product.id} 
            vista="carrito" 
            onDelete={handleDeleteFromCart}
            item={product}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default Carrito;
