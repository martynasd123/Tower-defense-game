import React from "react";
import {
    Route,
    Switch
} from "react-router";
import Game from "./screens/Game";
import GameEnd from "./screens/GameEnd";
import Lobby from "./screens/Lobby";
import Room from "./screens/Room";

const Root = () => (
    <>
        <Switch>
            <Route exact path="/" component={Lobby} />
            <Route exact path="/rooms/:roomId/game" component={Game} />
            <Route exact path="/rooms/:roomId/end" component={GameEnd} />
            <Route exact path="/rooms/:roomId" component={Room} />
        </Switch>
    </>
);

export default Root;
