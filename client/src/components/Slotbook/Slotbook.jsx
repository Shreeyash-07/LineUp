import React from 'react'
// import { render } from 'react-router-dom';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.css'

const Slotbook = () => {
    const { value, setValue } = useState([new Date()]);
    const onChange = () => {
        console.log(value)
        window.alert(value)
    }
    const listAvailabeslots = (value) =>{
      return <li>kyun work nahi ho raha ye</li>
    }   
    
  return (
    <div>
        <h1>Calender</h1>
        <Calendar onChange={onChange} value={setValue} />
        <div class='container'>
          <ul>
          <li>slot 1</li>
          <li>slot 2</li>
          <li>slot 3</li>
          <li><a href="#home">hello<i className="uil uil-qrcode-scan tab_icon"></i></a></li>
          <li>slot 4</li>
          </ul>
        </div>
    </div>
  )
}

export default Slotbook