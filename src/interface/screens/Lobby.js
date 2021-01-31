import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import RoomListItem from "../components/RoomListItem";
import RoomListHeader from "../components/RoomListHeader";
import {BsArrowCounterclockwise} from "react-icons/bs";
import RoomTableSpinner from "../components/RoomTableSpinner";
import {Button} from "react-bootstrap";
import {SnackbarContext} from "../contexts/SnackbarProvider";
import {useHistory} from "react-router";
import {ServerManagerContext} from "../contexts/ServerManagerProvider";

export default function Lobby() {

    const { serverManager } = useContext(ServerManagerContext)
    const [rooms, setRooms] = useState([]);
    const [roomsLoading, setRoomsLoading] = useState(false);

    const { addAlert } = useContext(SnackbarContext);

    const history = useHistory();

    const refreshRooms = () => {
        setRoomsLoading(true);
        serverManager.listRooms().then((rooms) => {
            setRooms(rooms);
        }).catch((error) => {
            addAlert({title: "Error", message: "Failed to connect to server. Refresh this page to try again"});
        }).finally(() => {
            setRoomsLoading(false);
        })
    }

    //Fetching rooms initially
    useEffect(refreshRooms, [])

    const onRoomJoin = (room) => {
        history.push(`/room/${room.roomId}`);
    }

    const tableBody = () => {
        if(roomsLoading){
            return <RoomTableSpinner/>;
        }else if(rooms.length === 0){
            return <tr ><td colSpan={5} >No rooms found</td></tr>;
        }else{
            return rooms.map((room) => {
                return (<RoomListItem key={room.roomId} room={room} onRoomJoin={onRoomJoin}/>);
            });
        }
    }

    return (
        <div className="container">
            <table style={{tableLayout: 'fixed'}} className="table">
                <thead>
                <RoomListHeader/>
                </thead>
                <tbody>
                    {tableBody()}
                </tbody>
            </table>
            <div>
                <Button variant="secondary" onClick={refreshRooms}>
                    <BsArrowCounterclockwise size={16}/>
                    {' '} Refresh room list
                </Button>
                <Button variant="secondary" onClick={() => {history.push('/game')}}>
                    Magic button
                </Button>
            </div>

        </div>
    )
}