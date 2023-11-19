import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './Css/Main.css';  
import './Css/Styles.css';

import Login_view from './vistas/Login';
import CreateUser_view from './vistas/Create_user';
import User_view from './vistas/User_view';
import Prueba_Api from './vistas/Prueba_Api';
import Carrera_view from './vistas/Carrera';
import Reto_view from './vistas/Reto';
import AddActividad_view from './vistas/AddActividad';
import Admin_view from './vistas/Admin_view';




function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={< Login_view/>} />
          <Route path="/Create_user" element={<CreateUser_view />} />
          <Route path="/StraviaTec" element={<User_view />} />
          <Route path="/StraviaTec/Carreras" element={<Carrera_view />} />
          <Route path="/StraviaTec/Retos" element={<Reto_view />} />
          <Route path="/StraviaTec/Agregar_Actividad" element={<AddActividad_view />} />
          <Route path="/StraviaTec/Admin_view" element={<Admin_view />} />
          <Route path="/Prueba_Api" element={<Prueba_Api />} />

                   
        

         

         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
