import React from "react";
import "./EventCard.css";
import dept from "./img/dept.png";

function Hospitalcard({ image }) {
  return (
    <>
      <div className={"eventcard"}>
        <img src={image} alt={"event card"} />
      </div>
    </>
  );
}
export default Hospitalcard;
