import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom' // Import the Router component
// import Testing from './components/testing'
// import Navbar from './components/navbar';
import Productos from './views/Productos/Productos';
import Vender from './views/Vender/Vender';
import Carrito from './views/Carrito/Carrito';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import Register from './views/Register/Register';
import Login from './views/Login/Login';
import Home from './views/Home/Home';
import './App.css'

function App() {

  return (
    <>
    
    <Router>
      <ProductProvider>
      <CartProvider>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Navigate to="/home"/>}/>
        <Route path="/register" Component={Register}/>
        <Route path="/home" Component={Home}/>
        <Route path="/login" Component={Login}/>
        <Route path="/Productos/:categoria?" Component={Productos} />
        <Route path="/Vender" Component={Vender} />
        <Route path="/Carrito" Component={Carrito} />
      </Routes>
      </CartProvider>
      </ProductProvider>
      
    </Router>
    </>
    
  )
}

export default App
