import React from "react";
import { Button } from "semantic-ui-react";
const Notification = () => {
  const publicVapidKey =
    "BCCxcB9gbvtDhX3NXyYJ_q0FhDbIwqP0Gds_2_Evfe8blnlyA52_7qVnSkApfeMi1PtbLXniZvizLL6BuTeZfMM";
  const callSend = () => {
    console.log("under call send");
    if ("serviceWorker" in navigator) {
      console.log("checking worker");
      send().catch((err) => console.log(err));
    }
  };
  const send = async () => {
    console.log("asking for notification permission");
    const permission = await window.Notification.requestPermission();
    console.log("granted notification");
    console.log("Registering service worker....");
    const register = await navigator.serviceWorker.register("/worker.js", {
      scope: "/",
    });

    console.log("Registering push");
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });
    console.log("Push Registered");

    console.log("Sending push");
    const res = await fetch("http://localhost:5000/subscribe", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "content-type": "application/json",
      },
    });
    console.log("Push Sent");
    const data = await res.json();
    console.log(data);
  };
  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  return (
    <div>
      <Button content="Click me" onClick={callSend} />
    </div>
  );
};

export default Notification;
