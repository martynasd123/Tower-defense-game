import React from "react";
import {
    Router,
    Switch,
    Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./screens/Login";
import { createBrowserHistory } from "history";
import AuthWrapper from "../game/component/AuthWrapper";
import Root from "./Root";
import { SnackbarProvider } from "./contexts/SnackbarProvider";
import { ServerManagerProvider } from "./contexts/ServerManagerProvider";
import "./style.css";

const App = () => (
    <SnackbarProvider>
        <ServerManagerProvider>
            <Router history={createBrowserHistory()}>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route component={AuthWrapper(Root, Login)}/>
                </Switch>
            </Router>
        </ServerManagerProvider>
    </SnackbarProvider>
);

export default App;