import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';


import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-gpx';
import ico from "../Images/Ico.jpg"

function User_view() {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comment, setComment] = useState();
  const navigate = useNavigate();


  var [user_info, setUserInfo] = useState([]);
  var [postInfo, setpostInfo] = useState([]);

  var carrera1 = [
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
    [9.9382333, -84.1090036]
  ];
  var carrera2 = [
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

  var GabrielPrueba = [
    [9.853204562251898, -83.91353428030014],
    [9.853062916091124, -83.91364442893219],
    [9.853116414590112, -83.91372137048116],
    [9.853182176508781, -83.91370236455062],
    [9.85327034788525, -83.91364999140808],
    [9.853360005559834, -83.91358251357721],
    [9.853439229538152, -83.91355457303827],
    [9.853555231040257, -83.91356287275887],
    [9.85365489702368, -83.91354098744172],
    [9.853747429574195, -83.91349642952916],
    [9.85385060002916, -83.91347817094862],
    [9.853936334999204, -83.91344195394335],
    [9.85402230649487, -83.91341128607966],
    [9.854094236217515, -83.91339706361653],
    [9.854148588314269, -83.91338945042597],
    [9.85421486372991, -83.91339664363286],
    [9.854284269203795, -83.91339454108054],
    [9.854377087483732, -83.9133399069952],
    [9.854467953879533, -83.91338394492857],
    [9.854531199639649, -83.9134645934645],
    [9.85457094916179, -83.91356480596222],
    [9.854604219892929, -83.91365175040751],
    [9.854615862085481, -83.91375178388274],
    [9.854672768969369, -83.91391518316784],
    [9.854731152816242, -83.91409692905845],
    [9.854778724809087, -83.91420654192764],
    [9.854851612567288, -83.91426131192122],
    [9.854928656238524, -83.9142658349038],
    [9.855008419439006, -83.91425055893336],
    [9.8550750156755, -83.91426194054823],
    [9.85514523900165, -83.91423334782336],
    [9.855242540160969, -83.91423250436277],
    [9.855356653299792, -83.91422073583018],
    [9.85544712188098, -83.91419904607673],
    [9.85552640767027, -83.91418843956],
    [9.85561560470659, -83.91418398684239],
    [9.85570062406568, -83.91415657793681],
    [9.855782542919657, -83.9141456879692],
    [9.855859016238078, -83.91412212371668],
    [9.855909623135108, -83.91411549579526],
    [9.855990688912097, -83.91409526505238],
    [9.856072513711945, -83.91406833067175],
    [9.856163050865012, -83.91404399302834],
    [9.856252795614587, -83.9140073556411],
    [9.856348340924878, -83.9139941660207],
    [9.856438353488926, -83.91395479285649],
    [9.856517617661396, -83.91393409930966],
    [9.8565995011256, -83.9139058239644],
    [9.856661965287431, -83.91387619020898],
    [9.856729369697657, -83.91384191967137],
    [9.856785639572086, -83.91380661952387],
    [9.856859729299076, -83.9138044828349],
    [9.85692455120391, -83.9138700009747],
    [9.856932611459282, -83.91395182499781],
    [9.85694348322585, -83.91402955108413],
    [9.85694133353911, -83.91410949684412],
    [9.85693595031833, -83.9142053281842],
    [9.8569569317574, -83.91428838096633],
    [9.8569593233021, -83.91438429440525],
    [9.856979280007481, -83.91446425389806],
    [9.856999949349515, -83.91455878966248],
    [9.856991694806004, -83.91463997312802],
    [9.857001598472902, -83.91471439112291],
    [9.857013196747822, -83.9147902147657],
    [9.857024956454284, -83.91486980073138],
    [9.85704613721259, -83.9149516183025],
    [9.857077798338064, -83.91502608043005],
    [9.857098236515952, -83.91510061951969],
    [9.857105796668076, -83.91517991956779],
    [9.857107235507616, -83.91526346743294],
    [9.857101726371246, -83.91529472956448],
    [9.857093436556555, -83.91536048392601]
];


  
  

  const [comentarios, setComentarios] = useState([
    { usuario: 'Usuario1', texto: 'Hola' },
    { usuario: 'Usuario2', texto: 'Buenísimo' },
    { usuario: 'Usuario3', texto: 'Que duro Yerry' },
  ]);
  


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    cedula: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    email: '',
    phone: '',
  });

  //Variable para controlar la información del usuario

  



  //Input Handler for payment info
  const handleInputChange = (event) => {
    const { value } = event.target;
    setComment(value);
  };
  
