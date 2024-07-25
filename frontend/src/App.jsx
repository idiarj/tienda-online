import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom' // Import the Router component
import Testing from './components/testing'
import Navbar from './components/navbar';
import Productos from './views/Productos';
import Vender from './views/Vender';
import Carrito from './views/Carrito';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import './App.css'

function App() {

  return (
    <>
    
    <Router>
      <ProductProvider>
      <CartProvider>
      <Navbar />
      <Routes>
        <Route path='/testing' Component={Testing}/>
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
