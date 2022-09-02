import React, { useState, useEffect } from "react";
import "./Admin.scss";
import Add from "../Queue/Add";
import { Container } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import Queue from "../Queue/Queue";
import Error from "../Error/Error";
import Navbar from "../Navbar/Navbar";
const Admin = () => {
  const [time, setTime] = useState("");
  const [started, setStarted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const data = window.localStorage.getItem("timeIsset");
    if (data !== null) setStarted(JSON.parse(data));
  }, []);

  const PostData = (event) => {
    event.preventDefault();
    console.log("inside function");
    console.log("here");
    fetch("/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ time }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        window.localStorage.setItem("timeIsset", true);
        console.log(data);
      });
    console.log("there");
  };

  const Adduser = () => {
    navigate("/add");
  };
  return (
    <>
      <div>
        <form method="POST" onSubmit={PostData}>
          Time:
          <input
            type="time"
            name="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <button value="submit">Submit</button>
        </form>
        <Queue />
        <br />
        <div className="container justify-content-center">
          <button type="button" className="btn btn-primary" onClick={Adduser}>
            Add A Customer
          </button>
        </div>
      </div>
    </>
  );
};

export default Admin;
{
  /* <div className="container">{started ? <Queue /> : <Error />}</div> */
}
