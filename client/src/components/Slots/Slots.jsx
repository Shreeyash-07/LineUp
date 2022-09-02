import React, { useState, useEffect } from "react";
import useFetch from "../../Hooks/useFetch";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TodayDate from "../TodayDate/TodayDate";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Slots = () => {
  let datee = new Date().getDate();
  let month = new Date().toLocaleString("en-us", { month: "long" });
  let year = new Date().getFullYear();
  let day = new Date().toLocaleString("en-us", { weekday: "long" });

  const [slots, setSlots] = useState([]);
  const [user, setUser] = useState();
  const [Cookies, setCookies] = useCookies([]);
  const [size, setSize] = useState();
  // const [slotsize, setslotSize] = useState();
  const [slotTime, setSlotTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();
  const slotBook = async (e) => {
    e.preventDefault();
    const countVal = e.target.getAttribute("count");

    console.log(countVal);

    setSize(countVal);

    setSlotTime(e.target.getAttribute("value"));
    try {
      const res = await fetch("/bookslot", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slot: slotTime,
          id: user,
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        alert("You already booked a slot");
      } else {
        alert("Booked");
        navigate("/");
      }
      // if (!data) {
      //   alert("Not Booked");
      // } else {
      //   alert("Booked");
      //   navigate("/");
      // }
    } catch (err) {
      console.log({ err: err });
    }
    window.location.reload();
  };

  useEffect(() => {
    console.log(Cookies);
    const size = Object.keys(Cookies).length;
    // setisLogin(true);
    setSize(size);
    console.log(size);
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/getslots");
        const mainData = await res.json();
        setSlots(mainData.newSlots);
        setUser(mainData.userid);
        console.log(mainData.newSlots);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    // console.log(size);
    // if (size === 0) {
    //   navigate("/login");
    // }
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div>{/* <TodayDate /> */}</div>
      <br />
      <ol class="list-group">
        <li
          class="list-group-item d-flex justify-content-between align-items-start
        "
          style={{ paddingBottom: "10px" }}
        >
          <div class="ms-2 me-auto">
            <div class="fw-bold">Available Slots</div>
            Select slot
          </div>
          <span className="fw-bold">
            {day}, {datee} {month}
          </span>
        </li>
        {slots.map((element, index) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-start"
            style={{
              width: "330px",
              paddingTop: "10px",
              paddingBottom: "13px",
            }}
            key={index}
          >
            <div class="ms-2 me-auto">
              <div class="fw-bold">
                <button
                  id="bookButton"
                  isfull={element.isFull.toString()}
                  className=".col-md-6 .col-md-6 btn btn-outline-primary"
                  key={index}
                  value={element.time}
                  count={element.count}
                  onClick={slotBook}
                  disabled={element.isFull}
                  style={{ width: "120px" }}
                >
                  {/* {element.isFull ? "true" : "false"} */}
                  {element.time}
                </button>
              </div>
            </div>
            <span class="badge bg-primary rounded-pill">
              {4 - element.count}spots
            </span>
          </li>
        ))}
      </ol>
    </>
  );
};

export default Slots;

{
  /* <ol class="list-group list-group-numbered">
  <li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      <div class="fw-bold">Subheading</div>
      Cras justo odio
    </div>
    <span class="badge bg-primary rounded-pill">14</span>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      <div class="fw-bold">Subheading</div>
      Cras justo odio
    </div>
    <span class="badge bg-primary rounded-pill">14</span>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      <div class="fw-bold">Subheading</div>
      Cras justo odio
    </div>
    <span class="badge bg-primary rounded-pill">14</span>
  </li>
</ol>; */
}

{
  /* <Calendar
        value={date}
        onChange={(e) => setDate(e.target.value)}
      ></Calendar> */
}
{
  /* <TodayDate /> */
}
//  <div className="container">
//    <div className="row">
//      <div className="col m-3">
//        <ul className="list-group list-group-horizontal">
//          {slots.map((element, index) => (
//            <li
//              className="list-group-item d-flex justify-content-between align-items-center m-2"
//              key={index}
//            >
//              {/* {element.time} */}
//              <button
//                id="bookButton"
//                isfull={element.isFull.toString()}
//                className=".col-md-6 .col-md-6 btn btn-outline-success"
//                key={index}
//                value={element.time}
//                onClick={slotBook}
//                disabled={element.isFull}
//              >
//                {/* {element.isFull ? "true" : "false"} */}
//                {element.time}
//              </button>
//            </li>
//          ))}
//        </ul>
//      </div>
//    </div>
//  </div>;
