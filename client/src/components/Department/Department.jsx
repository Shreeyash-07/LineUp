import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import EventCard from './EventCard';
import iphone from "../Landing/img/newiphone.svg";
import "./Department.css";




const Department = () => {
  return (
    <>
      <Navbar />
      <header class="masthead">
        <div class="container px-5">
          <div class="row gx-5 align-items-center m-3  ">
            <div class="col-lg-6" >
              <div class="mb-5 mb-lg-0 text-center text-lg-start">
                <h1 class="display-1 lh-1 mb-3 d-flex "
                  style={{ fontSize: "80px", fontWeight: "650" }}>
                  Quickly LineUp
                </h1>
                <p class="lead fw-normal text-muted mb-5">
                  Avoid the long waiting hours in queue, and book your appointment hastle free!
                  And Easily by booking slots at home.
                </p>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="masthead-device-mockup">
                <svg
                  class="circle"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="circleGradient"
                      gradientTransform="rotate(45)"
                    >
                      <stop class="gradient-start-color" offset="0%"></stop>
                      <stop class="gradient-end-color" offset="100%"></stop>
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <svg
                  class="shape-1 d-none d-sm-block"
                  viewBox="0 0 240.83 240.83"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="-32.54"
                    y="78.39"
                    width="305.92"
                    height="84.05"
                    rx="42.03"
                    transform="translate(120.42 -49.88) rotate(45)"
                  ></rect>
                  <rect
                    x="-32.54"
                    y="78.39"
                    width="305.92"
                    height="84.05"
                    rx="42.03"
                    transform="translate(-49.88 120.42) rotate(-45)"
                  ></rect>
                </svg>
                <svg
                  class="shape-2 d-none d-sm-block"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <div class="device-wrapper">
                  <div
                    class="device"
                    data-device="iPhoneX"
                    data-orientation="portrait"
                    data-color="black"
                  >
                    <div class="screen bg-transparent">
                      <img className="img-responsive"
                        src={iphone}
                        style={{ maxWidth: "100%", height: "100%" }}>
                      </img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <h2>What are you looking for?</h2>
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <NavLink to="/dep1details"><EventCard /></NavLink>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <NavLink to="/dep2details"><EventCard /></NavLink>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4">
            <NavLink to="/dep3details"><EventCard /></NavLink>
          </div>
        </div>
      </div>
    </>
  )
}
export default Department;