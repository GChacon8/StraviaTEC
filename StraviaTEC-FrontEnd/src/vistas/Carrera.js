import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/Styles.css'; 
import Cookies from 'js-cookie';
import ico from "../Images/Ico.jpg"


function Carrera() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  var ruta1 = [
    [9.9383849, -84.1088645],
    [9.93841, -84.10881],
    [9.93844, -84.10874],
    [9.93845, -84.10864],
    [9.93845, -84.10863],
    [9.93845, -84.10855],
    [9.93844, -84.10844],
    [9.93843, -84.10826],
    [9.93842, -84.10807],
    [9.93841, -84.10788],
    [9.9384, -84.1077],
    [9.93839, -84.10751],
    [9.93838, -84.1074],
    [9.9383, -84.10604],
    [9.9383, -84.10603],
    [9.93828, -84.10568],
    [9.93824, -84.10495],
    [9.93823, -84.10477],
    [9.9382, -84.10421],
    [9.93814, -84.10328],
    [9.93807, -84.10215],
    [9.93806, -84.10119],
    [9.93802, -84.10028],
    [9.938, -84.09983],
    [9.93797, -84.0993],
    [9.93791, -84.09866],
    [9.9379075, -84.0986642],
    [9.93788, -84.09859],
    [9.9378762, -84.0985881],
    [9.9378762, -84.0985881],
    [9.93786, -84.09856],
    [9.93782, -84.09849],
    [9.93778, -84.09845],
    [9.93772, -84.09841],
    [9.93765, -84.09838],
    [9.93753, -84.09834],
    [9.9375263, -84.0983355],
    [9.9372, -84.09832],
    [9.93661, -84.09829],
    [9.93629, -84.09828],
    [9.93584, -84.09827],
    [9.93508, -84.09825],
    [9.93483, -84.09824],
    [9.9343, -84.09821],
    [9.93424, -84.09821],
    [9.93392, -84.09819],
    [9.93384, -84.09819],
    [9.93342, -84.09817],
    [9.93323, -84.09817],
    [9.93304, -84.09819],
    [9.93284, -84.09821],
    [9.9328417, -84.0982058],
    [9.93283, -84.09821],
    [9.93276, -84.09825],
    [9.93268, -84.09831],
    [9.9326838, -84.0983132],
    [9.9326838, -84.0983132],
    [9.93267, -84.09833],
    [9.93265, -84.09835],
    [9.93263, -84.09838],
    [9.93262, -84.09842],
    [9.93262, -84.09846],
    [9.93262, -84.0985],
    [9.93268, -84.09896],
    [9.93277, -84.09982],
    [9.93278, -84.09992],
    [9.9329, -84.10099],
    [9.93306, -84.10269],
    [9.93314, -84.10341],
    [9.93318, -84.10382],
    [9.93333, -84.10541],
    [9.93334, -84.10559],
    [9.93335, -84.10578],
    [9.93336, -84.10596],
    [9.93337, -84.10612],
    [9.93337, -84.10614],
    [9.93339, -84.10632],
    [9.93341, -84.1065],
    [9.93343, -84.10668],
    [9.93345, -84.10687],
    [9.93347, -84.10705],
    [9.93348, -84.10716],
    [9.93362, -84.10898],
    [9.93371, -84.10984],
    [9.93373, -84.11002],
    [9.9337322, -84.1100219],
    [9.9337886, -84.1102055],
    [9.93397, -84.11015],
    [9.93436, -84.11005],
    [9.93466, -84.10998],
    [9.93484, -84.10993],
    [9.93498, -84.10988],
    [9.93502, -84.10987],
    [9.93518, -84.10982],
    [9.93535, -84.10978],
    [9.93551, -84.10973],
    [9.93559, -84.10971],
    [9.93619, -84.10954],
    [9.93699, -84.10933],
    [9.93718, -84.10928],
    [9.93752, -84.10919],
    [9.93802, -84.10908],
    [9.93813, -84.10904],
    [9.93821, -84.10902],
    [9.93823, -84.109],
    [9.9382333, -80.1090036]
  ];

  var ruta2 = [
    [9.9383849, -84.1088645],
    [9.93841, -84.10881],
    [9.93844, -84.10874],
    [9.93845, -84.10864],
    [9.93845, -84.10863],
    [9.93845, -84.10855],
    [9.93844, -84.10844],
    [9.93843, -84.10826],
    [9.93842, -84.10807],
    [9.93841, -84.10788],
    [9.9384, -84.1077],
    [9.93839, -84.10751],
    [9.93838, -84.1074],
    [9.9383, -84.10604],
    [9.9383, -84.10603],
    [9.93828, -84.10568],
    [9.93824, -84.10495],
    [9.93823, -84.10477],
    [9.9382, -84.10421],
    [9.93814, -84.10328],
    [9.93807, -84.10215],
    [9.93806, -84.10119],
    [9.93802, -84.10028],
    [9.938, -84.09983],
    [9.93797, -84.0993],
    [9.93791, -84.09866],
    [9.9379075, -84.0986642],
    [9.93788, -84.09859],
    [9.9378762, -84.0985881],
    [9.9378762, -84.0985881],
    [9.93786, -84.09856],
    [9.93782, -84.09849],
    [9.93778, -84.09845],
    [9.93772, -84.09841],
    [9.93765, -84.09838],
    [9.93753, -84.09834],
    [9.9375263, -84.0983355],
    [9.9372, -84.09832],
    [9.93661, -84.09829],
    [9.93629, -84.09828],
    [9.93584, -84.09827],
    [9.93508, -84.09825],
    [9.93483, -84.09824],
    [9.9343, -84.09821],
    [9.93424, -84.09821],
    [9.93392, -84.09819],
    [9.93384, -84.09819],
    [9.93342, -84.09817],
    [9.93323, -84.09817],
    [9.93304, -84.09819],
    [9.93284, -84.09821],
    [9.9328417, -84.0982058],
    [9.93283, -84.09821],
    [9.93276, -84.09825],
    [9.93268, -84.09831],
    [9.9326838, -84.0983132],
    [9.9326838, -84.0983132],
    [9.93267, -84.09833],
    [9.93265, -84.09835],
    [9.93263, -84.09838],
    [9.93262, -84.09842],
    [9.93262, -84.09846],
    [9.93262, -84.0985],
    [9.93268, -84.09896],
    [9.93277, -84.09982],
    [9.93278, -84.09992],
    [9.9329, -84.10099],
    [9.93306, -84.10269],
    [9.93314, -84.10341],
    [9.93318, -84.10382],
    [9.93333, -84.10541],
    [9.93334, -84.10559],
    [9.93335, -84.10578],
    [9.93336, -84.10596],
    [9.93337, -84.10612],
    [9.93337, -84.10614],
    [9.93339, -84.10632],
    [9.93341, -84.1065],
    [9.93343, -84.10668],
    [9.93345, -84.10687],
    [9.93347, -84.10705],
    [9.93348, -84.10716],
    [9.93362, -84.10898],
    [9.93371, -84.10984],
    [9.93373, -84.11002],
    [9.9337322, -84.1100219],
    [9.9337886, -84.1102055],
    [9.93397, -84.11015],
    [9.93436, -84.11005],
    [9.93466, -84.10998],
    [9.93484, -84.10993],
    [9.93498, -84.10988],
    [9.93502, -84.10987],
    [9.93518, -84.10982],
    [9.93535, -84.10978],
    [9.93551, -84.10973],
    [9.93559, -84.10971],
    [9.93619, -84.10954],
    [9.93699, -84.10933],
    [9.93718, -84.10928],
    [9.93752, -84.10919],
    [9.93802, -84.10908],
    [9.93813, -84.10904],
    [9.93821, -84.10902],
    [9.93823, -84.109],
    [9.9382333, -80.1090036]
  ];


  var carrerasInfo = [
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

  ];





  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

 
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
            <h1 style={{ fontWeight: 'bold', fontSize: '4em' }}>Carreras</h1>
            <div className="Carreras">

            {carrerasInfo.map(carrera => (
              <div key={carrera.ID} className='carrera_post'>
               
                <h2>{carrera.Nombre}</h2>
                <p><span style={{fontWeight: 'bold'}}>Fecha: </span>: {carrera.Fecha}</p>
                <p><span style={{fontWeight: 'bold'}}>Tipo de Actividad: </span>{carrera.TipoActividad}</p>
                <p><span style={{fontWeight: 'bold'}}>Categorías Disponibles: </span> {carrera.Categorías.join(', ')}</p>
                <p><span style={{fontWeight: 'bold'}}>Costo: </span> {carrera.Costo}</p>
                <p><span style={{fontWeight: 'bold'}}>Cuentas Bancarias: </span> {carrera.CuentaBancaria.join(', ')}</p>
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
