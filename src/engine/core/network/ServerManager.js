import * as Colyseus from "colyseus.js";

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
    listRooms(){
        return this.client.getAvailableRooms();
    }
}