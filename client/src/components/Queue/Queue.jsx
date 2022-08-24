import React, { useState } from "react";
import "./Queue.scss";
import useFetch from "../../Hooks/useFetch";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Modal from "../Modal/Modal";
import { Button, Form, FormButton } from "semantic-ui-react";
import { UilQrcodeScan } from "@iconscout/react-unicons";
import { UilAngleUp } from "@iconscout/react-unicons";
import { UilAngleDown } from "@iconscout/react-unicons";

const Queue = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [Toggle, setToggle] = useState(false);
  const [status, setStatus] = useState("");
  const { data, loading, error } = useFetch("/admin");
  // const [slots, setSlots] = useState(data.data.newSlots);
  // const [data, setData] = useState(data);
  console.log({ data: data });

  const userFunctions = (e) => {
    e.preventDefault();
    const des = e.target.value;
    console.log(des, typeof des);
    const [status, id, slot] = des.split(",");
    console.log({ status, id, slot });
    setStatus(status);
    if (status === "Not served") {
      startBeingServe(id, slot);
    } else if (status === "Being Serve") {
      stopServing(id, slot);
    }
  };

  const startBeingServe = async (id, slot) => {
    const res = await fetch("/startserve", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        slot,
      }),
    });
    const data = await res.json();
    if (data.status === true) {
      console.log("started serving");
    } else {
      console.log("err");
    }
  };
  const stopServing = async (id, slot) => {
    const res = await fetch("/stopserve", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        slot,
      }),
    });
    const data = await res.json();
    if (data.status === true) {
      console.log("stopped serving");
    } else {
      console.log("err");
    }
  };
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
                  <th>Confirmed Status</th>
                  <th>Token</th>
                  <th>Serving Status</th>
                </tr>
              </thead>
              {e.tempQ.map((user, index) => (
                <tr key={index}>
                  {/* <input></input> */}
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.isConfirmed ? "Confirmed" : "Not Confirmed"}</td>
                  <td>{user.token}</td>
                  <Button
                    basic
                    value={[user.status, user.userId, e.time]}
                    type="submit"
                    color={
                      user.status === "Not served"
                        ? "teal"
                        : user.status === "Being Serve"
                        ? "green"
                        : "red"
                    }
                    onClick={userFunctions}
                    disabled={user.status === "Served"}
                    content={
                      user.status === "Not served"
                        ? "Start Serving"
                        : user.status === "Being Serve"
                        ? "Stop Serving"
                        : "Completed"
                    }
                  />
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
                    <Button basic disabled>
                      {!user.status && "Not served"}
                    </Button>
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
