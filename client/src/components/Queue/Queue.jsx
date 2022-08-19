import React, { useState } from "react";
import "./Queue.scss";
import useFetch from "../../Hooks/useFetch";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Modal from "../Modal/Modal";
import { Button } from "semantic-ui-react";
import { UilQrcodeScan } from "@iconscout/react-unicons";
import { UilAngleUp } from "@iconscout/react-unicons";
import { UilAngleDown } from "@iconscout/react-unicons";

const Queue = () => {
  const [isOpen, setIsOpen] = useState(false);
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
              <UilQrcodeScan
                onClick={() => {
                  setIsOpen(true);
                }}
              />
              <img src={e.QRCode} alt="" />
              {isOpen && <Modal QRCode={e.QRCode} setIsOpen={setIsOpen} />}
            </td>
            <td
              onClick={(e) => {
                setToggle(!Toggle);
              }}
            >
              {Toggle ? <UilAngleDown /> : <UilAngleUp />}
            </td>
            <br />
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  {/* <th>Id</th> */}
                  <th>Confirmed Status</th>
                  <th>Token</th>
                  <th>Serving Status</th>
                </tr>
              </thead>
              {e.users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  {/* <td>{user._id}</td> */}
                  <td>Confirmed</td>
                  <td>A12</td>
                  <Button primary>Being Serve</Button>
                </tr>
              ))}
            </table>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Queue;
