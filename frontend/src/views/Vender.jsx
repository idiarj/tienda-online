import  { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [nombreProducto, setNombreProducto] = useState('');
  const [precio, setPrecio] = useState('');
  const [idMarca, setIdMarca] = useState('');
  const [idDeporte, setIdDeporte] = useState('');
  const [imagen, setImagen] = useState(null);
  const [cantidad, setCantidad] = useState(''); 
  const [disponibilidad, setDisponibilidad] = useState(false)
  const [descripcion, setDescripcion] = useState('')
  const [formValues, setFormValues] = useState({
    imagen: '',
    nombre: '',
    descripcion: '',
    precio: '',
    disponibilidad: '',
    categoria: '',
    marca: '',
    cantidad: ''
  })

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  const verifySession = async ()=>{
    try {
      const response = await fetch('http://localhost:3000/home',
        {
          method: 'GET',
          credentials: 'include'
        }
      )
      const data = await response.json()
      if(!response.ok){
        navigate('/home')
      }
      return true
    } catch (error) {
      console.error('failed to fetch', error.message)
      return false
    }
  }

  useEffect(()=>{
    const auth = verifySession()
  }, [])



  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('imagen', imagen);
    // Agregar cada propiedad al formData
    formData.append('nombre_producto', nombreProducto);
    formData.append('precio', precio);
    formData.append('id_marca', idMarca);
    formData.append('id_deporte', idDeporte);
    formData.append('cantidad', cantidad); // Agregar cantidad al formData

    addProduct(formData)
  };

  const handleEditProduct = async () => {
    const formData = new FormData();
    // Suponiendo que `formValues` contiene todos los campos necesarios para el producto
    Object.keys(formValues).forEach(key => {
      formData.append(key, formValues[key]);
    });
    // Asegúrate de incluir el ID del producto que se va a editar
    formData.append('id', currentProduct.id);
    console.log(currentProduct)
  
    try {
      const response = await fetch(`http://localhost:3000/products/${currentProduct.id}`, {
        method: 'PUT', // o 'PATCH' dependiendo de cómo esté implementado tu backend
        body: formData,
        // No establezcas 'Content-Type' cuando uses FormData
        // headers: { 'Content-Type': 'multipart/form-data' }, // Esto es manejado automáticamente por el navegador
      });
  
      if (response.ok) {
        // Actualización exitosa
        console.log('Producto actualizado con éxito');
        setIsEditModalOpen(false);
        setCurrentProduct(null);
        // Restablecer formValues o actualizar la UI según sea necesario
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
        // Aquí podrías querer recargar los productos desde el backend o actualizar el estado local
      } else {
        // Manejar respuesta no exitosa
        console.error('Error al actualizar el producto');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
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
          <Producto key={product.id} id={product.id} item={product} vista="vender" onEdit={openEditModal} />
        ))}
      </div>

      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsAddModalOpen(false)}>&times;</span>
            <h2>Agregar Nuevo Producto</h2>
            <form>
              <div>
                <label >Nombre del Producto:</label>
                <input
                  type="text"
                  id="nombreProducto"
                  value={nombreProducto}
                  onChange={(e) => setNombreProducto(e.target.value)}
                  placeholder="Nombre del Producto"
                  required
                />
              </div>
              <div>
                <label >Precio:</label>
                <input
                  type="number"
                  id="precio"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  placeholder="Precio"
                  required
                />
              </div>
              <div>
                <label >ID de la Marca:</label>
                <input
                  type="text"
                  id="idMarca"
                  value={idMarca}
                  onChange={(e) => setIdMarca(e.target.value)}
                  placeholder="ID de la Marca"
                  required
                />
              </div>
              <div>
                <label >ID del Deporte:</label>
                <input
                  type="text"
                  id="idDeporte"
                  value={idDeporte}
                  onChange={(e) => setIdDeporte(e.target.value)}
                  placeholder="ID del Deporte"
                  required
                />
              </div>
              <div>
                <label >Cantidad:</label>
                <input
                  type="number"
                  id="cantidad"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  placeholder="Cantidad"
                  required
                />
              </div>
              <div>
                <label >Disponibilidad:</label>
                <input
                  type="checkbox"
                  id="disponibilidad"
                  name="disponibilidad"
                  checked={disponibilidad}
                  onChange={(e) => setDisponibilidad(e.target.checked)} // Changed to e.target.checked for correct checkbox handling
                />
              </div>
              <div>
                <label>Imagen:</label>
                <input
                  type="file"
                  id="imagen"
                  onChange={(e) => setImagen(e.target.files[0])}
                  name="imagen"
                  required
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
