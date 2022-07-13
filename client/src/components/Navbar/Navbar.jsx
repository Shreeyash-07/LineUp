import React from 'react'
import './Navbar.scss';
import 'bootstrap/dist/css/bootstrap.css'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <NavLink className="navbar-brand" to="#">
    <a class="navbar-brand" href="/">Line Up logo</a>
    </NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/getslots">Book Appointment</NavLink>
        </li>
        <li class="nav-item">
          <NavLink className="nav-link" to="/about">About</NavLink>
        </li>
        <li class="nav-item">
          <NavLink className="nav-link" to="/contact">Contact</NavLink>
        </li>
        <li class="nav-item">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>
        <li class="nav-item">
          <NavLink className="nav-link" to="/signup">Registration</NavLink>
        </li>
      </ul> 
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar