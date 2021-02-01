import React from "react";
import {Button} from "react-bootstrap";

export default function RoomListItem({room, onRoomJoin}){
    return(
        <tr>
            <td scope="row" className="align-middle">1</td>
            <td className="align-middle">{room.metadata.title}</td>
            <td className="align-middle">{room.metadata?.created_by?.username || "Unknown"}</td>
            <td className="align-middle">{`${room.clients}/${room.maxClients}`}</td>
            <td>
                <Button variant="primary" onClick={() => onRoomJoin(room)}>Join this room</Button>
            </td>
        </tr>
    )
}