import React, { useState } from "react";
import "./Queue.scss";
import useFetch from "../../Hooks/useFetch";
import { UilQrcodeScan } from "@iconscout/react-unicons";
import { UilAngleUp } from "@iconscout/react-unicons";
import { UilAngleDown } from "@iconscout/react-unicons";

const Queue = () => {
  const [Toggle, setToggle] = useState(false);
  const { data, loading, error } = useFetch("http://localhost:5000/admin");
  console.log(data);
  return (
    <table>
      <thead>
        <tr>
          <th>Time</th>
          <th>Status</th>
          <th>QRCode</th>
        </tr>
      </thead>
      <tbody>
        {data.map((e, i) => (
          <tr key={i}>
            <td>{e.time}</td>
            <td>
              <p
                className={
                  "status " + (e.isFull === true ? "status-yes" : "status-no")
                }
              >
                {e.isFull === true ? "Full" : "Not Full"}
              </p>
            </td>
            <td>
             <UilQrcodeScan />
            </td>
            <td
              onClick={(e) => {
                setToggle(!Toggle);
              }}
            >
              {Toggle ? <UilAngleDown /> : <UilAngleUp />}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Queue;
