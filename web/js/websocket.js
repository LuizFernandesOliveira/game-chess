let socket = new WebSocket("ws://127.0.0.1:8080/ws");
console.log("Attempting Connection...");

socket.onopen = () => {
  console.log("Successfully Connected");
  socket.send("Hi Server!")
};

socket.onclose = event => {
  console.log("Socket Closed Connection: ", event);
  socket.send("Client Closed!")
};

socket.onmessage = event => {
  console.log("Message Received: ", event.data);
};

socket.onerror = error => {
  console.log("Socket Error: ", error);
};