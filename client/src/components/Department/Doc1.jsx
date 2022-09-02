import React from "react";
import Navbar from "../Navbar/Navbar";
import { NavLink } from "react-router-dom";

const Doc1 = () => {
  return (
    <>
      <Navbar />
      <div
        className="mx-3 my-3"
        style={
          {
            // display: "flex",
            // "align-content": "stretch",
            // "justify-content": "space-evenly"
          }
        }
      >
        <div
          className="card DeptCard m-auto"
          style={{ width: "40rem", height: "29rem", "margin-top": "82px" }}
        >
          {/* <img src="..." className="card-img" style={{ height: "9rem" }} /> */}
          <div className="card-body justify-content-center m-auto">
            <h5 className="card-title">Dr.Satish Roy</h5>
            <p className="card-text">
              Dermatologist <br />
              20 years Experience <br />
              341 consults Appointment
            </p>
            <NavLink to="/slots" className="btn btn-primary">
              Book Appointment
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Doc1;
