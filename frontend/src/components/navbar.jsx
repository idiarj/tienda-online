
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
        <Link to="/productos">Productos</Link>
        <Link to="/vender">Vender</Link>
        <Link to="/carrito">Carrito</Link>
    </nav>
  );
};

export default Navbar;
