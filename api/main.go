package main

import (
	"game-chess/src/application/websockets"
	sdkopenWebServer "github.com/sdkopen/sdkopen-go-webserver"
	sdkopenWebSocket "github.com/sdkopen/sdkopen-go-websocket"
)

func main() {
	sdkopenWebSocket.RegisterWebSocketEvent(websockets.NewUserSignInWebSocket().Event())
	sdkopenWebSocket.RegisterWebSocketEvent(websockets.NewUserSignOutWebSocket().Event())
	sdkopenWebSocket.Initialize()
	sdkopenWebServer.Initialize()
}
