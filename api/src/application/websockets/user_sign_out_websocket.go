package websockets

import (
	"encoding/json"
	"game-chess/src/domain/model"
	"github.com/gorilla/websocket"
	"github.com/sdkopen/sdkopen-go-webbase/logging"
	sdkopenWebSocket "github.com/sdkopen/sdkopen-go-websocket"
)

type UserSignOutWebSocket struct {
}

func NewUserSignOutWebSocket() *UserSignOutWebSocket {
	return &UserSignOutWebSocket{}
}

func (u *UserSignOutWebSocket) Event() sdkopenWebSocket.Event {
	return sdkopenWebSocket.Event{
		Type:     "user-sign-out",
		Consumer: u.execute,
	}
}

func (u *UserSignOutWebSocket) execute(conn *websocket.Conn, message sdkopenWebSocket.EventMessage) {
	var user model.User
	err := json.Unmarshal([]byte(message.Data), &user)
	if err != nil {
		logging.Error("Error unmarshalling user: %v", err)
	}
	sdkopenWebSocket.Broadcast(message, conn)
	delete(sdkopenWebSocket.Clients, conn)
}
