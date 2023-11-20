import React, { useState , useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/Styles.css'; 
import Cookies from 'js-cookie';
import ico from "../Images/Ico.jpg"
import axios from 'axios';


function UserProfile() {
    const [showModifyModal, setModifyModal] = useState(false);
    const [modifiedUserInfo, setModifiedUserInfo] = useState({}); // Estado para almacenar los valores modificados

    var user_info = [];
  
  console.log(Cookies.get().userInfo);

  const [result, setResult] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7170/api/Deportista')
      .then(response => {
         setResult(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  for (let i = 0; i < result.length; i++) {
    if (result[i].usuario === Cookies.get().userInfo) {
      const datos = {
        Usuario: result[i].usuario,
        Contrasena: result[i].contrasena,
        Nombre1: result[i].nombre1,
        Nombre2: result[i].nombre2,
        Apellido1: result[i].apellido1,
        Apellido2: result[i].apellido2,
        Nacimiento: result[i].nacimiento,
        Foto_nombre: result[i].foto,
        Datos_Archivo: "",
        ID_Amigo: "amigo456",
        ID_Nacionalidad: result[i].iD_Nacionalidad
      }
      user_info.push(datos);
    }
   }

    const handleUpdateAccount = () => {
        
    };

    const handleModalClose = () => {
        setModifyModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setModifiedUserInfo((prev) => ({ ...prev, [name]: value }));
    };

    //modificar al usuario, llamar al api aquí
    const handleSaveChanges = () => {
        console.log('Changes saved:', modifiedUserInfo);
        setModifyModal(false);
    };

    const handleDeleteAccount = () => {
        console.log('delete this account:');
        console.log(Cookies.get('userInfo'));
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
  </div>
</nav>
            <div className='perfil'>
                <h2>Perfil de Usuario</h2>
                <p><span style={{ fontWeight: 'bold' }}>Nombre: </span>{user_info[0].Nombre1 + " " + user_info[0].Nombre2}</p>
                <p><span style={{ fontWeight: 'bold' }}>Apellido: </span>{user_info[0].Apellido1 + " " + user_info[0].Apellido2}</p>
                <p><span style={{ fontWeight: 'bold' }}>Contraseña: </span> {user_info[0].Contrasena}</p>
                <p>
                    <button className="btn btn-outline-dark my-2" style={{ fontWeight: 'bold' }} onClick={handleUpdateAccount}>
                        Modificar Cuenta
                    </button>
                    <button className="btn btn-danger my-2" style={{ fontWeight: 'bold' }} onClick={handleDeleteAccount}>
                        Eliminar Cuenta
                    </button>
                </p>
            </div>

            {/* Modal de Modificación de Cuenta */}
            {showModifyModal && (
                <div className="modal" style={{ display: showModifyModal ? 'block' : 'none' }}>
                    <div className="overlay">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content align_center">
                                <div className="modal-header">
                                    <h5 className="modal-title">Modificar cuenta</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClose}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className = 'bordes'>
                                        <label htmlFor="modifiedName">Nombre: </label>
                                        <input style={{marginLeft:'20px'}} type="text" id="modifiedName" name="name" value={modifiedUserInfo.name || ''} onChange={handleInputChange} />
                                    </div>

                                    <div className='bordes'>
                                        <label htmlFor="modifiedLastName">Apellido:</label>
                                        <input style={{marginLeft:'20px'}} type="text" id="modifiedLastName" name="lastName" value={modifiedUserInfo.lastName || ''} onChange={handleInputChange} />
                                    </div>

                                    <div className='bordes'>
                                        <label htmlFor="modifiedEmail">Correo Electrónico:</label>
                                        <input style={{marginLeft:'20px'}}  type="text" id="modifiedEmail" name="email" value={modifiedUserInfo.email || ''} onChange={handleInputChange} />
                                    </div>

                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-primary" onClick={handleSaveChanges}>Guardar Cambios</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserProfile;
