import http from 'http';
import io from 'socket.io';


const server = http.createServer();
const socketServer = io(server);

socketServer.on('connection', (socket) => {
  console.log('A new client has connected!');
  
  socket.on('disconnect', () => {
    console.log('A client has disconnected.');
  });
  
  socket.on('chat message', (message) => {
    console.log('Received message:', message);
    socketServer.emit('chat message', message);
  });
});

const socket = io();

const form = document.getElementById('message-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = input.value;
  socket.emit('chat message', message);
  input.value = '';
});

socket.on('chat message', (message) => {
  const li = document.createElement('li');
  li.textContent = message;
  messages.appendChild(li);
});
server.listen(2222,(err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log('성공');
})