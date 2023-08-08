const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const roomContainer = document.getElementById('room-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const nameForm = document.getElementById('name-form');
const nameInput = document.getElementById('name-input');
var name = '';
if (nameForm != null) {
  nameForm.addEventListener('submit', (e) => {
    name = nameInput.value;
    e.preventDefault();
    console.log(name);
  });
}

socket.on('room-created', (room) => {
  console.log('Room created');
  const roomElement = document.createElement('div');
  roomElement.innerHTML = room;
  const roomLink = document.createElement('a');
  roomLink.href = `/${room}`;
  roomLink.innerText = 'Join';
  roomContainer.append(roomElement);
  roomContainer.append(roomLink);
});

socket.on('chat-message', (data) => {
  appendMessage(`${data.name}: ${data.message}`);
});

const appendMessage = (message) => {
  const messageEmlement = document.createElement('div');
  messageEmlement.innerText = message;
  messageContainer.append(messageEmlement);
};

if (messageForm != null) {
  console.log('Test: ' + name);
  appendMessage('You Joined');
  socket.emit('new-user', roomName, name);

  messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit('send-chat-message', roomName, message);
    messageInput.value = '';
  });
}

socket.on('user-connected', (name) => {
  appendMessage(`${name} connected`);
});
socket.on('user-disconnected', (name) => {
  appendMessage(`${name} disconnected`);
});
