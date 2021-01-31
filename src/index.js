import React from 'react';
import ReactDOM from 'react-dom';
import {SnackbarProvider} from "./interface/contexts/SnackbarProvider";
import Main from "./interface/Main";
import {ServerManagerProvider} from "./interface/contexts/ServerManagerProvider";

ReactDOM.render(
    <SnackbarProvider>
        <ServerManagerProvider>
            <Main/>
        </ServerManagerProvider>
    </SnackbarProvider>,
    document.getElementById('app')
);