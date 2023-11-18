import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/Styles.css'; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  // Verificación del usuario y contraseña del admin
  const handleSubmit = () => {
    if (username === 'admin' && password === 'admin') {
      console.log('FELICIDADES HACKEO EL SISTEMA');
      navigate('/TecAir/Administration');
    } else {
      console.log('Credenciales incorrectas');
      //navigate('/ClientView');
    }
  };

  return (

    <div className="login">
      <h1>TecAir</h1>
      <div>
        <label htmlFor="username">Usuario:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleInputChange}
          style={{ marginBottom: '10px'}}
        />
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          style={{ marginBottom: '10px'}}
        />
      </div>
      <button className="btn btn-primary .btn-xs" onClick={handleSubmit}>
        Iniciar Sesión
      </button>
    </div>
  );
}

export default Login;
