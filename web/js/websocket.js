let WEBSOCKET = null;
const EVENTS = {
  'user-sign-in': {
    action: (data) => {
      fillUser(data)
      console.log('User Connected: ', data);
    }
  },
  'user-sign-out': {
    action: (data) => {
      console.log('User Disconnected: ', data);
    }
  }
}

function startWebSocket(user) {
  WEBSOCKET = new WebSocket("ws://127.0.0.1:8080/api/ws");

  WEBSOCKET.onopen = () => {
    console.log("Successfully Connected");
    WEBSOCKET.send(JSON.stringify({
      type: 'user-sign-in',
      data: JSON.stringify(user)}))
  };

  WEBSOCKET.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    WEBSOCKET.send(JSON.stringify({type: 'sign-out', data: ''}))
  };

  WEBSOCKET.onmessage = ({data}) => {
    const event = JSON.parse(data);
    console.log("Message Received: ", event);
    console.log("Event Type: ", event.type);
    EVENTS[event.type].action(JSON.parse(event.data));
  };

  WEBSOCKET.onerror = error => {
    console.log("Socket Error: ", error);
  };
}