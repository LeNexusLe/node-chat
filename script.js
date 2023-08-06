const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

socket.on('chat-message', (data) => {
  appendMessage(`${data.name}: ${data.message}`);
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  socket.emit('send-chat-message', message);
  messageInput.value = '';
});

const appendMessage = (message) => {
  const messageEmlement = document.createElement('div');
  messageEmlement.innerText = message;
  messageContainer.append(messageEmlement);
};

const name = prompt('What is your name?');
appendMessage('You Joined');
socket.emit('new-user', name);

socket.on('user-connected', (name) => {
  appendMessage(`${name} connected`);
});
socket.on('user-disconnected', (name) => {
  appendMessage(`${name} disconnected`);
});
