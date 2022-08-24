import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import Login from "../Login/Login";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  




  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light fixed-top shadow-sm"
        id="mainNav"
      >
        <div className="container px-5">
          <a className="navbar-brand fw-bold" href="/landing">
            LineUp
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i className="bi-list"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto me-4 my-3 my-lg-0">
              <li className="nav-item">
                <a className="nav-link me-lg-3" href="/slots">
                  Book Appointment
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link me-lg-3" href="/">
                  Confirm Appointment
                </a>
              </li>
            </ul>
    
                <NavLink to={"/"}>
                  <button
                    className="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0"
                    data-bs-toggle="modal"
                    data-bs-target="#feedbackModal"
                    style={{ fontFamily: "inherit" }}
                  >
                    <span className="d-flex align-items-center">
                      {/* <i className="bi-chat-text-fill me-2"></i> */}
                      <span className="small">Logout</span>
                    </span>
                  </button>
                </NavLink>
                :
                <NavLink to={"/login"}>
                  <button
                    className="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0"
                    data-bs-toggle="modal"
                    data-bs-target="#feedbackModal"
                    style={{ fontFamily: "inherit" }}
                  >
                    <span className="d-flex align-items-center">
                      {/* <i className="bi-chat-text-fill me-2"></i> */}
                      <span className="small">Login</span>
                    </span>
                  </button>
                </NavLink>
            
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
