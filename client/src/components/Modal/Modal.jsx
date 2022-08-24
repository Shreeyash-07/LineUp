import React from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const Modal = (props) => {
  return (
    <Lightbox
      style={{ zIndex: "1000" }}
      mainSrc={props.QRCode}
      onCloseRequest={() => {
        props.setIsOpen(false);
      }}
    />
  );
};

export default Modal;
