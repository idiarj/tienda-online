import  { createContext, useState } from 'react';
import productos from '../data'; 


export const ProductContext = createContext();


export const ProductProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);


  const getProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/products', 
        {
          method: 'GET'
        }
      )
      const data = await response.json()
      if(response.ok){
        setProductList(data.)
      }
    } catch (error) {
      console.log(error.message)
    }
  };

  
  const getProductById = (id) => productList.find(product => product.id === id);


  const addProduct = (newProduct) => {
    try {
      const response = await fetch('http://localhost:3000/products', {
            method: 'POST',
            body: newProduct,
            headers: {
              // No establezcas 'Content-Type' cuando uses FormData
            }
      })
      console.log(response);
      const data = await response.json()
      console.log(data)
      if(response.ok) {
        console.log('todo joya')
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

 
  const editProduct = (updatedProduct) => {
    setProductList(prevProducts => prevProducts.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

 
  const deleteProduct = (id) => {
    setProductList(prevProducts => prevProducts.filter(product => product.id !== id));
  };

  return (
    <ProductContext.Provider value={{ getProducts, getProductById, addProduct, editProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};


