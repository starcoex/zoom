const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");

const socket = new WebSocket(`ws://${window.location.host}`);

const makeMessage = (type, payload) => {
  const msg = { type, payload };
  return JSON.stringify(msg);
};

socket.addEventListener("open", () => console.log("Connection Server"));
socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  messageList.append(li);
  li.innerText = message.data;
});

const handleMessageSubmit = (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  // let inputValue = input.value;
  socket.send(makeMessage("New_Message", input.value));
  input.value = "";
};

const handleNickSubmit = (event) => {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickName", input.value));
  input.value = "";
};

messageForm.addEventListener("submit", handleMessageSubmit);
nickForm.addEventListener("submit", handleNickSubmit);

socket.addEventListener("close", () =>
  console.log("DisConnection from Server")
);
