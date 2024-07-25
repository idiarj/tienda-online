import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext.jsx';
import Producto from '../../components/producto/producto.jsx';
import './productos.css';
import Navbar from '../../components/Navbar/navbar.jsx';

const Productos = () => {
  const { categoria } = useParams();
  const { getProducts } = useContext(ProductContext);
  const products = getProducts();

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    nombre: '',
    precioMin: '',
    precioMax: '',
    marca: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categorias = [
    'Fútbol', 'Baloncesto', 'Tenis', 'Natación', 'Ciclismo',
    'Atletismo', 'Golf', 'Rugby', 'Boxeo', 'Voleibol'
  ];

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const applyFilters = () => {
    return products.filter(product => {
      const matchesCategory = categoria ? product.categoria === categoria : true;
      const matchesName = product.nombre.toLowerCase().includes(filters.nombre.toLowerCase());
      const matchesSearchTerm = product.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = filters.marca ? product.marca.toLowerCase().includes(filters.marca.toLowerCase()) : true;
      const matchesPrice = (filters.precioMin === '' || product.precio >= parseFloat(filters.precioMin)) &&
  (filters.precioMax === '' || product.precio <= parseFloat(filters.precioMax));

      return matchesCategory && matchesName && matchesSearchTerm && matchesBrand && matchesPrice;
    });
  };

  const resetFilters = () => {
    setFilters({
      nombre: '',
      precioMin: '',
      precioMax: '',
      marca: ''
    });
  };

  const filteredProducts = applyFilters();

  return (
    <>
      <Navbar />
      <div className="productos-container">
        <div className="sidebar">
          <h2>Categorías</h2>
          <ul>
            {categorias.map((cat, index) => (
              <li key={index}>
                <a href={`/productos/${cat}`}>{cat}</a>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="productos-lista">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => setIsModalOpen(true)} className='filtrar'>Filtrar</button>
          </div>
          {filteredProducts.map(product => (
            <Producto key={product.id} id={product.id} vista="productos" item={product} />
          ))}
        </div>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
              <h2>Filtrar Productos</h2>
              <form>
                <div>
                  <label>Nombre:</label>
                  <input type="text" name="nombre" value={filters.nombre} onChange={handleFilterChange} />
                </div>
                <div>
                  <label>Precio Mínimo:</label>
                  <input type="number" name="precioMin" value={filters.precioMin} onChange={handleFilterChange} />
                </div>
                <div>
                  <label>Precio Máximo:</label>
                  <input type="number" name="precioMax" value={filters.precioMax} onChange={handleFilterChange} />
                </div>
                <div>
                  <label>Marca:</label>
                  <input type="text" name="marca" value={filters.marca} onChange={handleFilterChange} />
                </div>
                <button type="button" onClick={() => setIsModalOpen(false)}>Aplicar Filtros</button>
                <button type="button" onClick={resetFilters}>Eliminar Filtros</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Productos;
