import React from "react";
import "./EventCard.css";

function EventCard({ image }) {
  return (
    <>
      <div className={"eventcard"}>
        <img src={image} alt={"event card"} />
      </div>
    </>
  );
}
export default EventCard;
