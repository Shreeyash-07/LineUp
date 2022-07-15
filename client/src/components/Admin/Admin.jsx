import React, { useState, useEffect } from "react";
import "./Admin.scss";
import Queue from "../Queue/Queue";
import Error from "../Error/Error";
const Admin = () => {
  const [time, setTime] = useState("");
  const [started, setStarted] = useState(false);

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
        // console.log(response.json());
        return response.json();
      })
      .then(function (data) {
        window.localStorage.setItem("timeIsset", true);
        console.log(data);
      });
    console.log("there");
  };
  return (
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
      <div className="container">{started ? <Queue /> : <Error />}</div>
    </div>
  );
};

export default Admin;
