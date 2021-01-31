import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Game from "./screens/Game";
import Lobby from "./screens/Lobby";
import Room from "./screens/Room";

export default function Main(){
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={Lobby} />
                    <Route path="/game" component={Game} />
                    <Route path="/room/:roomId?" component={Room} />
                </Switch>
            </div>
        </Router>
    );
}