import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import ico from "../Images/Ico.jpg"

const AddActividad = () => {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [duracion, setDuracion] = useState('');
  const [tipoActividad, setTipoActividad] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [kilometraje, setKilometraje] = useState('');
  const [recorrido, setRecorrido] = useState('');
  const [completitud, setCompletitud] = useState(false);
  const [esReto, setEsReto] = useState(false);
  const [esCarrera, setEsCarrera] = useState(false);

  const handleEsRetoChange = () => {
    setEsReto(!esReto);
    setEsCarrera(false); // Desmarcar la otra opción
  };

  const handleEsCarreraChange = () => {
    setEsCarrera(!esCarrera);
    setEsReto(false); // Desmarcar la otra opción
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Nombre:', nombre);
    console.log('Fecha:', fecha);
    console.log('Hora:', hora);
    console.log('Duración:', duracion);
    console.log('Tipo de Actividad:', tipoActividad);
    console.log('Descripción:', descripcion);
    console.log('Kilometraje:', kilometraje);
    console.log('Recorrido:', recorrido);
    console.log('Completitud:', completitud);

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
          <label htmlFor="hora">Hora:</label>
          <input
            type="time"
            className="form-control"
            id="hora"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="duracion">Duración (hh:mm:ss):</label>
          <input
            type="text"
            className="form-control"
            id="duracion"
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
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
        <div className="form-group">
          <label htmlFor="kilometraje">Kilometraje:</label>
          <input
            type="number"
            className="form-control"
            id="kilometraje"
            value={kilometraje}
            onChange={(e) => setKilometraje(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="recorrido">Recorrido (archivo GPX):</label>
          <input
            type="file"
            className="form-control-file"
            id="recorrido"
            accept=".gpx"
            onChange={(e) => setRecorrido(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="esReto"
              checked={esReto}
              onChange={handleEsRetoChange}
            />
            <label className="form-check-label" htmlFor="esReto">Reto</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="esCarrera"
              checked={esCarrera}
              onChange={handleEsCarreraChange}
            />
            <label className="form-check-label" htmlFor="esCarrera">Carrera</label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" style={{marginTop:'20px'}}>
          Agregar
        </button>
      </form>
    </div>
  );
};

export default AddActividad;