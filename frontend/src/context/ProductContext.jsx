import React, { createContext, useState } from 'react';
import productos from '../data'; 


export const ProductContext = createContext();


export const ProductProvider = ({ children }) => {
  const [productList, setProductList] = useState(productos);


  const getProducts = () => productList;

  
  const getProductById = (id) => productList.find(product => product.id === id);


  const addProduct = (newProduct) => {
    setProductList(prevProducts => [...prevProducts, { ...newProduct, id: Date.now() }]);
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


