import { useState } from 'react'

function Testing() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file)); // Crear y guardar la URL para vista previa
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes implementar la lógica para enviar la imagen al servidor o procesarla como necesites
    console.log(selectedImage);
    console.log(imagePreviewUrl)
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} />
        {imagePreviewUrl && (
          <div>
            <img src={imagePreviewUrl} alt="Selected" style={{ width: '100px' }} />
          </div>
        )}
        <button type="submit">Subir Imagen</button>
      </form>
    </div>
  );
}

export default Testing;