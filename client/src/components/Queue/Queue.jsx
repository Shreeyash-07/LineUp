import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import "./Queue.scss";
import useFetch from "../../Hooks/useFetch";
import { UilQrcodeScan } from "@iconscout/react-unicons";
import { UilAngleUp } from "@iconscout/react-unicons";
import { UilAngleDown } from "@iconscout/react-unicons";

const Queue = () => {
  const [Toggle, setToggle] = useState(false);
  const [QrData,setQrData] =useState([]);
  const { data, loading, error } = useFetch("http://localhost:5000/admin");
  console.log(data);
  const ShowQr =(value)=>{
    console.log(value)
    // setQrData(value);
    // console.log(QrData)
    // let qrdata = value.target.getAttribute("value")
    // console.log(qrdata);
    // console.log(qrdata)
  }
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
            {/* {data.map((e,i)=>(
              <td key={i}>
                <NavLink to="{e.QRCode}">
                <UilQrcodeScan />
                </NavLink>
                <img src={e.QRCode}  />
                <button 
                qr={e.QRCode}
                onClick={ShowQr(e.QRCode)}>
                <UilQrcodeScan />
                </button>
              </td>
            ))} */}
            <td>
              {/* <button onClick={window.open(<img src={e.QRCode} />)}> QR</button> */}
            <img src={e.QRCode} width="500px" height="600px" />
            {/* {e.QRCode} */}
              {/* <UilQrcodeScan /> */}
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
