import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/Styles.css'; 
import Cookies from 'js-cookie';
import ico from "../Images/Ico.jpg";
import axios from 'axios';

function RetosActivos() {
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

  const today = new Date();

  for (let i = 0; i < result.length; i++) {
    const date = result[i].fecha_Final;
    const indicesToExtract = [9, 8];
    const extractedChars = indicesToExtract.map(index => date[index]).join('');
    const intDate = parseInt(extractedChars); 
    if (today.getDay() > intDate) {
      const datos = {
            ID: result[i].id,
            Nombre: result[i].nombre,
            Fecha: result[i].fecha_Inicio,
            TipoActividad: result[i].iD_Tipo_Actividad,
            Descripcion: "hola",
          }
          RetosInfo.push(datos);
    }
    
  }

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
    
    <h1 style={{ fontWeight: 'bold', fontSize: '4em' }}>Retos Activos</h1>
      <div className="Carreras">
        {RetosInfo.map(reto => (
          <div key={reto.ID} className='carrera_post'>
            <h2>{reto.Nombre}</h2>
            <p><span style={{ fontWeight: 'bold' }}>Fecha: </span>: {reto.Fecha}</p>
            <p><span style={{ fontWeight: 'bold' }}>Tipo de Actividad: </span>{reto.TipoActividad}</p>
            <p><span style={{ fontWeight: 'bold' }}>Objetivo: </span>{reto.Descripcion}</p>
            <p><span style={{ fontWeight: 'bold' }}>Avance del Deportista: </span>{reto.Avance}</p>
            <p><span style={{ fontWeight: 'bold' }}>Días Restantes: </span>{calcularDiasRestantes(reto.Fecha)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function calcularDiasRestantes(fechaFin) {
  const fechaFinMs = new Date(fechaFin).getTime();
  const hoyMs = new Date().getTime();
  const diferenciaMs = fechaFinMs - hoyMs;
  const diasRestantes = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));

  if(diasRestantes < 0){
    return 0;
  } else{
    return diasRestantes;
  }
  
}

export default RetosActivos;
