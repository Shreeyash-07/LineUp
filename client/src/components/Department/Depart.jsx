import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import EventCard from "../Department/EventCard";
import Help from "../Help/Help";
import dermat from "../../images/dermatology.jpg";
import general from "../../images/generalmedicine.jpeg";
import ortho from "../../images/ophthalmology.jpg";

const Depart = () => {
  return (
    <>
      <br />
      <br />
      <br />

      <h2 className="text-center">Departments</h2>
      <div className="container">
        <NavLink to="/dep1details">
          <EventCard image={dermat} />
        </NavLink>
        <NavLink to="/dep2details">
          <EventCard image={general} />
        </NavLink>
        <NavLink to="/dep3details">
          <EventCard image={ortho} />
        </NavLink>
      </div>
    </>
  );
};

export default Depart;
