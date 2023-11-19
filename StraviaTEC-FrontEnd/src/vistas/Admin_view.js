import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/Styles.css';
import ico from "../Images/Ico.jpg"
import jsPDF from 'jspdf';



function Admin_view() {
  const [CarreraID, setCarreraID] = useState('');
  const navigate = useNavigate();

  const handleGestionarRetos = () => {
    navigate('/StraviaTec/Admin_view/Retos');
  };


  const handleGestionarCarreras = () => {
    navigate('/StraviaTec/Admin_view/Carreras');
  };

  const handleGestionarGrupos = () => {
    navigate('/StraviaTec/Admin_view/Grupos');
  };

  const handleObtenerReporte1 = () => {
    console.log(CarreraID);
    console.log('Obteniendo reporte 1');
    const pdf = new jsPDF();
    //agregar datos del reporte
    pdf.text(20,20, 'Reporte1');
    pdf.text(30, 30, CarreraID);
    pdf.save();
    setCarreraID('');
  };

  const handleObtenerReporte2 = () => {
    console.log(CarreraID);
    console.log('Obteniendo reporte 2');
    const pdf = new jsPDF();
    //agregar datos del reporte
    pdf.text(20,20, 'Reporte2');
    pdf.text(30, 30, CarreraID);
    pdf.save();
    setCarreraID('');
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

      <div className='login'>
        <button className="btn btn-outline-dark my-2" style={{ fontWeight: 'bold'}} onClick={handleGestionarRetos}>
          Gestionar Retos
        </button>
        <button className="btn btn-outline-dark my-2" style={{ fontWeight: 'bold' }} onClick={handleGestionarCarreras}>
          Gestionar Carreras
        </button>
        <button className="btn btn-outline-dark my-2" style={{ fontWeight: 'bold' }} onClick={handleGestionarGrupos}>
          Gestionar Grupos
        </button>
        <div style={{ marginTop: '20px' }}>

          <input
            type="text"
            placeholder="ID de la Carrera"
            value={CarreraID}
            onChange={(e) => setCarreraID(e.target.value)}
            
          /> </div>
          <button className="btn btn-outline-dark my-2" style={{ fontWeight: 'bold' }} onClick={handleObtenerReporte1}>
            Participantes Por Carrera
          </button>
        
          <button className="btn btn-outline-dark my-2" style={{ fontWeight: 'bold' }} onClick={handleObtenerReporte2}>
            Posiciones por Carrera
          </button>
  
      </div>
    </div>
  );
}

export default Admin_view;