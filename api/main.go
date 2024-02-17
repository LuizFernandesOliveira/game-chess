package main

import (
	"fmt"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func register(w http.ResponseWriter, r *http.Request) {
	println("REGISTERING USER...")
}

func main() {
	fmt.Print("STARTING SERVER...")

	router := mux.NewRouter()
	router.HandleFunc("/register", register)
	router.HandleFunc("/ws", wsEndpoint)

	err := http.ListenAndServe(":8080", router)
	if err != nil {
		return
	}
}

func reader(conn *websocket.Conn) {
	for {
		_, p, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		fmt.Println(string(p))

		//if err := conn.WriteMessage(messageType, p); err != nil {
		//	log.Println(err)
		//	return
		//}
	}
}

func writer(conn *websocket.Conn) {
	if err := conn.WriteMessage(1, []byte("Hi Client!")); err != nil {
		log.Println(err)
		return
	}
}

func wsEndpoint(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }

	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}

	log.Println("Client Connected")
	err = ws.WriteMessage(1, []byte("Hi Client!"))
	if err != nil {
		log.Println(err)
	}
	reader(ws)
}
