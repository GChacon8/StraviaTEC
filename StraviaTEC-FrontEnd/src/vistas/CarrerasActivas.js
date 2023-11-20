import React, { useState , useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/Styles.css';
import Cookies from 'js-cookie';
import ico from "../Images/Ico.jpg"
import axios from 'axios';


function CarrerasActivas() {
  const navigate = useNavigate();

  const [result, setResult] = useState([]);

  useEffect(() => {
    console.log("entre");
    axios.get('https://localhost:7170/api/Carrera')
      .then(response => {
        setResult(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  console.log(result);

  var CarrerasInfo = [];

  const today = new Date();

  for (let i = 0; i < result.length; i++) {
    const date = result[i].fecha_Final;
    const indicesToExtract = [9, 8];
    const extractedChars = indicesToExtract.map(index => date[index]).join('');
    const intDate = parseInt(extractedChars); 
    if (today.getDay() > intDate) {
        const datos = {
          Nombre: result[i].nombre,
          Fecha: result[i].fecha,
          Ruta: result[i].cord,
          TipoActividad: result[i].iD_Tipo_Actividad,
          Privada: result[i].privada,
          Costo: result[i].precio,
          CuentaBancaria: result[i].cuenta,
          Categorías: result[i].iD_Categoria,
          Patrocinadores: "no hay",
        }
        CarrerasInfo.push(datos);
      }
  }

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
      <h1 style={{ fontWeight: 'bold', fontSize: '4em' }}>Carreras Activas</h1>
      <div className="Carreras">

        {CarrerasInfo.map(carrera => (
          <div key={carrera.ID} className='carrera_post'>

            <h2>{carrera.Nombre}</h2>
            <p><span style={{ fontWeight: 'bold' }}>Tipo de Actividad: </span>{carrera.TipoActividad}</p>
            <p><span style={{ fontWeight: 'bold' }}>Top 1: </span>{carrera.Top1}</p>
            <p><span style={{ fontWeight: 'bold' }}>Top 2: </span>{carrera.Top2}</p>
            <p><span style={{ fontWeight: 'bold' }}>Top 3: </span>{carrera.Top3}</p>
            <p><span style={{ fontWeight: 'bold' }}>Posición Actual: </span>{carrera.PosActual}</p>
           </div>
        ))}






      </div>

    </div>





  );
}

export default CarrerasActivas;
