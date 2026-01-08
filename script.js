// آدرس WebSocket سرورت (Render)
const ws = new WebSocket("wss://YOUR-RENDER-URL/ws");

const messagesDiv = document.getElementById("messages");

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  const div = document.createElement("div");
  div.className = "msg";
  div.innerHTML = `<span>${data.user}</span><br>${data.text}`;
  messagesDiv.appendChild(div);

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

function sendMessage() {
  const user = document.getElementById("username").value || "Guest";
  const text = document.getElementById("message").value;
  if (!text) return;

  ws.send(JSON.stringify({
    user: user,
    text: text
  }));

  document.getElementById("message").value = "";
}
