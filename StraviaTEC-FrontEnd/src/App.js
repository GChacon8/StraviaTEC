import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


import './Css/Main.css';  
import './Css/Styles.css';

import Login_view from './vistas/Login';
import User_view from './vistas/User_view';
import Prueba_Api from './vistas/Prueba_Api';


import Create_user from'./vistas/Create_user';
import Admin_view from './vistas/Admin_view';
import Checkin_view from './vistas/Checkin';

import Register_view from './vistas/MovieRegister';
import Sucursal_view from './vistas/SucursalRegister';
import Sala_view from './vistas/SalaRegister';
import Proyection_view from './vistas/ProyectionRegister';


function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<User_view />} />
          <Route path="/Login" element={<Login_view />} />
          <Route path="/StraviaTec" element={<User_view />} />
          <Route path="/Prueba_Api" element={<Prueba_Api />} />

                   
        

          <Route path="/TecAir/Login_Admin" element={<Login_view />} /> 
          <Route path="/Create_user" element={<Create_user />} />
          <Route path="/TecAir/Checkin" element={<Checkin_view />} />
          
          <Route path="/TecAir/Administration" element={<Admin_view />} />

          <Route path="/5" element={<Sala_view />} />
          <Route path="/6" element={<Proyection_view />} />
          <Route path="/7" element={<Admin_view />} />

         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
