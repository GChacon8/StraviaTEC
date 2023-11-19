import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/Styles.css';
import Cookies from 'js-cookie';
import ico from "../Images/Ico.jpg"

function Add_Retos() {
  const navigate = useNavigate();
  const [showCreateRetoModal, setCreateRetoModal] = useState(false);
  const [showUpdateRetoModal, setUpdateRetoModal] = useState(false);
  const [selectedReto, setSelectedReto] = useState(null);
  const [newReto, setNewReto] = useState({
    Nombre: '',
    Fecha: '',
    TipoActividad: '',
    Descripcion: '',
    esRetoDeFondo: false,
    esRetoDeAltitud: false,
    esPrivado: false,
    gruposPermitidos: '',
    listaPatrocinadores: '',
  });


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

  var RetosInfo = [
    {
      ID: 1,
      Nombre: "Reto de Distancia",
      Fecha: "2023-11-16",
      TipoActividad: "Ciclismo",
      Descripcion: "Correr 20k en 2 días",
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
  ];




  const handleCreateReto = () => {
    setCreateRetoModal(true);
    console.log(showCreateRetoModal);
    document.body.style.overflow = 'hidden';
  };




  const handleUpdateReto = (reto) => {
    setSelectedReto(reto);
    console.log('el reto es')
    console.log(selectedReto);
    setUpdateRetoModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleModalClose = () => {
    setCreateRetoModal(false);
    setUpdateRetoModal(false);
    document.body.style.overflow = 'auto';
  };
  const handleDeleteReto = (ID) => {
    //Eliminar reto de la base
    console.log(ID);
  };

  const handleSaveChanges = () => {
    // Llamar al api y hacer el update
    //  'selectedReto' tiene los datos modificados

    // Después cerrar el modal
    handleModalClose();
  };

  //Crear nuevo reto
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar acciones con la variable newReto, como enviarla a un servidor o realizar alguna lógica.
    console.log(newReto);
    setNewReto({
      Nombre: '',
      Fecha: '',
      TipoActividad: '',
      Descripcion: '',
    });
    handleModalClose();
  };


  const handleInputChange = (field, value) => {
    setSelectedReto((prevReto) => ({
      ...prevReto,
      [field]: value,
    }));
  };

  const handleInputChange2 = (e) => {
    const { name, value, type, checked } = e.target;

  if (type === 'checkbox' && (name === 'esRetoDeFondo' || name === 'esRetoDeAltitud')) {
    setNewReto((prevReto) => ({
      ...prevReto,
      esRetoDeFondo: name === 'esRetoDeFondo' ? checked : false,
      esRetoDeAltitud: name === 'esRetoDeAltitud' ? checked : false,
    }));
  } else {
    setNewReto((prevReto) => ({
      ...prevReto,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }
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
          <ul className="navbar-nav ml-auto d-flex">

            <li className="nav-item">
              <Link className="nav-link" to="/StraviaTec/Admin_view">
                Organizador
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
            <button className="btn btn-outline-dark my-2" style={{ fontWeight: 'bold', marginRight: '20px' }} onClick={() => handleUpdateReto(reto)}>
              Modificar
            </button>
            <button className="btn btn-danger my-2" style={{ fontWeight: 'bold' }} onClick={() => handleDeleteReto(reto.ID)}>
              Eliminar
            </button>
          </div>
        ))}

        <button className="btn btn-outline-dark my-2" style={{ fontWeight: 'bold' }} onClick={handleCreateReto}>
          Agregar Reto
        </button>
      </div>



      {/* Modal para agregar retos */}
      <div
        className="modal"
        style={{ display: showCreateRetoModal ? 'block' : 'none' }}
      >
        <div className="overlay">
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
          >
            <div className="modal-content align_center">
              <div className="modal-header">
                <h5 className="modal-title">Agregar Reto</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleModalClose}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <label>
                    Nombre:
                    <input
                      type="text"
                      name="Nombre"
                      style={{ marginBottom: '20px', marginLeft: '20px' }}
                      value={newReto.Nombre}
                      onChange={handleInputChange2}
                    />
                  </label>
                  <br />
                  <label>
                    Fecha:
                    <input
                      type="text"
                      name="Fecha"
                      style={{ marginBottom: '20px', marginLeft: '20px' }}
                      value={newReto.Fecha}
                      onChange={handleInputChange2}
                    />
                  </label>
                  <br />
                  <label>
                    Tipo de Actividad:
                    <input
                      type="text"
                      name="TipoActividad"
                      style={{ marginBottom: '20px', marginLeft: '20px' }}
                      value={newReto.TipoActividad}
                      onChange={handleInputChange2}
                    />
                  </label>
                  <br />
                  <label>
                    Descripcion:
                    <input
                      type="text"
                      name="Descripcion"
                      style={{ marginBottom: '20px', marginLeft: '20px' }}
                      value={newReto.Descripcion}
                      onChange={handleInputChange2}
                    />
                  </label>
                  <br />
                  <label>
                    Reto de Fondo:
                    <input
                      type="checkbox"
                      name="esRetoDeFondo"
                      checked={newReto.esRetoDeFondo}
                      onChange={handleInputChange2}
                    />
                  </label>
                  <br />
                  <label>
                    Reto de Altitud:
                    <input
                      type="checkbox"
                      name="esRetoDeAltitud"
                      checked={newReto.esRetoDeAltitud}
                      onChange={handleInputChange2}
                    />
                  </label>
                  <br />
                  <label>
                    Privado:
                    <input
                      type="checkbox"
                      name="esPrivado"
                      checked={newReto.esPrivado}
                      onChange={handleInputChange2}
                    />
                  </label>
                  {newReto.esPrivado && (
                    <>
                      <br />
                      <label>
                        Grupos Permitidos:
                        <select
                          name="gruposPermitidos"
                          value={newReto.gruposPermitidos}
                          onChange={handleInputChange2}
                        >
                          <option value="grupo1">Grupo 1</option>
                          <option value="grupo2">Grupo 2</option>
                          {/* Agrega más opciones según tus necesidades */}
                        </select>
                      </label>
                    </>
                  )}
                  <br />
                  <label>
                    Lista de Patrocinadores:
                    <textarea
                      name="listaPatrocinadores"
                      style={{ marginLeft: '20px' }}
                      value={newReto.listaPatrocinadores}
                      onChange={handleInputChange2}
                    />
                  </label>
                  <br />
                  <button
                    className="btn btn-outline-dark my-2"
                    style={{ fontWeight: 'bold' }}
                    type="submit"
                  >
                    Guardar Cambios
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>












      {/*Modal Sobre la actualización de los retos*/}
      <div
        className="modal"
        style={{ display: showUpdateRetoModal ? 'block' : 'none' }}
      >
        <div className="overlay">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content align_center">
              <div className="modal-header">
                <h5 className="modal-title">Modificar Reto</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleModalClose}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {selectedReto && (
                  <>
                    <div>
                      <label htmlFor="nombre">Nombre:</label>
                      <input
                        type="text"
                        id="nombre"
                        style={{ marginBottom: '20px', marginLeft: '20px' }}
                        value={selectedReto.Nombre}
                        onChange={(e) =>
                          handleInputChange('Nombre', e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label htmlFor="fecha">Fecha:</label>
                      <input
                        type="text"
                        id="fecha"
                        style={{ marginBottom: '20px', marginLeft: '20px' }}
                        value={selectedReto.Fecha}
                        onChange={(e) =>
                          handleInputChange('Fecha', e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="tipoActividad">Tipo de Actividad:</label>
                      <input
                        type="text"
                        id="tipoActividad"
                        style={{ marginBottom: '20px', marginLeft: '20px' }}
                        value={selectedReto.TipoActividad}
                        onChange={(e) =>
                          handleInputChange('TipoActividad', e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="descripcion">Descripción:</label>
                      <input
                        type="text"
                        id="descripcion"
                        style={{ marginBottom: '20px', marginLeft: '20px' }}
                        value={selectedReto.Descripcion}
                        onChange={(e) =>
                          handleInputChange('Descripcion', e.target.value)
                        }
                      />
                    </div>

                    <button
                      className="btn btn-outline-dark my-2"
                      style={{ fontWeight: 'bold' }}
                      onClick={handleSaveChanges}
                    >
                      Guardar Cambios
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>





    </div>
  );
}

export default Add_Retos;
