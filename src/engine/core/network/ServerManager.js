import * as Colyseus from "colyseus.js";
import { RGBADepthPacking } from "three";

/**
 * Handles communication to a colyseus server
 */
export default class ServerManager{
    
    /**
     * Establishes a connection to the server
     * @param address IP address of the server
     * @param port port
     */
    async establishConnection(address, port){
        this.client = new Colyseus.Client(`ws://${address}:${port}`);
        if (localStorage.getItem("session_id") && localStorage.getItem("room_id")) {
            try{
               // await this.client.reconnect(localStorage.getItem("room_id"), localStorage.getItem("session_id"));
            } catch(e) {
                // Do nothing /shrug
            }
        }
    }

    constructor(address, port) {
        this.establishConnection(address, port);
    }

    /**
     * Sending a message to the server
     * @param type Message type
     * @param message Message content
     */
    sendMessage(type, message){

    }

    /**
     * Acquires a list of rooms
     * @returns {Promise<Colyseus.RoomAvailable[]>} A promise, which returns a list of rooms
     */
    async listRooms(){
        return await this.client.getAvailableRooms("game_room");
    }

    async joinRoomById(roomId) {
      //  try {
            const room = await this.client.joinById(roomId, this.addAuth({}));
            localStorage.setItem("session_id", room.sessionId);
            localStorage.setItem("room_id", room.id);
            this.room = room;
            return room;
       // } catch(e) {
       //     return null;
      //  }
    }

    onRoomStateChange (func) {
        this.room.onStateChange(func);
    }

    onMessage (keyValue, func) {
        this.room.onMessage(keyValue, func);
    }

    send(type, data) {
        this.room.send(type, data);
    }

    async createRoom(roomData) {
        const room = await this.client.create("game_room", this.addAuth(roomData));
        this.room = room;
        localStorage.setItem("session_id", room.sessionId);
        localStorage.setItem("room_id", room.id);
        return room;
    }

    async getRoomById(roomId) {
        const rooms = await this.listRooms();
        return rooms.find((r) => r.roomId===roomId);
    }
    
    addAuth(data) {
        return {
            ...data,
            token: localStorage.getItem("token")
        };
    }
}