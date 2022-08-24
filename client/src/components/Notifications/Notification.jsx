import React, { useEffect } from "react";
import { Button } from "semantic-ui-react";
import Navbar from "../Navbar/Navbar";

const Notification = () => {
  return (
    <>
    <Navbar/>
     <div>
      <Button content="Click me" />
    </div>
    </>
   
  );
};

export default Notification;
