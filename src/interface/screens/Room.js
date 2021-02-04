import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router";
import Card from "../components/Card";
import ChatBox from "../components/ChatBox";
import MainContainer from "../components/MainContainer";
import RoomData from "../components/RoomData";
import { ServerManagerContext } from "../contexts/ServerManagerProvider";

export default function Room({ location, history }){
    let { roomId } = useParams();
    
    const { serverManager } = useContext(ServerManagerContext)

    const [roomState, setRoomState] = useState(null);
    const [roomPlayers, setRoomPlayers] = useState([]);
    const [messages, setRoomMessages] = useState([]);

    const onStateChange = (state) => {
        const playerMap = state.playerMap.$items;
        const playerList = Array.from(playerMap, ([key, value]) => value);
        console.log(playerList.map(p=>p.id));
        setRoomPlayers(playerList);
        console.log(state);



        // Game state tests
        const entities = Array.from(state.gameState.entities.$items, ([key, value]) => value);
        console.log(entities);
        entities.forEach(ent => {
            console.log({
                parent: ent.parent,
                visual: ent.visual,
                components: ent?.components,
                pitch: ent?.components?.canonController?.pitch,
            })
        })
        setRoomState({
            title: state?.title,
            max_players: state?.maxPlayers,
            creator_username: "Petras"
        });
    };

    const onStartGame = () => {
        console.log("Start lobby button");
        serverManager.send("start_lobby", null);
    }

    const onStartGameBroadcast = () => {
        console.log("Start game broadcast");
        // Reroute to game
        history.push(`/rooms/${ roomId }/game`);
    }
    
    const onMessage = (data) => {
        setRoomMessages(msgs => [...msgs, data]);
    };

    const onSendMessage = (message) => {
        serverManager.send("messages", message);
    }

    const refreshRoom = async () => {
        serverManager.onRoomStateChange(onStateChange);
        serverManager.onMessage("messages", onMessage);
        serverManager.onMessage("start_lobby", onStartGameBroadcast)
    };


    useEffect(refreshRoom, []);

    return(
        <MainContainer py="5">
            <div className="row">
                <div className="col-lg py-2">
                    <Card cardTitle="Players" >
                        <table className="table">
                            <tbody>
                                {roomPlayers.concat(new Array(4 - roomPlayers.length).fill({username: "Waiting for players"})).map((player, index) => (
                                    <tr key={`tr-${index}`}>
                                        <td key={`td-${index}`}>
                                            {player.username}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                    <Card cardTitle="Chat" >
                       <ChatBox 
                            messages={messages}
                            onSendMessage={onSendMessage}
                        />
                    </Card>
                </div>
                <div className="col-lg py-2">
                    <Card cardTitle="Game data" >
                        <RoomData 
                            roomData={
                                {
                                    title: roomState?.title,
                                    max_players: roomState?.max_players,
                                    map_name: "Badwater",
                                    creator_username: roomState?.creator_username
                                }
                            }
                            onStartGame={onStartGame}
                        />
                    </Card>
                </div>
            </div>

        </MainContainer>
    );
}