const socket = io('http://localhost:3000');

socket.on('chat-message', (data) => {
  console.log(data);
});

const sendContainer = document.getElementById('send-container');
const input = document.getElementById('message-input');

sendContainer.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('test');
});

const costam = (element, id, text, cos) => {};
