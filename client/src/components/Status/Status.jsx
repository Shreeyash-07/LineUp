import React from "react";
import { useState, useEffect, useRef } from "react";
import useFetch from "../../Hooks/useFetch";
import { useCountdown } from "../../Hooks/useCountdown";
import Modal1 from "../Modal/Modal1";
import { Feed } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const Status = () => {
  const [estTime, setESTTime] = useState();
  const [days, hours, minutes, seconds] = useCountdown(estTime);
  const [timeOver, setTimeOver] = useState(false);
  const [booked, setBooked] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const fetchEstimatedTime = async () => {
    const res = await fetch("/getestime");
    const data = await res.json();
    console.log(data.estimatedTime);
    setESTTime(data.estimatedTime);
  };

  const slotShow = async () => {
    const res = await fetch("/properRouting"); 
    const data1 = await res.json()
    setBooked(data1)
    console.log({user:data1})

    if (data1.success === false || !data1) {
      setError(true);
      return;
    } else {
      navigate("/landing");
    }
  }

  useEffect(() => {
    slotShow();
    fetchEstimatedTime();
  }, []);
  if (days + hours + minutes + seconds <= 0) {
    setTimeOver(true);
  }
  return (
    <div>
      <Modal1
      minutes = {minutes}
      seconds = {seconds}
      />
    </div>
  );
};

export default Status;
