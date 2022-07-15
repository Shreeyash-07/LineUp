import React, { useState } from "react";
import useFetch from "../../Hooks/useFetch";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
const Slots = () => {
  const [date, setDate] = useState(new Date());
  const slotBook = (e) => {
    e.preventDefault();
    console.log(e.target.getAttribute("value"));
  };

  const { data, loading, error } = useFetch("/getslots");
  return (
    <div className="container">
      <Calendar
        value={date}
        onChange={(e) => setDate(e.target.value)}
      ></Calendar>
      <div className="container">
        <div className="row">
          <div className="col">
            <ul className="list-group">
              {data.map((element, index) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={index}
                >
                  {element.time}
                  <button
                    id="bookButton"
                    isfull={element.isFull.toString()}
                    className=".col-md-6 .col-md-6"
                    key={index}
                    value={element.time}
                    onClick={slotBook}
                    disabled={!element.isFull}
                  >
                    {element.isFull ? "true" : "false"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slots;
