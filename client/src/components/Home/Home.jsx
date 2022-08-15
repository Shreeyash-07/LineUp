import React from "react";
import { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import { Button } from "semantic-ui-react";
import QrScanLogo from "../../images/qr-code.png";
import Navbar from "../Navbar/Navbar";
import Tabs from "../Tabs/Tabs";
import "./Home.scss";

const Home = () => {
  const [isQrClick, setQrCLick] = useState(false);
  const [data, setData] = useState("No result");

  const OpenQR = (e) => {
    e.preventDefault();
    setQrCLick(true);
    console.log(data);
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
  };
  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(JSON.parse(result?.text));
            console.log(data);

            if (!!error) {
              console.info(error);
            }
          }
        }}
        style={{ width: "500%" }}
      />
      <p>{data}</p>
      <form method="POST" onSubmit={checkId}>
        {data !== "No Result" && <Button primary>Submit</Button>}
      </form>
    </>
  );
};

export default Home;

// {<QrReader
//         onResult={(result, error) => {
//           if (!!result) {
//             setData(JSON.parse(result?.text));
//             console.log(data)
//           }

//           if (!!error) {
//             console.info(error);
//           }
//         }}
//         style={{ width: '500%' }}
//       />
//       <p>{data}</p>}
