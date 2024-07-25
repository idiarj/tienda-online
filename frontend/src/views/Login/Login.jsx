import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Aquí deberías implementar la lógica para enviar los datos al backend
        // Por ejemplo, usando fetch o axios para enviar formData al servidor.
        console.log(formData);
        try{ 
            const response = await fetch('http://localhost:3000/login', {
            headers: {
                'Content-Type': 'application/json', // Añade el encabezado Content-Type
            },
            method: 'POST',
            body: JSON.stringify(formData)
            })
            const data = await response.json()
            console.log(data)
            if(!response.ok){
                setError(data.error)
            }else{
                console.log(data)
                navigate('/home')
            }
        }catch(error){
            console.error('Failed to fetch', error.message)
        }
    };

    return (
        <section className="loginContainer">
             <form onSubmit={handleSubmit} className="loginForm">
            <div className="userDiv">
                <label htmlFor="username">Nombre de Usuario:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="passwordDiv">
                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <button className="submitButton" type="submit">Iniciar Sesión</button>
        </form>
        {
                error !== '' && (
                    <div className="errorDiv">
                        {error}
                    </div>
                )
            }
            <label className='homeLabel' onClick={()=>{navigate('/home')}}>Regresar a Home.</label>
            <label className='registerLabel' onClick={()=>{navigate('/register')}}>
                Registrate.
            </label>
        </section>
       
    );
};

export default Login;