import React from "react";
import { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import { Button } from "semantic-ui-react";
import QrScanLogo from "../../images/image-qr-code.png";
import Navbar from "../Navbar/Navbar";
import { useNavigate, NavLink } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  const navigate = useNavigate();
  const [isQrClick, setQrCLick] = useState(false);
  const [data, setData] = useState("No result");

  const OpenQR = (e) => {
    e.preventDefault();
    setQrCLick(true);
    console.log(data);
  };

  const logout = async () => {
    const res = await fetch("/logout");
    const data = await res.json();

    if (data.success === true) {
      alert("log out successfully");
      navigate("/");
    } else {
      alert("logout fail");
    }
  };

  const checkId = async (e) => {
    e.preventDefault();
    const res = await fetch("/checkqr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
      }),
    });
    const resdata = await res.json();
    console.log(resdata);
    if (resdata.status === true) {
      alert("Checked");
      navigate("/status");
    } else {
      alert("Check failed");
    }
  };
  return (
    <>
    <Navbar/>
      {/* <QrReader
        onScan={checkId}
        onResult={(result, error) => {
          if (!!result) {
            setData(JSON.parse(result?.text));

            if (!!error) {
              console.info(error);
            }
          }
        }}
        style={{ width: "500%" }}
      /> */}

      {/* <p>{data}</p> */}
      {/* <form method="POST" onSubmit={checkId}>
        {data !== "No result" && <Button primary>Submit</Button>}
      </form>
      <button type="submit" onClick={logout}>
        Logout
      </button> */}
      <main>
        <div className="card">
          <img src={QrScanLogo} className="card-img-top" alt="..." />
          <div class="card-body">
            <NavLink to={"/scanner"}>
              <button
                type="button"
                className="btn btn-outline-primary rounded"
                style={{ fontFamily: "inherit" }}
              >
                Scan QRCode
              </button>
            </NavLink>

            <h4 className="p-3" style={{ fontFamily: "inherit" }}>
              Scan QR code at the reception to mark your presence at the venue
            </h4>
            {/* <p className="card-text">
              Scan the QR code to visit Frontend Mentor and take your coding
              skills to the next level
            </p> */}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
