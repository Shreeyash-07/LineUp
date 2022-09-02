import React from "react";
import Lineup from "../../images/newiphone.svg";
import Stepper from "../Stepper/Stepper";
import Dept1 from "../Department/Dept1/Dept1";
import Dept2 from "../Department/Dept2/Dept2";
import Dept3 from "../Department/Dept3/Dept3";
import { Link, NavLink } from "react-router-dom";
import Help from "../Help/Help";
import dept from "../Department/img/dept.png";
import HospitalCard from "../Department/HospitalEvent";
import hosimage from "../../images/hospitalImg.jpg";
import Navbar from "../Navbar/Navbar";

const Landing = () => {
  return (
    <>
      <Navbar />
      <header className="masthead">
        <div className="container px-5">
          <div className="row gx-5 align-items-center m-3  ">
            <div className="col-lg-6">
              <div className="mb-5 mb-lg-0 text-center text-lg-start">
                <h1
                  className="display-1 lh-1 mb-3 d-flex "
                  style={{ fontSize: "80px", fontWeight: "650" }}
                >
                  Quickly LineUp
                </h1>
                <p className="lead fw-normal text-muted mb-5">
                  Avoid the long waiting hours in queue, and book your
                  appointment hastle free! And Easily by booking slots at home.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="masthead-device-mockup">
                <svg
                  className="circle"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="circleGradient"
                      gradientTransform="rotate(45)"
                    >
                      <stop className="gradient-start-color" offset="0%"></stop>
                      <stop className="gradient-end-color" offset="100%"></stop>
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <svg
                  className="shape-1 d-none d-sm-block"
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
                  className="shape-2 d-none d-sm-block"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="50" cy="50" r="50"></circle>
                </svg>
                <div className="device-wrapper">
                  <div
                    className="device"
                    data-device="iPhoneX"
                    data-orientation="portrait"
                    data-color="black"
                  >
                    <div className="screen bg-transparent">
                      <img
                        className="img-responsive"
                        src={Lineup}
                        style={{ maxWidth: "100%", height: "100%" }}
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <hr />
      <div className="my-3">
        <h2>What are you looking for?</h2>
        <div className="cardWrap">
          <NavLink to="/depart">
            <HospitalCard image={hosimage} />
          </NavLink>
        </div>
      </div>
      <hr />
      <Stepper />
    </>
  );
};

export default Landing;