//Subir el comentario a la DB
  const handlePublishComment =()=>{
   
    const nuevoComentario = {
      usuario: user_info[0].Usuario,
      texto: comment,
    };
    setComentarios([...comentarios, nuevoComentario]);
    setComment('');
    console.log(comentarios);
  };


  //Función para manejar la búsqueda de usuarios
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Realizar busqueda de usuario');
    console.log('El usuario iniciado es:');
    console.log(Cookies.get('userInfo'));
  };

  const handleComments = (postID) => {
    console.log("COMENTARIOS");
    console.log(postID);
    setShowCommentModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleAddActividad =()=>{
    navigate('/StraviaTec/Agregar_Actividad');
  }

  //Closing the modal
  const handleModalClose = () => {
    setShowCommentModal(false);
    document.body.style.overflow = 'auto';
  };


  //asignar a user_info lo que devuelve el api del usuario luego de realizar un login
  user_info = [{
    Usuario: "usuario123",
    Contrasena: "contraseña123",
    Nombre1: "Pedro",
    Nombre2: null,
    Apellido1: "Perico",
    Apellido2: "Cárdenas",
    Nacimiento: "1990-05-15",
    Foto_nombre: "perfil.jpg",
    Datos_Archivo: "",
    ID_Amigo: "amigo456",
    ID_Nacionalidad: 1
  }];

  //--------------------------------------------------------------------------------
  postInfo = [
    {
      ID: 1,
      Amigo: "Sancho",
      Apellido: "Panza",
      Duracion: "02:30:00",
      Hora: "14:00:00",
      Fecha: "2023-11-16",
      Kilometros: 10,
      Mapa_Nombre: "Ruta 1",
      Datos_Archivo: "",
      TipoActividad: "Ciclismo",
      Ruta: GabrielPrueba
    },
    {
      ID: 2,
      Amigo: "Rocinante",
      Apellido: "Montoya",
      Duracion: "01:45:00",
      Hora: "08:30:00",
      Fecha: "2023-11-17",
      Kilometros: 5,
      Mapa_Nombre: "Ruta 2",
      Datos_Archivo: "",
      TipoActividad: "Running",
      Ruta: carrera2
    }
  ];




  return (
    <div className='container'>

      <nav className="navbar navbar-fluid  navbar-dark justify-content-between navbarr">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src={ico} width="50" height="50" alt="" style={{ marginRight: "20px" }} />
            StraviaTec
          </a>

          <form>
            <div className="row">
              <div className="col">
                <input className="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Search" />
              </div>
              <div className="col">
                <button className="btn btn-outline-light my-2 my-sm-0" onClick={handleSubmit}>Buscar</button>
              </div>

            </div>

          </form>

          <ul className="navbar-nav ml-auto d-flex">
            
            <li className="nav-item">
              <Link className="nav-link" to="/Prueba_Api">
                API
              </Link>
            </li>

          </ul>
          
          <ul className="navbar-nav ml-auto d-flex">
            <li className="nav-item">
              <Link className="nav-link" to="/StraviaTec/Retos">
                Retos
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto d-flex">
            <li className="nav-item">
              <Link className="nav-link" to="/StraviaTec/Carreras">
                Carreras
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




      <div className="row">

        <div className="col-md-4">
          {/* Columna de información del usuario */}
          <div className="p-3 userinfo">

            {user_info.map(usuario => (
              <div key={usuario.Usuario} className='user'>
                <h2>{usuario.Nombre1} {usuario.Nombre2} {usuario.Apellido1}</h2>
                <p>{usuario.Usuario}</p>

                <button className="btn btn-outline-dark my-2" style={{ fontWeight: 'bold' }} onClick={handleAddActividad}>
            Registrar Actividad
          </button>

              </div>
            ))}

          </div>
        </div>


        <div className="col-md-8">
          <div className="p-3">
            {postInfo.map(post => (
              <div key={post.ID} className='post'>
                <h2>{post.Amigo} {post.Apellido}</h2>
                <p>
                  <span>Fecha: {post.Fecha}</span>
                  <span style={{ marginLeft: '30px' }}>Hora: {post.Hora}</span>
                  <span style={{ marginLeft: '30px' }}>Duración: {post.Duracion}</span>
                </p>

                <p>
                  <span>Kilómetros: {post.Kilometros}</span>
                  <span style={{ marginLeft: '30px' }}>Tipo de Actividad: {post.TipoActividad}</span>
                </p>


                {/* Agregar la ruta gpx */}
                <div>
                  <MapContainer center={post.Ruta[0]} zoom={13} style={{ height: '200px' }} scrollWheelZoom={true}>
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Polyline pathOptions={{ fillColor: 'red', color: 'blue' }}
                      positions={post.Ruta} />
                  </MapContainer>
                </div>
                <button className="btn comment_button" onClick={handleComments}>Comentarios</button>

              </div>
            ))}
          </div>
        </div>


      </div>










      {/* Modal Bootstrap */}




      <div
        className="modal"
        
        style={{ display: showCommentModal ? 'block' : 'none' }}
      >
        <div className="overlay">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content align_center">
              <div className="modal-header">
                <h5 className="modal-title">Comentarios</h5>
             
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClose}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {comentarios.map((comentario, index) => (
                  <div key={index}>
                    <p>{comentario.usuario}: {comentario.texto}</p>
                    {/* Puedes agregar aquí cualquier otra lógica o elementos que desees para cada comentario */}
                  </div>
                ))}
              </div>

              <div className="modal-footer">

               
                  <input
                    id="comment"
                    name="comment"
                    value={comment}
                    onChange={handleInputChange}
                  />
              
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={handlePublishComment}
                >
                  Comentar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>



    </div>
  );

}

export default User_view;
