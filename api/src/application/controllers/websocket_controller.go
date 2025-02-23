package controllers

import (
	"encoding/json"
	"game-chess/src/domain/model"
	"github.com/gorilla/websocket"
	webBaseHttp "github.com/sdkopen/sdkopen-go-webbase/http"
	"github.com/sdkopen/sdkopen-go-webbase/logging"
	"github.com/sdkopen/sdkopen-go-webbase/server"
	"net/http"
)

var clients = make(map[*websocket.Conn]string)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type WebSocketController struct {
}

type Response struct {
	Message string `json:"message"`
}

func NewWebSocketController() *WebSocketController {
	return &WebSocketController{}
}

func (cc *WebSocketController) Routes() []server.Route {
	return []server.Route{
		{
			URI:      "ws",
			Method:   webBaseHttp.MethodGet,
			Prefix:   server.Api,
			Function: cc.Connect,
		},
	}
}

func (cc *WebSocketController) Connect(ctx server.WebContext) {
	ws, err := upgrader.Upgrade(ctx.Response(), ctx.Request(), nil)
	if err != nil {
		logging.Error("Error upgrading connection: %v", err)
	}
	reader(ws)
}

func reader(conn *websocket.Conn) {
	defer func() {
		delete(clients, conn)
		conn.Close()
		logging.Info("Client disconnected")
	}()

	for {
		var message model.EventMessage
		err := conn.ReadJSON(&message)
		if err != nil {
			logging.Error("Error reading message: %v", err)
			break
		}

		if message.Type == "sign-in" {
			signIn(conn, message)
		} else if message.Type == "sign-out" {
			signOut(conn, message)
		}
	}
}

func signOut(conn *websocket.Conn, message model.EventMessage) {
	var user model.User
	err := json.Unmarshal([]byte(message.Data), &user)
	if err != nil {
		logging.Error("Error unmarshalling user: %v", err)
	}
	broadcast(message, conn)
	if err != nil {
		return
	}
	logging.Info("Client connected")
}

func signIn(conn *websocket.Conn, message model.EventMessage) {
	var user model.User
	err := json.Unmarshal([]byte(message.Data), &user)
	if err != nil {
		logging.Error("Error unmarshalling user: %v", err)
	}
	clients[conn] = user.Username
	broadcast(message, conn)
}

func broadcast(msg model.EventMessage, exclude *websocket.Conn) {
	for client := range clients {
		if client != exclude {
			err := client.WriteJSON(msg)
			if err != nil {
				logging.Error("Error sending message: %v", err)
			}
		}
	}
}
