import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';


function MovieRegister() {
  const [nombreOriginal, setNombreOriginal] = useState('');
  const [nombreComercial, setNombreComercial] = useState('');
  const [duracion, setDuracion] = useState('');
  const [protagonistas, setProtagonistas] = useState('');
  const [clasificacion, setClasificacion] = useState('');
  const [director, setDirector] = useState('');
  
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'nombreOriginal') {
      setNombreOriginal(value);
    } else if (name === 'nombreComercial') {
      setNombreComercial(value);
    } else if (name === 'duracion') {
      setDuracion(value);
    } else if (name === 'protagonistas') {
      setProtagonistas(value);
    } else if (name === 'clasificacion') {
      setClasificacion(value);
    } else if (name === 'director') {
      setDirector(value);
    }
  };


//Poner función de agregar a la DB
  const handleButtonClick = () => {
    console.log('Agregué películaaa');
    //AGREGAR MOVIE AL JSON
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
      
      <h1>Agregar Película</h1>

      <div>
        <label htmlFor="nombreOriginal">Nombre Original:</label>
        <input
          type="text"
          id="nombreOriginal"
          name="nombreOriginal"
          value={nombreOriginal}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="nombreComercial">Nombre Comercial:</label>
        <input
          type="text"
          id="nombreComercial"
          name="nombreComercial"
          value={nombreComercial}
          onChange={handleInputChange}
        />
      </div>
      
      <div class="input-group mb-3" style={{justifyContent: 'center'}}>
        <div class="input-group-prepend">
          <span class="input-group-text">Subir Imagen</span>
        </div>
        <div class="custom-file">
          <input type="file" class="custom-file-input" id="inputGroupFile01"></input>
        </div>
      </div>

      
      <div>
        <label htmlFor="duracion">Duración:</label>
        <input
          type="text"
          id="duracion"
          name="duracion"
          value={duracion}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="protagonistas">Protagonistas:</label>
        <input
          type="text"
          id="protagonistas"
          name="protagonistas"
          value={protagonistas}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="director">Director:</label>
        <input
          type="text"
          id="director"
          name="director"
          value={director}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="clasificacion">Clasificación:</label>
        <input
          type="text"
          id="clasificacion"
          name="clasificacion"
          value={clasificacion}
          onChange={handleInputChange}
        />
      </div>
      <button className="btn btn-dark" onClick={handleButtonClick}>
        Agregar Película
      </button>
    </div>
  );
}

export default MovieRegister;
