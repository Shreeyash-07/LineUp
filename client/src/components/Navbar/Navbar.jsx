import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import Login from "../Login/Login";
import { NavLink } from "react-router-dom";

import { createBrowserHistory } from "history";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [Cookies, setCookies] = useCookies([]);
  const [jwt, setJwt] = useState();
  const [error, setError] = useState(false);
  const [isLogin, setisLogin] = useState(false);
  const [size, setSize] = useState();

  const del = async () => {
    console.log("inside del");
    const res = await fetch("/logout", {
      method: "GET",
    });

    const data = await res.json();
    window.location.reload();
    setisLogin(true);
    console.log({ success: data });
    if (res.success === false || !data) {
      setError(true);
      return;
    }
  };
  useEffect(() => {
    console.log(Cookies);
    const size = Object.keys(Cookies).length;
    // setisLogin(true);
    setSize(size);
    console.log(size);
  }, []);

  return (
    <>
      {size !== 0 ? (
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
                <li className="nav-item">
                  <a className="nav-link me-lg-2" href="/help">
                    Help
                  </a>
                </li>
              </ul>

              <NavLink to={"/"}>
                <button
                  className="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0"
                  data-bs-toggle="modal"
                  data-bs-target="#feedbackModal"
                  style={{ fontFamily: "inherit" }}
                  onClick={del}
                >
                  <span className="d-flex align-items-center">
                    {/* <i className="bi-chat-text-fill me-2"></i> */}
                    <span className="small">logout</span>
                  </span>
                </button>
              </NavLink>
            </div>
          </div>
        </nav>
      ) : (
        //if login size==0
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
                  <a className="nav-link me-lg-2" href="/slots">
                    Book Appointment
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link me-lg-2" href="/">
                    Confirm Appointment
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link me-lg-2" href="/help">
                    Help
                  </a>
                </li>
              </ul>

              <NavLink to={"/login"}>
                <button
                  className="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0 "
                  data-bs-toggle="modal"
                  data-bs-target="#feedbackModal"
                  style={{ fontFamily: "inherit" }}
                >
                  <span className="d-flex align-items-center m-auto">
                    {/* <i className="bi-chat-text-fill me-2"></i> */}
                    <span className="small">Login</span>
                  </span>
                </button>
              </NavLink>

              <NavLink to={"/signup"}>
                <button
                  className="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0 "
                  data-bs-toggle="modal"
                  data-bs-target="#feedbackModal"
                  style={{ fontFamily: "inherit", marginLeft: "1rem" }}
                >
                  <span className="d-flex align-items-center m-auto">
                    {/* <i className="bi-chat-text-fill me-2"></i> */}
                    <span className="small">Registration </span>
                  </span>
                </button>
              </NavLink>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
