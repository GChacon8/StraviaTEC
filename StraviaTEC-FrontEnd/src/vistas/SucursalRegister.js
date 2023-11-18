import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function SucursalRegister() {
  const [nombreSucursal, setNombreSucursal] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [cantidadSalas, setCantidadSalas] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'nombreSucursal') {
      setNombreSucursal(value);
    } else if (name === 'ubicacion') {
      setUbicacion(value);
    } else if (name === 'cantidadSalas') {
      setCantidadSalas(value);
    }
  };

  // Poner función de agregar a la DB
  const handleButtonClick = () => {
    console.log('Agregué sucursal');
    // AGREGAR SUCURSAL AL JSON (agrega la lógica aquí)

    // Muestra una alerta de éxito
    window.alert('¡Se agregó exitosamente!');
    navigate('/AdminView');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <h1>Agregar Sucursal</h1>

      <div>
        <label htmlFor="nombreSucursal">Nombre Sucursal:</label>
        <input
          type="text"
          id="nombreSucursal"
          name="nombreSucursal"
          value={nombreSucursal}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="ubicacion">Ubicación:</label>
        <input
          type="text"
          id="ubicacion"
          name="ubicacion"
          value={ubicacion}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="cantidadSalas">Cantidad de Salas:</label>
        <input
          type="text"
          id="cantidadSalas"
          name="cantidadSalas"
          value={cantidadSalas}
          onChange={handleInputChange}
        />
      </div>
      <button className="btn btn-dark" onClick={handleButtonClick}>
        Agregar Sucursal
      </button>
    </div>
  );
}

export default SucursalRegister;
