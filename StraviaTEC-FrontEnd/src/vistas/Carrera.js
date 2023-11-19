import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/Styles.css'; 
import Cookies from 'js-cookie';
import ico from "../Images/Ico.jpg"
import axios from 'axios';


function Carrera() {
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

  for (let i = 0; i < result.length; i++) {
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
  

  console.log(CarrerasInfo);
 


  /*var carrerasInfo = [
    {
      ID: 1,
      Nombre: "Teletón",
      Fecha: "2023-11-16",
      Ruta: ruta1,
      TipoActividad: "Ciclismo",
      Privada: false,
      Costo: 100,
      CuentaBancaria: [10011001],
      Categorías: ['Junior', 'Sub-23', 'Elite', 'Master A', 'Master B', 'Master C'],
      Patrocinadores:['TEC','Gatorade','Wonka','Nike','Adidas'],
    },
    {
        ID: 2,
        Nombre: "Maratón de la Ciudad",
        Fecha: "2023-12-01",
        Ruta: ruta2,
        TipoActividad: "Running",
        Privada: true,
        GruposAutorizados: ['ClubRunners', 'AmigosRunners'],
        Costo: 50,
        CuentaBancaria: [20022002],
        Categorías: ['Junior', 'Senior', 'Master A', 'Master B'],
        Patrocinadores: ['New Balance', 'Asics', 'Powerade', 'Garmin'],
      },
      {
        ID: 3,
        Nombre: "Gran Fondo Montañés",
        Fecha: "2023-11-25",
        Ruta: ruta2,
        TipoActividad: "Ciclismo",
        Privada: false,
        Costo: 80,
        CuentaBancaria: [30033003],
        Categorías: ['Junior', 'Sub-23', 'Elite', 'Master A', 'Master B', 'Master C'],
        Patrocinadores: ['Specialized', 'Red Bull', 'Clif Bar', 'Oakley'],
      },
      {
        ID: 4,
        Nombre: "Carrera Nocturna",
        Fecha: "2023-12-08",
        Ruta: ruta2,
        TipoActividad: "Running",
        Privada: false,
        Costo: 60,
        CuentaBancaria: [40044004],
        Categorías: ['Junior', 'Senior', 'Master A', 'Master B'],
        Patrocinadores: ['Under Armour', 'Hoka One One', 'Coca-Cola', 'TomTom'],
      },
      {
        ID: 5,
        Nombre: "Desafío Montañero",
        Fecha: "2023-12-15",
        Ruta: ruta2,
        TipoActividad: "Ciclismo",
        Privada: true,
        GruposAutorizados: ['ClubCiclistas', 'MontañaLovers'],
        Costo: 120,
        CuentaBancaria: [50055005],
        Categorías: ['Elite', 'Master A', 'Master B', 'Master C'],
        Patrocinadores: ['Trek', 'GU Energy', 'CamelBak'],
      },
      {
        ID: 6,
        Nombre: "Carrera Solidaria",
        Fecha: "2023-12-22",
        Ruta: ruta2,
        TipoActividad: "Running",
        Privada: false,
        Costo: 40,
        CuentaBancaria: [60066006],
        Categorías: ['Junior', 'Sub-23', 'Senior'],
        Patrocinadores: ['Puma', 'GU Energy', 'Starbucks'],
      },
      {
        ID: 7,
        Nombre: "Gran Desafío Náutico",
        Fecha: "2023-12-29",
        Ruta: ruta2,
        TipoActividad: "Natación",
        Privada: false,
        Costo: 90,
        CuentaBancaria: [70077007],
        Categorías: ['Junior', 'Elite', 'Master A', 'Master B'],
        Patrocinadores: ['Speedo', 'Aqua Sphere', 'Gatorade'],
      },
      {
        ID: 8,
        Nombre: "Carrera Urbana",
        Fecha: "2024-01-05",
        Ruta: ruta2,
        TipoActividad: "Running",
        Privada: false,
        Costo: 55,
        CuentaBancaria: [80088008],
        Categorías: ['Sub-23', 'Elite', 'Master A'],
        Patrocinadores: ['Nike', 'Adidas', 'Garmin'],
      },
      {
        ID: 9,
        Nombre: "Desafío de Montaña",
        Fecha: "2024-01-12",
        Ruta: ruta2,
        TipoActividad: "Ciclismo",
        Privada: false,
        Costo: 75,
        CuentaBancaria: [90099009],
        Categorías: ['Junior', 'Sub-23', 'Elite', 'Master A', 'Master B', 'Master C'],
        Patrocinadores: ['Cannondale', 'PowerBar', 'Coca-Cola'],
      },
      {
        ID: 10,
        Nombre: "Carrera de Aventura",
        Fecha: "2024-01-19",
        Ruta: ruta2,
        TipoActividad: "Running",
        Privada: true,
        GruposAutorizados: ['AventuraRunners', 'AmigosAventura'],
        Costo: 70,
        CuentaBancaria: [101011010],
        Categorías: ['Junior', 'Senior', 'Master B', 'Master C'],
        Patrocinadores: ['Salomon', 'Clif Bar', 'Suunto'],
      },
      {
        ID: 11,
        Nombre: "Desafío Acuático",
        Fecha: "2024-01-26",
        Ruta: ruta1,
        TipoActividad: "Natación",
        Privada: false,
        Costo: 85,
        CuentaBancaria: [11111111],
        Categorías: ['Junior', 'Elite', 'Master B', 'Master C'],
        Patrocinadores: ['TYR', 'Gatorade', 'FINIS'],
      },   

  ];*/



 
  const handlejoinCarrera =(ID)=>{
    console.log('Se unió a una carrera');
    console.log(Cookies.get('userInfo'))
    console.log(ID);

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
            <h1 style={{ fontWeight: 'bold', fontSize: '4em' }}>Carreras</h1>
            <div className="Carreras">

            {CarrerasInfo.map(carrera => (
              <div key={carrera.Nombre} className='carrera_post'>
               
                <h2>{carrera.Nombre}</h2>
                <p><span style={{fontWeight: 'bold'}}>Fecha: </span>: {carrera.Fecha}</p>
                <p><span style={{fontWeight: 'bold'}}>Tipo de Actividad: </span>{carrera.TipoActividad}</p>
                <p><span style={{fontWeight: 'bold'}}>Categorías Disponibles: </span> {carrera.Categorías}</p>
                <p><span style={{fontWeight: 'bold'}}>Costo: </span> {carrera.Costo}</p>
                <p><span style={{fontWeight: 'bold'}}>Cuentas Bancarias: </span> {carrera.CuentaBancaria}</p>
                <button className="btn btn-outline-dark my-2" style={{ fontWeight: 'bold' }}  onClick={() => handlejoinCarrera(carrera.ID)}>
                    Unirse
                </button>
                </div>
            ))}

    




            </div>

        </div>





    );
}

export default Carrera;
