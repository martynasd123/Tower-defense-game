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
    establishConnection(address, port){
        this.client = new Colyseus.Client(`ws://${address}:${port}`);
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
        return await this.client.getAvailableRooms(this.addAuth({}));
    }

    async createRoom(roomData) {
        const room = await this.client.create("game_room", this.addAuth(roomData));
        this.room = room;
        console.log(room);
        return room;
    }

    async getRoomById(roomId) {
        const rooms = await this.client.getAvailableRooms(this.addAuth({}));
        return rooms.find((r) => r.id===roomId);
    }
    
    addAuth(data) {
        return {
            ...data,
            token: localStorage.getItem("token")
        };
    }
}