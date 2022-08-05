import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
const Slots = () => {
  const [slots, setSlots] = useState([]);
  const [user, setUser] = useState();
  const [slotTime, setSlotTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [date, setDate] = useState(new Date());

  let vartime = false;
  const temp = async(e) =>{
    e.preventDefault();
    setSlotTime(e.target.getAttribute("value"));
    if (slotTime !== ''){
      vartime=true;
    }
  console.log({slot:slotTime,name:user.name,phone:user.phone})
  vartime && slotBook()
  }
  const delEntry=async(e)=>
  {
    const SlotTime = e.target.getAttribute("value");
    const res = await fetch("/getslots");
    const mainData = await res.json();
    console.log(SlotTime)
    console.log(res)
    console.log(mainData.userObj)
  }
  const slotBook = async () => {
    try {
      const res = await fetch("/bookslot", {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slot: slotTime,
          name: user.name,
          phone: user.phone,
        }),
      });
      const data = await res.json();
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
        console.log(mainData);
        setSlots(mainData.slots);
        console.log(mainData.slots);
        setUser(mainData.userObj);
        console.log(mainData.userObj);
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
        className='m-auto'
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
                    onClick={temp}
                    disabled={element.isFull}
                  >
                    {element.isFull ? "true" : "false"}
                  </button>
                  <button 
                  className=".col-md-6 .col-md-6"
                  value={element.time}
                  onClick={delEntry}>
                    Delete 
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
