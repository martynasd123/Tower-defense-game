import React from "react";
import {
    Route,
    Switch
} from "react-router";
import Game from "./screens/Game";
import Lobby from "./screens/Lobby";
import Room from "./screens/Room";

const Root = () => (
    <>
        <Switch>
            <Route exact path="/lobby" component={Lobby} />
            <Route exact path="/game" component={Game} />
            <Route exact path="/rooms/:roomId" component={Room} />
        </Switch>
    </>
);

export default Root;
