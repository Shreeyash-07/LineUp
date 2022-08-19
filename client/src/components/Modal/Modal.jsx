import React from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const Modal = (props) => {
  return (
    <Lightbox
      mainSrc={props.QRCode}
      onCloseRequest={() => {
        props.setIsOpen(false);
      }}
    />
  );
};

export default Modal;
