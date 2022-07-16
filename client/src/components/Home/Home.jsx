import React from "react";
import { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import QrScanLogo from "../../images/qr-code.png";
import Navbar from "../Navbar/Navbar";
import Tabs from "../Tabs/Tabs";
import "./Home.scss";

const Home = () => {
  const [isQrClick, setQrCLick] = useState(false);
  const [dat, setDat] = useState("No result");

  const OpenQR = (e) => {
    e.preventDefault();
    setQrCLick(true);
    console.log(dat);
  };

  return (
    <>
      {/* <Navbar/> */}
      Hi this is name
      <div className="outer_container">
        <div className="inner_container">
          <div className="middle_container">
            <img
              style={{ display: isQrClick ? "none" : "block" }}
              src={QrScanLogo}
              alt="Scanner"
              onClick={OpenQR}
            />
            {isQrClick ? (
              <QrReader
                onResult={(result, error) => {
                  if (!!result) {
                    setDat(result?.text);
                  }
                  if (!!error) {
                    console.info(error);
                  }
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
