import  { useContext, useState } from 'react';
import { ProductContext } from '../context/ProductContext';
import Producto from '../components/producto';
import './vender.css';
import Navbar from '../components/navbar.jsx'

const Vender = () => {
  const { getProducts, addProduct, editProduct } = useContext(ProductContext);
  const products = getProducts();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formValues, setFormValues] = useState({
    imagen: '',
    nombre: '',
    descripcion: '',
    precio: '',
    disponibilidad: true,
    categoria: '',
    marca: '',
    cantidad: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddProduct = () => {
    addProduct(formValues);
    setIsAddModalOpen(false);
    setFormValues({
      imagen: '',
      nombre: '',
      descripcion: '',
      precio: '',
      disponibilidad: true,
      categoria: '',
      marca: '',
      cantidad: ''
    });
  };

  const handleEditProduct = () => {
    editProduct({ ...formValues, id: currentProduct.id });
    setIsEditModalOpen(false);
    setCurrentProduct(null);
    setFormValues({
      imagen: '',
      nombre: '',
      descripcion: '',
      precio: '',
      disponibilidad: true,
      categoria: '',
      marca: '',
      cantidad: ''
    });
  };

  const openEditModal = (product) => {
    setCurrentProduct(product);
    setFormValues(product);
    setIsEditModalOpen(true);
  };

  return (
    <>
    <Navbar/>
      <div>
      <h1>Vender</h1>
      <button onClick={() => setIsAddModalOpen(true)} className="agregar-producto-btn">Agregar Producto</button>
      <div className="productos-lista-vendedor">
        {products.map(product => (
          <Producto key={product.id} id={product.id} vista="vender" onEdit={openEditModal} />
        ))}
      </div>

      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsAddModalOpen(false)}>&times;</span>
            <h2>Agregar Nuevo Producto</h2>
            <form>
              <div>
                <label>Imagen:</label>
                <input
                  type="text"
                  name="imagen"
                  value={formValues.imagen}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  value={formValues.nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Descripción:</label>
                <textarea
                  name="descripcion"
                  value={formValues.descripcion}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Precio:</label>
                <input
                  type="number"
                  name="precio"
                  value={formValues.precio}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Disponibilidad:</label>
                <input
                  type="checkbox"
                  name="disponibilidad"
                  checked={formValues.disponibilidad}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Categoría:</label>
                <input
                  type="text"
                  name="categoria"
                  value={formValues.categoria}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Marca:</label>
                <input
                  type="text"
                  name="marca"
                  value={formValues.marca}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Cantidad:</label>
                <input
                  type="number"
                  name="cantidad"
                  value={formValues.cantidad}
                  onChange={handleInputChange}
                />
              </div>
              <button type="button" onClick={handleAddProduct}>Agregar Producto</button>
            </form>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsEditModalOpen(false)}>&times;</span>
            <h2>Editar Producto</h2>
            <form>
              <div>
                <label>Imagen:</label>
                <input
                  type="text"
                  name="imagen"
                  value={formValues.imagen}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  value={formValues.nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Descripción:</label>
                <textarea
                  name="descripcion"
                  value={formValues.descripcion}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Precio:</label>
                <input
                  type="number"
                  name="precio"
                  value={formValues.precio}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Disponibilidad:</label>
                <input
                  type="checkbox"
                  name="disponibilidad"
                  checked={formValues.disponibilidad}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Categoría:</label>
                <input
                  type="text"
                  name="categoria"
                  value={formValues.categoria}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Marca:</label>
                <input
                  type="text"
                  name="marca"
                  value={formValues.marca}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Cantidad:</label>
                <input
                  type="number"
                  name="cantidad"
                  value={formValues.cantidad}
                  onChange={handleInputChange}
                />
              </div>
              <button type="button" onClick={handleEditProduct}>Guardar Cambios</button>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Vender;
