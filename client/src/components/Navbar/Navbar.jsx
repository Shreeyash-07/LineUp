import React from "react";
import "./Navbar.scss";
import Login from "../Login/Login";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav
        class="navbar navbar-expand-lg navbar-light fixed-top shadow-sm"
        id="mainNav"
      >
        <div class="container px-5">
          <a class="navbar-brand fw-bold" href="#page-top">
            LineUp
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i class="bi-list"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ms-auto me-4 my-3 my-lg-0">
              {/* <li class="nav-item">
                <a class="nav-link me-lg-3" href="#features">
                  Features
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link me-lg-3" href="#download">
                  Download
                </a>
              </li> */}
            </ul>
            <NavLink to={"/login"}>
              <button
                class="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0"
                data-bs-toggle="modal"
                data-bs-target="#feedbackModal"
                style={{ fontFamily: "inherit" }}
              >
                <span class="d-flex align-items-center">
                  {/* <i class="bi-chat-text-fill me-2"></i> */}
                  <span class="small">Login</span>
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
