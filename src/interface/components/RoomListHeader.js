import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RoomListHeader(){
    return(
        <tr>
            <th scope="col" style={{width: '5%'}}>#</th>
            <th scope="col">Room Name</th>
            <th scope="col">Created by</th>
            <th scope="col">Capacity</th>
            <th scope="col"/>
        </tr>
    )
}