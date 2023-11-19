import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/Styles.css'; 
import Cookies from 'js-cookie';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  //Verificación del usuario y contraseña del usuario
  const handleSubmit = () => {
    if (password === 'admin') {
   
      Cookies.set('userInfo', username, { expires: 1 });
      console.log('Cookie creada');
      navigate('/User_view');
    } else {
      console.log('Credenciales incorrectas');
      setErrorMessage('Usuario o contraseña incorrectos');
      //navigate('/ClientView');
    }
  };

  const handleCreateUser =()=>{
    navigate('/Create_user');

  };

  return (

    <div className="login">
      <h1>StraviaTec</h1>
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
      {errorMessage && <div className="error-message" style={{color:'red'}}>*{ errorMessage}</div>}
      <button className="btn btn-outline-dark my-2" style={{fontWeight:'bold'}} onClick={handleSubmit}>
        Iniciar Sesión
      </button>
      <button className="btn btn-outline-dark my-2" style={{fontWeight:'bold'}} onClick={handleCreateUser}>
        Crear Usuario
      </button>
    </div>
  );
}

export default Login;
