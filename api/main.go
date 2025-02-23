package main

import (
	"game-chess/src/application/controllers"
	"github.com/sdkopen/sdkopen-go-webbase/server"
	sdkopenWebServer "github.com/sdkopen/sdkopen-go-webserver"
)

func main() {
	server.RegisterController(controllers.NewWebSocketController())

	sdkopenWebServer.Initialize()
}
