import { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        username: '',
        correo: '',
        password: '',
    });
    const [error, setError] = useState('')

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/register', {       
            headers: {
                'Content-Type': 'application/json', // Añade el encabezado Content-Type
            },
            method: 'POST',
            body: JSON.stringify(formData)
            })
            const data = await response.json()
            if(!response.ok){
                setError(data.error)
            }
        } catch (error) {
            console.error('Error al registrar el usuario:', error.response.data);
            // Manejar el error mostrando un mensaje al usuario
        }
    };

    return (
        <div>
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Nombre"
                    required
                />
                <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    placeholder="Apellido"
                    required
                />
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Nombre de usuario"
                    required
                />
                <input
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleInputChange}
                    placeholder="Correo electrónico"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Contraseña"
                    required
                />
                <button type="submit">Registrar</button>
                {error !== '' && (
                    <div>
                        {error}
                    </div>
                )}
            </form>
        </div>
    );
};

export default Register;