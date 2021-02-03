import React, {useState, useEffect, useContext} from "react";
import RoomListItem from "../components/RoomListItem";
import { Modal } from "react-bootstrap";
import RoomListHeader from "../components/RoomListHeader";
import {BsArrowCounterclockwise} from "react-icons/bs";
import RoomTableSpinner from "../components/RoomTableSpinner";
import {Button} from "react-bootstrap";
import {SnackbarContext} from "../contexts/SnackbarProvider";
import {ServerManagerContext} from "../contexts/ServerManagerProvider";
import RoomForm from "../components/RoomForm";
import Card from "../components/Card";
import MainContainer from "../components/MainContainer";

export default function Lobby({ history }) {

    const { serverManager } = useContext(ServerManagerContext)
    const [rooms, setRooms] = useState([]);
    const [roomsLoading, setRoomsLoading] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false);

    const { addAlert } = useContext(SnackbarContext);

    const refreshRooms = () => {
        setRoomsLoading(true);
        serverManager.listRooms().then((rooms) => {
            console.log(rooms);
            setRooms(rooms);
        }).catch((error) => {
            addAlert({title: "Error", message: "Failed to connect to server. Refresh this page to try again"});
        }).finally(() => {
            setRoomsLoading(false);
        })
    };

    const onCreateRoom = async (roomData) => {
        setShowFormModal(false);
        const room = await serverManager.createRoom(roomData);
        history.push(`/rooms/${room.id}`);
    };

    //Fetching rooms initially
    useEffect(refreshRooms, [])

    const onRoomJoin = async (room) => {
        await serverManager.joinRoomById(room.roomId);
        history.push(`/rooms/${room.roomId}`);
    };


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
    };

    return (
        <MainContainer py="3" px="4" background>
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
                    <Button variant="secondary" onClick={() => setShowFormModal(true)}>
                        create new room
                    </Button>
                    <Button variant="secondary" onClick={() => {history.push('/game')}}>
                        Magic button
                    </Button>
                </div>

                <Modal
                    onHide={() => setShowFormModal(false)}
                    show={showFormModal}
                    id="show-form-modal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title> Room </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <RoomForm onCreateRoom={onCreateRoom}/>
                    </Modal.Body>
                </Modal>
        </MainContainer>
    )
}