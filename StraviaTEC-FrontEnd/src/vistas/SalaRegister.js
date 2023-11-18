import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function SucursalRegister() {
    const [identificador, setIdentificador] = useState('');
    const [cantidadFilas, setCantidadFilas] = useState('');
    const [cantidadColumnas, setCantidadColumnas] = useState('');

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'identificador') {
            setIdentificador(value);
        } else if (name === 'cantidadFilas') {
            setCantidadFilas(value);
        } else if (name === 'cantidadColumnas') {
            setCantidadColumnas(value);
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
            <h1>Agregar Salas</h1>

            <div class="input-group mb-3" style={{ justifyContent: 'center' }}>
                <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01"> Sucursal:
                    </label>
                </div>
                <select class="custom-select" id="inputGroupSelect01">
                    <option selected>El chino 1</option>
                    <option value="1">El chino 2</option>
                    <option value="2">El chino 3</option>
                    <option value="3">El chino 4</option>
                </select>
            </div>

            <div>
                <label htmlFor="identificador">Identificador:</label>
                <input
                    type="text"
                    id="identificador"
                    name="identificador"
                    value={identificador}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="cantidadFilas">Cantidad de Filas:</label>
                <input
                    type="text"
                    id="cantidadFilas"
                    name="cantidadFilas"
                    value={cantidadFilas}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="cantidadColumnas">Cantidad de Columnas:</label>
                <input
                    type="text"
                    id="cantidadColumnas"
                    name="cantidadColumnas"
                    value={cantidadColumnas}
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

