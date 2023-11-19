import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/Styles.css'; 
import Cookies from 'js-cookie';
import ico from "../Images/Ico.jpg"


function UserProfile({ userId }) {
    const [showModifyModal, setModifyModal] = useState(false);
    const [modifiedUserInfo, setModifiedUserInfo] = useState({}); // Estado para almacenar los valores modificados

    const userInfo = {
        id: 123,
        name: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
    };

    const handleUpdateAccount = () => {
        setModifiedUserInfo({ ...userInfo });
        setModifyModal(true);
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
                <p><span style={{ fontWeight: 'bold' }}>Nombre: </span>{userInfo.name}</p>
                <p><span style={{ fontWeight: 'bold' }}>Apellido: </span>{userInfo.lastName}</p>
                <p><span style={{ fontWeight: 'bold' }}>Correo Electrónico: </span> {userInfo.email}</p>
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
