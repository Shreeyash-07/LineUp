import React from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Navbar from "../Navbar/Navbar";

const Modal = (props) => {
  return (
    <>
    {/* <Navbar/> */}
    <Lightbox
      mainSrc={props.QRCode}
      onCloseRequest={() => {
        props.setIsOpen(false);
      }}
    />
    </>
  );
};

export default Modal;
