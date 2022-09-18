import React from "react";
import { NavLink } from "react-router-dom";
// import HospitalCard from "../components/Department/HospitalCard.jsx";
import HospitalCard from "./HospitalEvent";

const Hospital = () => {
  return (
    <>
      <div className="my-3">
        <h2>What are you looking for?</h2>
        <div className="cardWrap">
          <NavLink to="/">
            <HospitalCard />
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Hospital;
