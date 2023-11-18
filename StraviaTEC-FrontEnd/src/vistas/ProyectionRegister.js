import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function ProyectionRegister() {
    const [hora, setHora] = useState('');
    const [pelicula, setPelicula] = useState('');

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'hora') {
            setHora(value);
        } else if (name === 'pelicula') {
            setPelicula(value);
        }
    };

    // Poner función de agregar a la DB
    const handleButtonClick = () => {
        console.log('Agregué proyección');
        // AGREGAR PROYECCIÓN AL JSON (agrega la lógica aquí)

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
            <h1>Agregar Proyecciones</h1>

            <div class="input-group mb-3" style={{justifyContent: 'center'}}
          >
              <div class="input-group-prepend">
                  <label class="input-group-text" for="inputGroupSelectSucursal">Sucursal:</label>
              </div>
                <select class="custom-select" id="inputGroupSelectSucursal">
                    <option selected>El chino 1</option>
                    <option value="1">El chino 2</option>
                    <option value="2">El chino 3</option>
                    <option value="3">El chino 4</option>
                </select>
                <select class="custom-select" id="inputGroupSelectSala">
                    <option selected>Sala 1</option>
                    <option value="1">Sala 2</option>
                    <option value="2">Sala 3</option>
                    <option value="3">Sala 4</option>
                </select>
            </div>

            <div>
                <label htmlFor="hora">Hora:</label>
                <input
                    type="text"
                    id="hora"
                    name="hora"
                    value={hora}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="pelicula">Película:</label>
                <input
                    type="text"
                    id="pelicula"
                    name="pelicula"
                    value={pelicula}
                    onChange={handleInputChange}
                />
            </div>
            <button className="btn btn-dark" onClick={handleButtonClick}>
                Agregar Proyección
            </button>
        </div>
    );
}

export default ProyectionRegister;
