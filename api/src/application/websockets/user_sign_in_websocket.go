package websockets

import (
	"encoding/json"
	"game-chess/src/domain/model"
	"github.com/gorilla/websocket"
	"github.com/sdkopen/sdkopen-go-webbase/logging"
	sdkopenWebSocket "github.com/sdkopen/sdkopen-go-websocket"
)

type UserSignInWebSocket struct {
}

func NewUserSignInWebSocket() *UserSignInWebSocket {
	return &UserSignInWebSocket{}
}

func (u *UserSignInWebSocket) Event() sdkopenWebSocket.Event {
	return sdkopenWebSocket.Event{
		Type:     "user-sign-in",
		Consumer: u.execute,
	}
}

func (u *UserSignInWebSocket) execute(conn *websocket.Conn, message sdkopenWebSocket.EventMessage) {
	var user model.User
	err := json.Unmarshal([]byte(message.Data), &user)
	if err != nil {
		logging.Error("Error unmarshalling user: %v", err)
	}
	sdkopenWebSocket.Clients[conn] = user.Username
	sdkopenWebSocket.Broadcast(message, conn)
}
