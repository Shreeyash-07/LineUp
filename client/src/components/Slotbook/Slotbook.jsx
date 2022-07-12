import React from 'react'
// import { render } from 'react-router-dom';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.css';
import useFetch from '../../Hooks/useFetch';
import { fontSize } from '@mui/system';
import { useEffect } from 'react';

const Slotbook = () => {
  const { value, setValue } = useState([new Date()]);
  const { data, loading, error } = useFetch("/getslots");
  const [state, setState] = useState(data);
  const [isfull, setisfull] = useState([0]);
  const [isDisabled, setisDisabled] = useState(['true']);
  console.log(data)
  const onChange = (value) => {
    console.log(value)
    window.alert(value)
  }
  const slotBook = (e) => {
    e.preventDefault();
    console.log(e.target.getAttribute("value"));
    console.log(e.target.getAttribute("isfull"));
    var val = e.target.getAttribute("isfull");
    if (val==='false'){
      document.getElementById("bookButton").disabled = true;  
    }
  };
  const disabaled = (e) =>{
    console.log(e.target.getAttribute("isfull"));
    return false
  }
  return (
    <div className='container'>
    <h1>Calender</h1>
    <Calendar onChange={onChange} value={setValue} 
    />
    <div>
    <div className="container">
  <div className="row">
    <div className="col">
<ul className="list-group">
  
      {data.map((element,index)=>(
        <li className="list-group-item d-flex justify-content-between align-items-center"
         key={index}>
          {element.time}
            <button 
            id="bookButton"
            isfull = {element.isFull.toString()}
            className='.col-md-6 .col-md-6'
             key={index}
             value={element.time}
             onClick={slotBook}
             disabled={!element.isFull}
             >
            {element.isFull? "true":"false"}
          </button>
        </li>
      )) }
  </ul>
  </div>
  </div>
    </div>
    </div>
    
    </div>
  );
}


export default Slotbook