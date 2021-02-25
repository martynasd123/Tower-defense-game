import React from "react";
import Button from "./Button";

class RoomData extends React.Component {

    render() {
        const {roomData} = this.props
        return (
           <div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <div className="font-weight-bold">Room name</div>
                        <div>{roomData?.title}</div>
                    </li>
                    <li className="list-group-item">
                        <div className="font-weight-bold">Room creator</div>
                        <div>{roomData?.creator_username}</div>
                    </li>
                    <li className="list-group-item">
                        <div className="font-weight-bold">Max players</div>
                        <div>{roomData?.max_players}</div>
                    </li>
                    <li className="list-group-item">
                        <div className="font-weight-bold">Map</div>
                        <div>{roomData?.map_name}</div>
                    </li>
                    <li className="list-group-item">
                        <div className="font-weight-bold">Controller</div>
                        <div>{roomData?.controller}</div>
                    </li>
                    <li/>
                </ul>
                <div className="form-group">
                    <Button
                        type="button"
                        className="btn-lg full-width"
                        onClick={this.props.onStartGame}
                        mx={0}
                        my={0}
                        color="primary"
                    >
                        Start game
                    </Button>
                </div> 
           </div>
        )
    }
}

export default RoomData;