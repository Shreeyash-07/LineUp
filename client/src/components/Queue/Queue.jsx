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

  function filterUsers(user, index) {
    if (user.isConfirmed === false) {
      console.log("inside filter");
      return (
        <tr key={index}>
          <td>{user.name}</td>
          <td>{user.phone}</td>
          <td>{user.isConfiremd}</td>
          <td>{user.token}</td>
          <td>{user.status}</td>
        </tr>
      );
    }
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
              {e.tempQ.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.isConfirmed ? "Confirmed" : "Not Confirmed"}</td>
                  <td>{user.token}</td>
                  <Button primary>
                    {user.status === "Not served"
                      ? "Start Serving"
                      : user.status === "Being Serve"
                      ? "Stop Serving"
                      : "Completed"}
                  </Button>
                </tr>
              ))}
              {e.users
                .filter((user) => user.isConfirmed === false)
                .map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.phone}</td>
                    <td>{user.isConfirmed ? "Confirmed" : "Not Confirmed"}</td>
                    <td>-</td>
                    <Button primary>{!user.status && "Not served"}</Button>
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
