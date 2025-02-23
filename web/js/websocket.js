const EVENTS = {
  'sign-in': {
    action: (data) => {
      console.log('User Connected: ', data);
    }
  },
  'sign-out': {
    action: (data) => {
      console.log('User Disconnected: ', data);
    }
  }
}

const socket = new WebSocket("ws://127.0.0.1:8080/api/ws");
console.log("Attempting Connection...");

socket.onopen = () => {
  console.log("Successfully Connected");
  socket.send(JSON.stringify({
    type: 'sign-in',
    data: JSON.stringify({
      id: '86ddd952-a9fa-4900-bf31-191512905810',
      username: 'nando'
    })}))
};

socket.onclose = event => {
  console.log("Socket Closed Connection: ", event);
  socket.send(JSON.stringify({type: 'sign-out', data: ''}))
};

socket.onmessage = ({data}) => {
  const event = JSON.parse(data);
  console.log("Message Received: ", event);
  console.log("Event Type: ", event.type);
  EVENTS[event.type].action(event.data);
};

socket.onerror = error => {
  console.log("Socket Error: ", error);
};