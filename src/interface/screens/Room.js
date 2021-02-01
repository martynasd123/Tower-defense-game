import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router";
import Card from "../components/Card";
import ChatBox from "../components/ChatBox";
import MainContainer from "../components/MainContainer";
import { ServerManagerContext } from "../contexts/ServerManagerProvider";

export default function Room({ location }){
    let { roomId } = useParams();
    
    const { serverManager } = useContext(ServerManagerContext)

    const [roomState, setRoomState] = useState(null);
    const [roomPlayers, setRoomPlayers] = useState([]);

    const onStateChange = (state) => {
        const playerMap = state.playerMap.$items;
        const playerList = Array.from(playerMap, ([key, value]) => value);
        setRoomPlayers(playerList);
    };

    const refreshRoom = async () => {
        serverManager.onRoomStateChange(onStateChange);
        setRoomState(serverManager.room);
    };

    useEffect(refreshRoom, []);

    return(
        <MainContainer py="5">
            <div className="row">
                <div className="col-lg py-2">
                    <Card cardTitle="Players" >
                        <table className="table">
                            {roomPlayers.concat(new Array(4 - roomPlayers.length).fill({username: "Waiting for players"})).map(player => (
                                <tr>
                                    <td>{player.username}</td>
                                </tr>
                            ))}
                        </table>
                    </Card>
                    <Card cardTitle="Chat" >
                       <ChatBox 
                            messages={[{text: "testo test", date:"21:37:13", username: "Petras"}, {text: "testo test", date:"21:37:13", username: "Petras"},{text: "testo test", date:"21:37:13", username: "Petras"},{text: "testo test", date:"21:37:13", username: "Petras"},{text: "testo test", date:"21:37:13", username: "Petras"},]}
                        />
                    </Card>
                </div>
                <div className="col-lg py-2">
                    <Card cardTitle="Game data" >
                        Room name / Level name / max players / action buttons / ready up etc.
                    </Card>
                </div>
            </div>

        </MainContainer>
    );
}