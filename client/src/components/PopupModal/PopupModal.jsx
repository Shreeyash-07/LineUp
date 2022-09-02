import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const PopupModal = (props) => {
  console.log(props);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>Centered Modal</h4>2 */}
        <p>{props.body}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>
          {props.success === true ? "Confirm" : "Close"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PopupModal;
