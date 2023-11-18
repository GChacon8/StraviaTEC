import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

function CheckinView() {
  const [usuario, setUsuario] = useState('');
  const [vueloId, setVueloId] = useState('');
  const [maletas, setMaletas] = useState([{ peso: '', color: '',id: 0}]);

  var selectedSeats = [];
  var numberOfSuitcases = 0;

  //variables que deben ser modificadas por el api
  var seats_reserved = 2;//numero de asientos comprados por el usuarioo
  var reservedSeats = [];
  var seatsAvailable = [];
  //-----------------------------------------

  const navigate = useNavigate();

  //handler of the input spaces
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'usuario') {
      setUsuario(value);
    } else if (name === 'vueloId') {
      setVueloId(value);
    }
  };

  const handleMaleta = (event, index, field) => {
    const updatedMaletas = [...maletas];
    updatedMaletas[index][field] = event.target.value;
    setMaletas(updatedMaletas);
  };

  const handleAddMaleta = () => {
    const newId = maletas.length > 0 ? maletas[maletas.length - 1].id + 1 : 0;
    setMaletas([...maletas, { peso: '', color: '', id: newId }]);
  };
  


  
  const handleButtonClick = () => {
    // Variables para pruebas ESTAS VARIABLES SON LAS QUE DEBE TRAER DE LA DB asientos reservados o libres y así
    console.log(usuario);
    console.log(vueloId);
    reservedSeats = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1'];
    const seatsAvailable = [
      'A2', 'B2', 'C2', 'D2', 'E2', 'F2',
      'A3', 'B3', 'C3', 'D3', 'E3', 'F3',
      'A4', 'B4', 'C4', 'D4', 'E4', 'F4',
      'A5', 'B5', 'C5', 'D5', 'E5', 'F5',
      'A6', 'B6', 'C6', 'D6', 'E6', 'F6',
      'A7', 'B7', 'C7', 'D7', 'E7', 'F7',
      'A8', 'B8', 'C8', 'D8', 'E8', 'F8',
      'A9', 'B9', 'C9', 'D9', 'E9', 'F9'
    ];
    const buttons = document.querySelectorAll('.btn.btn-secondary');

    buttons.forEach((button) => {
      const buttonId = button.id;

      if (reservedSeats.includes(buttonId)) {
        button.style.backgroundColor = 'red';
        document.getElementById(buttonId).disabled = true;
      } else if (seatsAvailable.includes(buttonId)) {
        button.style.backgroundColor = 'green';
      }
    });
  }


  //Función encargada de la selección del asiento, permite al usuario
  //cambiar la elección realizada para luego ser enviada a la DB
  const SelectSeat = (id) => {
    if (seats_reserved > 0) {
      const button = document.getElementById(id);
      button.style.backgroundColor = 'blue';
      seats_reserved = seats_reserved - 1;
      selectedSeats.push(id);

    } else {
      const button0 = document.getElementById(id);
      const button1 = document.getElementById(selectedSeats.shift());
      button0.style.backgroundColor = 'blue';
      button1.style.backgroundColor = 'green';
      selectedSeats.push(id);
    }
    console.log(selectedSeats);
  }

  const CreatePDF = () => {
    //console.log(numberOfSuitcases);
    numberOfSuitcases = maletas.length;
    var price = 0;
    if(numberOfSuitcases > 2){
      price = 50 + (numberOfSuitcases - 2)*75
    }else if(numberOfSuitcases === 2){
        price = 50;
    }
    console.log(price);
    //calculo del precio de las maletas
    if (selectedSeats.length < seats_reserved) {
      console.log("seleccione asientos");
    } else {
      //CREATE PDF CON TODOS LOS DATOS
    }
    console.log(maletas);
  }

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
      <h1>User Check-in</h1>
      <div>
        <label htmlFor="usuario">User:</label>
        <input
          type="text"
          id="usuario"
          name="usuario"
          value={usuario}
          onChange={handleInputChange}
        />
      </div>
      <div className='space'>
        <label htmlFor="vueloId">Flight ID:</label>
        <input
          type="text"
          id="vueloId"
          name="vueloId"
          value={vueloId}
          onChange={handleInputChange}
        />
      </div>




  

      {maletas.map((maleta, index) => (
        <div key={index} className='space'>
          <label htmlFor={`pesoMaleta${index}`}>Suitcase Weight {index + 1}:</label>
          <input
            type="text"
            id={`pesoMaleta${index}`}
            name={`pesoMaleta${index}`}
            value={maleta.peso}
            onChange={(e) => handleMaleta(e, index, 'peso')}
          />
          <label htmlFor={`colorMaleta${index}`}>Suitcase Color {index + 1}:</label>
          <input
            type="text"
            id={`colorMaleta${index}`}
            name={`colorMaleta${index}`}
            value={maleta.color}
            onChange={(e) => handleMaleta(e, index, 'color')}
          />
        </div>
      ))}

      
      


