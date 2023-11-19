import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/Styles.css';
import ico from "../Images/Ico.jpg"

const Create_Grupos = () => {
  const [nombreGrupo, setNombreGrupo] = useState('');
  const [nombreAdmin, setNombreAdmin] = useState('');

  const handleNombreGrupoChange = (event) => {
    setNombreGrupo(event.target.value);
  };

  const handleNombreAdminChange = (event) => {
    setNombreAdmin(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar acciones con los datos, como enviarlos al servidor o realizar alguna lógica.
    console.log('Nombre del Grupo:', nombreGrupo);
    console.log('Nombre del Administrador:', nombreAdmin);
    setNombreAdmin('');
    setNombreGrupo('');
  };

  return (
    <div>

      <nav className="navbar navbar-fluid navbar-dark justify-content-between navbarr">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src={ico} width="50" height="50" alt="" style={{ marginRight: "20px" }} />
            StraviaTec
          </a>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/StraviaTec">
                Inicio
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto d-flex">

            <li className="nav-item">
              <Link className="nav-link" to="/StraviaTec/Admin_view">
                Organizador
              </Link>
            </li>

          </ul>
        </div>
      </nav>





      <div className='login'>
        <h1 className="mb-4">Crear Grupo</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombreGrupo">Nombre del Grupo:</label>
            <input
              type="text"
              className="form-control"
              id="nombreGrupo"
              placeholder="Ingrese el nombre del grupo"
              value={nombreGrupo}
              onChange={handleNombreGrupoChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombreAdmin">Administrador:</label>
            <input
              type="text"
              className="form-control"
              id="nombreAdmin"
              placeholder="Ingrese el usuario del administrador"
              value={nombreAdmin}
              onChange={handleNombreAdminChange}
              required
            />
          </div>
          <button className="btn btn-outline-dark my-2" style={{ fontWeight: 'bold' }} >
            Crear Grupo
          </button>
        </form>
      </div>

    </div>
  );
};

export default Create_Grupos;
