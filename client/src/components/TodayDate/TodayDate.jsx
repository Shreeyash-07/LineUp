import React, { useState } from "react";
let date = new Date().getDate();
let month = new Date().toLocaleString("en-us", { month: "long" });
let year = new Date().getFullYear();
let day = new Date().toLocaleString("en-us", { weekday: "long" });

const TodayDate = () => {
  return (
    <>
      <div class="container" style={{ width: "700px" }}>
        <div class="row justify-content-center">
          <div class="col-md-6 text-center mb-5">
            <h2 class="heading-section">Select a time slot for appointment</h2>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-4">
            <div class="today">
              <div class="today-piece  top  day">{day}</div>
              <div class="today-piece  middle  month">{month}</div>
              <div class="today-piece  middle  date">{date}</div>
              <div class="today-piece  bottom  year">{year}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodayDate;
