import React from "react";
import Navbar from "../../Navbar/Navbar";
import { NavLink } from "react-router-dom";
import dept from "../img/dept.png";

const Dept1 = () => {
  return (
    <>
      <Navbar />
      <h2 className="text-center">Our Doctors</h2>
      <div className="container mx-5 my-5">
        <div
          className="row"
          style={{
            display: "flex",
            "justify-content": "space-around",
            "margin-top": "65px",
          }}
        >
          <div
            className="card col-sm-12 col-md-6 col-lg-4 my-3"
            style={{ width: "18rem", height: "15rem" }}
          >
            {/* <img src="..." className="card-img" /> */}
            <div className="card-body">
              <h5 className="card-title">Dr.Satish Roy</h5>
              <p className="card-text">
                Dermatologist
                <br />
                20 years Experience
              </p>
              <NavLink to="/doc1" className="btn btn-primary">
                Book Appointment
              </NavLink>
            </div>
          </div>

          <div
            className="card col-sm-12 col-md-6 col-lg-4 my-3"
            style={{ width: "18rem", height: "15rem" }}
          >
            {/* <img src="..." className="card-img" /> */}
            <div className="card-body">
              <h5 className="card-title">Dr. Isha</h5>
              <p className="card-text">
                Dermatologist
                <br />
                15 years Experience
              </p>
              <a href="#" className="btn btn-primary">
                Book Appointment
              </a>
            </div>
          </div>

          <div
            className="card col-sm-12 col-md-6 col-lg-4 my-3"
            style={{ width: "18rem", height: "15rem" }}
          >
            {/* <img src="..." className="card-img" /> */}
            <div className="card-body">
              <h5 className="card-title"> Dr.George</h5>
              <p className="card-text">
                Dermatologist
                <br />7 years Experience
              </p>
              <a href="#" className="btn btn-primary">
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dept1;
