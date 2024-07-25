import { useState } from 'react';

function Testing() {
  const [nombreProducto, setNombreProducto] = useState('');
  const [precio, setPrecio] = useState('');
  const [idMarca, setIdMarca] = useState('');
  const [idDeporte, setIdDeporte] = useState('');
  const [imagen, setImagen] = useState(null);
  const [cantidad, setCantidad] = useState(''); // Agregado nuevo estado para la cantidad

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('imagen', imagen);
    // Agregar cada propiedad al formData
    formData.append('nombre_producto', nombreProducto);
    formData.append('precio', precio);
    formData.append('id_marca', idMarca);
    formData.append('id_deporte', idDeporte);
    formData.append('cantidad', cantidad); // Agregar cantidad al formData
  
    try {
      const response = await fetch('http://localhost:3000/products', {
            method: 'POST',
            body: formData,
            headers: {
              // No establezcas 'Content-Type' cuando uses FormData
            }
      })
      console.log(response);
      const data = await response.json()
      console.log(data)
      if(response.ok) {console.log(data)}
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={nombreProducto}
        onChange={(e) => setNombreProducto(e.target.value)}
        placeholder="Nombre del Producto"
        required
      />
      <input
        type="number"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        placeholder="Precio"
        required
      />
      <input
        type="text"
        value={idMarca}
        onChange={(e) => setIdMarca(e.target.value)}
        placeholder="ID de la Marca"
        required
      />
      <input
        type="text"
        value={idDeporte}
        onChange={(e) => setIdDeporte(e.target.value)}
        placeholder="ID del Deporte"
        required
      />
            <input
        type="number"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
        placeholder="Cantidad"
        required
      />
      <input
        type="file"
        onChange={(e) => setImagen(e.target.files[0])}
        required
      />

      <button type="submit">Agregar Producto</button>
    </form>
  );
}

export default Testing;