<div>
  <button className="btn btn-dark" onClick={handleAddMaleta}>Add Another Suitcase</button>
      <button className="btn btn-dark button_separation" onClick={handleButtonClick}>Check In</button>
      

</div>

      <div>
        <h1>Available Sits</h1>
      </div>
      <h1 className='smallerfont'>Front</h1>
      <div className="space">
        <div className="btn-toolbar " role="toolbar" aria-label="Toolbar with button groups">
          <div className="btn-group mr-2" role="group" aria-label="First group">
            <button type="button" className="btn btn-secondary" id='A1' onClick={() => SelectSeat('A1')}>A1</button>
            <button type="button" className="btn btn-secondary" id='B1' onClick={() => SelectSeat('B1')}>B1</button>
            <button type="button" className="btn btn-secondary" id='C1' onClick={() => SelectSeat('C1')}>C1</button>
          </div>
          <div className="btn-group mr-2 button_group_space" role="group" aria-label="Second group">
            <button type="button" className="btn btn-secondary" id='D1' onClick={() => SelectSeat('D1')}>D1</button>
            <button type="button" className="btn btn-secondary" id='E1' onClick={() => SelectSeat('E1')}>E1</button>
            <button type="button" className="btn btn-secondary" id='F1' onClick={() => SelectSeat('F1')}>F1</button>
          </div>
        </div>
      </div>


      <div className="space">
        <div className="btn-toolbar " role="toolbar" aria-label="Toolbar with button groups">
          <div className="btn-group mr-2" role="group" aria-label="First group">
            <button type="button" className="btn btn-secondary" id='A2' onClick={() => SelectSeat('A2')}>A2</button>
            <button type="button" className="btn btn-secondary" id='B2' onClick={() => SelectSeat('B2')}>B2</button>
            <button type="button" className="btn btn-secondary" id='C2' onClick={() => SelectSeat('C2')}>C2</button>
          </div>
          <div className="btn-group mr-2 button_group_space" role="group" aria-label="Second group">
            <button type="button" className="btn btn-secondary" id='D2' onClick={() => SelectSeat('D2')}>D2</button>
            <button type="button" className="btn btn-secondary" id='E2' onClick={() => SelectSeat('E2')}>E2</button>
            <button type="button" className="btn btn-secondary" id='F2' onClick={() => SelectSeat('F2')}>F2</button>
          </div>
        </div>
      </div>

      <div className="space">
        <div className="btn-toolbar " role="toolbar" aria-label="Toolbar with button groups">
          <div className="btn-group mr-2" role="group" aria-label="First group">
            <button type="button" className="btn btn-secondary" id='A3' onClick={() => SelectSeat('A3')}>A3</button>
            <button type="button" className="btn btn-secondary" id='B3' onClick={() => SelectSeat('B3')}>B3</button>
            <button type="button" className="btn btn-secondary" id='C3' onClick={() => SelectSeat('C3')}>C3</button>
          </div>
          <div className="btn-group mr-2 button_group_space" role="group" aria-label="Second group">
            <button type="button" className="btn btn-secondary" id='D3' onClick={() => SelectSeat('D3')}>D3</button>
            <button type="button" className="btn btn-secondary" id='E3' onClick={() => SelectSeat('E3')}>E3</button>
            <button type="button" className="btn btn-secondary" id='F3' onClick={() => SelectSeat('F3')}>F3</button>
          </div>
        </div>
      </div>

      <div className="space">
        <div className="btn-toolbar " role="toolbar" aria-label="Toolbar with button groups">
          <div className="btn-group mr-2" role="group" aria-label="First group">
            <button type="button" className="btn btn-secondary" id='A4' onClick={() => SelectSeat('A4')}>A4</button>
            <button type="button" className="btn btn-secondary" id='B4' onClick={() => SelectSeat('B4')}>B4</button>
            <button type="button" className="btn btn-secondary" id='C4' onClick={() => SelectSeat('C4')}>C4</button>
          </div>
          <div className="btn-group mr-2 button_group_space" role="group" aria-label="Second group">
            <button type="button" className="btn btn-secondary" id='D4' onClick={() => SelectSeat('D4')}>D4</button>
            <button type="button" className="btn btn-secondary" id='E4' onClick={() => SelectSeat('E4')}>E4</button>
            <button type="button" className="btn btn-secondary" id='F4' onClick={() => SelectSeat('F4')}>F4</button>
          </div>
        </div>
      </div>

      <div className="space">
        <div className="btn-toolbar " role="toolbar" aria-label="Toolbar with button groups">
          <div className="btn-group mr-2" role="group" aria-label="First group">
            <button type="button" className="btn btn-secondary" id='A5' onClick={() => SelectSeat('A5')}>A5</button>
            <button type="button" className="btn btn-secondary" id='B5' onClick={() => SelectSeat('B5')}>B5</button>
            <button type="button" className="btn btn-secondary" id='C5' onClick={() => SelectSeat('C5')}>C5</button>
          </div>
          <div className="btn-group mr-2 button_group_space" role="group" aria-label="Second group">
            <button type="button" className="btn btn-secondary" id='D5' onClick={() => SelectSeat('D5')}>D5</button>
            <button type="button" className="btn btn-secondary" id='E5' onClick={() => SelectSeat('E5')}>E5</button>
            <button type="button" className="btn btn-secondary" id='F5' onClick={() => SelectSeat('F5')}>F5</button>
          </div>
        </div>
      </div>

      <div className="space">
        <div className="btn-toolbar " role="toolbar" aria-label="Toolbar with button groups">
          <div className="btn-group mr-2" role="group" aria-label="First group">
            <button type="button" className="btn btn-secondary" id='A6' onClick={() => SelectSeat('A6')}>A6</button>
            <button type="button" className="btn btn-secondary" id='B6' onClick={() => SelectSeat('B6')}>B6</button>
            <button type="button" className="btn btn-secondary" id='C6' onClick={() => SelectSeat('C6')}>C6</button>
          </div>
          <div className="btn-group mr-2 button_group_space" role="group" aria-label="Second group">
            <button type="button" className="btn btn-secondary" id='D6' onClick={() => SelectSeat('D6')}>D6</button>
            <button type="button" className="btn btn-secondary" id='E6' onClick={() => SelectSeat('E6')}>E6</button>
            <button type="button" className="btn btn-secondary" id='F6' onClick={() => SelectSeat('F6')}>F6</button>
          </div>
        </div>
      </div>

      <div className="space">
        <div className="btn-toolbar " role="toolbar" aria-label="Toolbar with button groups">
          <div className="btn-group mr-2" role="group" aria-label="First group">
            <button type="button" className="btn btn-secondary" id='A7' onClick={() => SelectSeat('A7')}>A7</button>
            <button type="button" className="btn btn-secondary" id='B7' onClick={() => SelectSeat('B7')}>B7</button>
            <button type="button" className="btn btn-secondary" id='C7' onClick={() => SelectSeat('C7')}>C7</button>
          </div>
          <div className="btn-group mr-2 button_group_space" role="group" aria-label="Second group">
            <button type="button" className="btn btn-secondary" id='D7' onClick={() => SelectSeat('D7')}>D7</button>
            <button type="button" className="btn btn-secondary" id='E7' onClick={() => SelectSeat('E7')}>E7</button>
            <button type="button" className="btn btn-secondary" id='F7' onClick={() => SelectSeat('F7')}>F7</button>
          </div>
        </div>
      </div>

      <div className="space">
        <div className="btn-toolbar " role="toolbar" aria-label="Toolbar with button groups">
          <div className="btn-group mr-2" role="group" aria-label="First group">
            <button type="button" className="btn btn-secondary" id='A8' onClick={() => SelectSeat('A8')}>A8</button>
            <button type="button" className="btn btn-secondary" id='B8' onClick={() => SelectSeat('B8')}>B8</button>
            <button type="button" className="btn btn-secondary" id='C8' onClick={() => SelectSeat('C8')}>C8</button>
          </div>
          <div className="btn-group mr-2 button_group_space" role="group" aria-label="Second group">
            <button type="button" className="btn btn-secondary" id='D8' onClick={() => SelectSeat('D8')}>D8</button>
            <button type="button" className="btn btn-secondary" id='E8' onClick={() => SelectSeat('E8')}>E8</button>
            <button type="button" className="btn btn-secondary" id='F8' onClick={() => SelectSeat('F8')}>F8</button>
          </div>
        </div>
      </div>

      <div className="space">
        <div className="btn-toolbar " role="toolbar" aria-label="Toolbar with button groups">
          <div className="btn-group mr-2" role="group" aria-label="First group">
            <button type="button" className="btn btn-secondary" id='A9' onClick={() => SelectSeat('A9')}>A9</button>
            <button type="button" className="btn btn-secondary" id='B9' onClick={() => SelectSeat('B9')}>B9</button>
            <button type="button" className="btn btn-secondary" id='C9' onClick={() => SelectSeat('C9')}>C9</button>
          </div>
          <div className="btn-group mr-2 button_group_space" role="group" aria-label="Second group">
            <button type="button" className="btn btn-secondary" id='D9' onClick={() => SelectSeat('D9')}>D9</button>
            <button type="button" className="btn btn-secondary" id='E9' onClick={() => SelectSeat('E9')}>E9</button>
            <button type="button" className="btn btn-secondary" id='F9' onClick={() => SelectSeat('F9')}>F9</button>
          </div>
        </div>
      </div>
      <h1 className='smallerfont'>Back</h1>

      <div>

        <button className="btn btn-dark" onClick={CreatePDF}>Print Boarding Pass</button>


      </div>



    </div>
  );
}

export default CheckinView;
