const socket = io();
let namec = "";
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message__area");
do {
  namec = prompt("Please enter your name: ");
} while (!namec);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user: namec,
    message: message.trim(),
  };
  appendMessage(msg, "outgoing");
  textarea.value = "";
  socket.emit("message", msg);
  scrollToBottom();
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollToBottom();
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
