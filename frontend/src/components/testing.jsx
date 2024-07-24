import { useState } from 'react'
import { ifetchWrapper } from '../../FetchWrapper.js';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedImage);
    // formData.forEach((value, key) => {
    //   console.log(`${key}: ${value}`);
    // });

    const response = await ifetchWrapper.fetchMethod({
      endpoint: 'products/imagen',
      method: 'post',
      body: formData
    })
    if(response.ok){
    console.log(selectedImage);
    console.log(imagePreviewUrl)
    }
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