import React, { useState, useEffect } from "react";
import useFetch from "../../Hooks/useFetch";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
const Slots = () => {
  const [slots, setSlots] = useState([]);
  const [user, setUser] = useState();
  const [slotTime, setSlotTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [date, setDate] = useState(new Date());
  const slotBook = async (e) => {
    e.preventDefault();
    setSlotTime(e.target.getAttribute("value"));
    try {
      const res = await fetch("/bookslot", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slot: slotTime,
          name: user.name,
          phone: user.phone,
        }),
      });
      const data = await res.json();
      if (!data) {
        alert("Not Booked");
      } else {
        alert("Booked");
      }
    } catch (err) {
      console.log({ err: err });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/getslots");
        const mainData = await res.json();
        setSlots(mainData.slots);
        setUser(mainData.userObj);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

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
              {slots.map((element, index) => (
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
                    disabled={element.isFull}
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
