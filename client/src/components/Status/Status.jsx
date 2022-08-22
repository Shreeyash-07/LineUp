import React from "react";
import { useState, useEffect, useRef } from "react";
import useFetch from "../../Hooks/useFetch";
import { useCountdown } from "../../Hooks/useCountdown";
const Status = () => {
  const [estTime, setESTTime] = useState();
  const [days, hours, minutes, seconds] = useCountdown(estTime);
  const [timeOver, setTimeOver] = useState(false);
  const fetchEstimatedTime = async () => {
    const res = await fetch("/getestime");
    const data = await res.json();
    console.log(data.estimatedTime);
    setESTTime(data.estimatedTime);
  };
  useEffect(() => {
    fetchEstimatedTime();
  }, []);
  if (days + hours + minutes + seconds <= 0) {
    setTimeOver(true);
  }
  return (
    <div>
      <div style={{ fontSize: "36px" }}>
        {minutes}:{seconds}
      </div>
    </div>
  );
};

export default Status;
