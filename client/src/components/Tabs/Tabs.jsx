import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Tabs.scss";
const Tabs = () => {
  return (
    <>
    <Navbar/>
     <div className="tab_container">
      <div className="tab_data">
        <ul className="tab_list">
          <li>
            <a href="#home">
              <i className="uil uil-qrcode-scan tab_icon"></i>
            </a>
          </li>
          <li>
            <a href="#home">
              <i className="uil uil-qrcode-scan tab_icon"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    </>
   
  );
};

export default Tabs;
