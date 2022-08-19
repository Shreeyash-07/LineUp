import React from "react";
import Cookies from 'js-cookie';
import { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import QrScanLogo from "../../images/qr-code.png";
import Navbar from "../Navbar/Navbar";
import Tabs from "../Tabs/Tabs";
import "./Home.scss";

const Home = () => {
  const [isQrClick, setQrCLick] = useState(false);
  const [data, setData] = useState("NO result");
  
  const OpenQR = (e) => {
    e.preventDefault();
    setQrCLick(true);
    console.log(data);
  };
  const  postdata =async (e) =>{
    e.preventDefault();
    const res = await fetch("/getus",{
      method:"POST",
      headers :{
        "content-type": "application/json",
      } ,
      body:JSON.stringify({
        data
      })
    })
    const resData = await res.json();
    console.log(resData)
     
  }
  return (
    <>
    <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(JSON.parse(result?.text));
            console.log(data)
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '500%' }}
      />
      <p>{data}</p>
      <form
      method="POST"
      onSubmit={postdata}>
      {data !=="NO result" && <button type="submit">Button</button>}
        </form>
     
     
     
     
     
      {/* <Navbar/> */}
      {/* Hi this is name
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
                    console.log(dat)
                  }
                  if (!!error) {
                    console.info(error);
                  }
                }}
                style={{ width: '100%' }}
              />
            ) : null}
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Home;
