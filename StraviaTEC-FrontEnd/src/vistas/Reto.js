import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/Styles.css';
import Cookies from 'js-cookie';
import ico from "../Images/Ico.jpg";
import axios from 'axios';

function Reto() {
  const navigate = useNavigate();

  const [result, setResult] = useState([]);

  useEffect(() => {
    console.log("entre");
    axios.get('https://localhost:7170/api/Reto')
      .then(response => {
        setResult(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  console.log(result);

  var RetosInfo = [];

  for (let i = 0; i < result.length; i++) {
    const datos = {
      ID: result[i].id,
      Nombre: result[i].nombre,
      Fecha: result[i].fecha_Inicio,
      TipoActividad: result[i].iD_Tipo_Actividad,
      Descripcion: "hola",
    }
    RetosInfo.push(datos);
  }
  

  console.log(RetosInfo);
  /*var RetosInfo = [
    {
      ID: 1,
      Nombre: "Reto de Distancia",
      Fecha: "2023-11-16",
      TipoActividad: "Ciclismo",
      Descripcion: "Correr 20k",
    },
    {
      ID: 2,
      Nombre: "Reto de Velocidad",
      Fecha: "2023-11-20",
      TipoActividad: "Ciclismo",
      Descripcion: "Alcanzar una velocidad de 30 km/h",
    },
    {
      ID: 3,
      Nombre: "Reto de Resistencia",
      Fecha: "2023-11-25",
      TipoActividad: "Carrera",
      Descripcion: "Correr sin parar durante 1 hora",
    },
    {
      ID: 4,
      Nombre: "Reto de Resistencia",
      Fecha: "2023-11-25",
      TipoActividad: "Carrera",
      Descripcion: "Correr sin parar durante 1 hora",
    },
    {
      ID: 5,
      Nombre: "Reto de Resistencia",
      Fecha: "2023-11-25",
      TipoActividad: "Carrera",
      Descripcion: "Correr sin parar durante 1 hora",
    },
  ];*/

  const handleClose = () => {
    navigate('/StraviaTec');
  }

  const handlejoinReto = (ID) => {
    console.log('Se unió a un reto');
    console.log(Cookies.get('userInfo'))
    console.log(ID);

  };

  const handleSearchReto = () => {

  };

  return (
    <div style={{ textAlign: 'center' }}>


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
        </div>
      </nav>

      <h1 style={{ fontWeight: 'bold', fontSize: '4em' }}>Retos</h1>
      <div className="Carreras">
      {RetosInfo.map(reto => (
          <div key={reto.ID} className='carrera_post'>
            <h2>{reto.Nombre}</h2>
            <p><span style={{ fontWeight: 'bold' }}>Fecha: </span>: {reto.Fecha}</p>
            <p><span style={{ fontWeight: 'bold' }}>Tipo de Actividad: </span>{reto.TipoActividad}</p>
            <p><span style={{ fontWeight: 'bold' }}>Descripción: </span>{reto.Descripcion}</p>
            <button className="btn btn-outline-dark my-2" style={{ fontWeight: 'bold' }} onClick={() => handlejoinReto(reto.ID)}>
              Participar
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Reto;
