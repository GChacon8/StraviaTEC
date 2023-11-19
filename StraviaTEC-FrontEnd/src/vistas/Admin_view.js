import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/Styles.css';



function Admin_view() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [nationality, setNationality] = useState('');
  const [photo, setPhoto] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Calcula la edad tomando en cuenta la fecha de nacimiento
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  // Función para manejar el envío del formulario
  const handleCreateUser = (event) => {
    event.preventDefault();
    console.log('creación del usuarioooooo');

    // Calcula la edad
    const age = calculateAge(birthDate);
    console.log(age);

   navigate('/');
  };

  const handleBack=()=>{
    navigate('/');
  };

  return (
    <div className="create-user">
      <h2 className="text-center">ADMIN VIEWWWW</h2>
      <form onSubmit={handleCreateUser} className="row">
        <div className="col-12">
          <label htmlFor="firstName" className="form-label">Nombre:</label>
          <input
            type="text"
            id="firstName"
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="lastName" className="form-label">Apellidos:</label>
          <input
            type="text"
            id="lastName"
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="birthDate" className="form-label">Fecha de Nacimiento:</label>
          <input
            type="date"
            id="birthDate"
            className="form-control"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="nationality" className="form-label">Nacionalidad:</label>
          <input
            type="text"
            id="nationality"
            className="form-control"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            required
          />
        </div>

        <div className="col-12">
          <label htmlFor="username" className="form-label">Usuario:</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="password" className="form-label">Contraseña:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="photo" className="form-label">Foto:</label>
          <input
            type="file"
            id="photo"
            className="form-control"
            style={{ marginBottom: '20px' }}
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            required
          />
        </div>
        <div className="col-12">
          <button className="btn btn-outline-dark my-2" style={{ fontWeight: 'bold' }} onClick={handleCreateUser}>
            Crear Usuario
          </button>
          <button className="btn btn-outline-dark my-2" style={{ fontWeight: 'bold', marginLeft:'20px' }} onClick={handleBack}>
            Volver
          </button>
        </div>
      </form>
    </div>
  );
}
export default Admin_view;