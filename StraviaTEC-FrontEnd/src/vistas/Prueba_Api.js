import React, { Component, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/Styles.css'; 
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

let answer;

async function getNacionalidades() {
    try {
        //console.log(apiUrl);
        const response = await axios.get('https://localhost:7170/api/Nacionalidad');

        console.log(response.data);
        //return(response.data);
    } catch (error) {console.error('Error:', error)}
}

function addNacionalidades () {
    const postdata = {
        id: 6,
        nombre: "honduras"
    }
     axios.post('https://localhost:7170/api/Nacionalidad', postdata)
     .then(response => {
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
}

class Prueba_Api extends Component {
    render() {
        return(
            <div className='prueba_api'>
                <h1>StraviaTEC</h1>
                <button className="btn btn-primary .btn-xs" onClick={getNacionalidades}>
                    Get
                </button>
                <button className="btn btn-primary .btn-xs" onClick={addNacionalidades}>
                    Post
                </button>
            </div>
        )
    }
}

export default Prueba_Api;