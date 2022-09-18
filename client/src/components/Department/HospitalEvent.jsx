import React from "react";
import "./EventCard.css";

// import dept from "./img/dept.png";

function HospitalCard({ image }) {
  return (
    <>
      <div className="eventcard text-align-center justify-content-center ">
        {/* <h1 className="text-align-center">City Hospital</h1> */}
        <img
          src={image}
          alt=""
          style={{
            maxWidth: "100%",
            // marginLeft: "25px"
          }}
        />
      </div>
    </>
  );
}
export default HospitalCard;
