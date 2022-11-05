const socket = io();

const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");
const room = document.querySelector("#room");

room.hidden = true;
let roomName;
const addMessage = (msg) => {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  ul.appendChild(li);
  li.innerText = msg;
};

const handleMessageSubmit = (event) => {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
};
const handleNicknameSubmit = (event) => {
  event.preventDefault();
  const input = room.querySelector("#nick input");
  const value = input.value;
  socket.emit("nick_name", value);
  input.value = "";
};

const showRoom = () => {
  const h3 = room.querySelector("h3");
  welcome.hidden = true;
  room.hidden = false;
  h3.innerText = `Room ${roomName}`;
  const msgForm = room.querySelector("#msg");
  const nickForm = room.querySelector("#nick");
  msgForm.addEventListener("submit", handleMessageSubmit);
  nickForm.addEventListener("submit", handleNicknameSubmit);
};

const handleRoomSubmit = (event) => {
  event.preventDefault();
  // const input = form.querySelector("input");
  const roomNameinput = form.querySelector("#roomName");
  const nickNameinput = form.querySelector("#nickName");
  socket.emit("enter_room", roomNameinput.value, nickNameinput.value, showRoom);
  roomName = roomNameinput.value;
  roomNameinput.value = "";

  const changeNameInput = room.querySelector("#nick input");
  changeNameInput.value = nickNameinput.value;
};

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (nick) => {
  addMessage(`${nick}: Someone joined!`);
});
socket.on("bye", (nick) => {
  addMessage(`${nick}: Someone left!!`);
});
socket.on("new_message", (msg) => {
  addMessage(msg);
});
socket.on("nick_message", (msg) => {
  addMessage(msg);
});
