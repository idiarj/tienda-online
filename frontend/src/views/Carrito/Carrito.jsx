import { useContext } from 'react';
import { CartContext } from '../../context/CartContext.jsx';
import Producto from '../../components/producto/producto.jsx';
import Navbar from '../../components/Navbar/navbar.jsx'

const Carrito = () => {
  const { getCartProducts, removeFromCart } = useContext(CartContext);
  const products = getCartProducts();

  const handleDeleteFromCart = (id) => {
    removeFromCart(id);
  };

  return (
    <>
    <Navbar/>
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
    </>
  );
};

export default Carrito;
