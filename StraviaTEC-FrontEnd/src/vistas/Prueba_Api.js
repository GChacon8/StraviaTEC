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
        const response = await axios.get('https://localhost:7170/api/Reto');

        console.log(response.data[0].id);
        //return(response.data);
    } catch (error) {console.error('Error:', error)}
}

class Prueba_Api extends Component {
    render() {
        return(
            <div className='prueba_api'>
                <h1>StraviaTEC</h1>
                <button className="btn btn-primary .btn-xs" onClick={getNacionalidades}>
                    Get
                </button>
            </div>
        )
    }
}

export default Prueba_Api;