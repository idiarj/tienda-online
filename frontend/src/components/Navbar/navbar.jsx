
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {

  const [auth, setAuth] = useState(false)
  const [username, setUsarname] = useState('')


  const verifySession = async ()=>{
    try {
      const response = await fetch('http://localhost:3000/home',
        {
          method: 'GET',
          credentials: 'include'
        }
      )
      const data = await response.json()
      if(response.ok){
        setAuth(true)
      }
    } catch (error) {
      console.error('failed to fetch', error.message)
    }
  }

  useEffect(()=>{
    verifySession()
  }, [])
  return (
    <nav>
        <Link to="/productos">Productos</Link>
        <Link to="/vender">Vender</Link>
        <Link to="/carrito">Carrito</Link>
        {auth ? (
          <>
            <div>Bienvenido, {username}.</div>
            <div>Cerrar sesion</div>
          </>

        ) : (
          <>
            <Link to="/login">Iniciar sesión</Link>
            <Link to="/register">Registrarse</Link>
          </>
        )}
    </nav>
  );
};

export default Navbar;
