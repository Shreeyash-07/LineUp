console.log("Service Worker Loaded...");
self.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log({ "data from worker": data });
  console.log("Push Received...");
  self.registration.showNotification(data.title, {
    body: "Notification testing!",
    icon: "http://image.ibb.co/frY0Fd/tmlogo.png",
  });
});
