import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import ico from "../Images/Ico.jpg"

const AddActividad = () => {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [tipoActividad, setTipoActividad] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar alguna acción con los datos ingresados, como enviarlos a un servidor.
    console.log('Nombre:', nombre);
    console.log('Fecha:', fecha);
    console.log('Tipo de Actividad:', tipoActividad);
    console.log('Descripción:', descripcion);
    // Puedes agregar lógica adicional, como enviar los datos a través de una API, etc.
  };

  return (
    <div className='container'>

      <nav className="navbar navbar-fluid navbar-dark justify-content-between navbarr">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src={ico} width="50" height="50" alt="" style={{ marginRight: "20px" }} />
            StraviaTec
            onClick
          </a>

          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/StraviaTec/Retos">
                Retos
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/StraviaTec/Carreras">
                Carreras
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/StraviaTec">
                Inicio
              </Link>
            </li>
          </ul>
        </div>
      </nav>





      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      <h1 style={{ fontWeight: 'bold', fontSize: '2em' }}>Agregar Actividad</h1>
      
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fecha">Fecha:</label>
          <input
            type="date"
            className="form-control"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tipoActividad">Tipo de Actividad:</label>
          <input
            type="text"
            className="form-control"
            id="tipoActividad"
            value={tipoActividad}
            onChange={(e) => setTipoActividad(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            className="form-control"
            id="descripcion"
            rows="3"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary" style={{marginTop:'20px'}}>
          Agregar
        </button>
       
      </form>
    </div>
  );
};

export default AddActividad;
