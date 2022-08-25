import React from 'react';
import Navbar from '../Navbar/Navbar';
import { NavLink } from 'react-router-dom';

const Doc1 = () => {
  return (
    <>
    <Navbar />
    <div className="mx-3 my-3" style={{
        // display: "flex",
        // "align-content": "stretch",
        // "justify-content": "space-evenly"
    }}>
        <div className="card DeptCard" style={{ width: "40rem", height: "29rem", "margin-top": "82px"}}>
            <img src="..." className="card-img" style={{height: "9rem"}}/>
            <div className="card-body">
                <h5 className="card-title">Doctor 1</h5>    
                <p className="card-text">make up the bulk of the card's content.</p>
                <NavLink to="/login" className="btn btn-primary">Book Appointment</NavLink>
            </div>
        </div>
    </div>
</>
  )
}

export default Doc1