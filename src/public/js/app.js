const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => console.log("Connection Server"));
socket.addEventListener("message", (message) =>
  console.log("Server from ", message.data)
);
socket.addEventListener("close", () =>
  console.log("DisConnection from Server")
);

setTimeout(() => {
  socket.send("Broowser to Server");
}, 2000);
