import React, {useEffect} from "react";
import {useParams} from "react-router";

export default function Room(){

    let { roomId } = useParams();

    useEffect(() => {
        //TODO: join this game room with colyseus
    }, [roomId]);

    return(
        <div>
            This is where room info will be.
        </div>
    )
}