import React from "react";
import {Toast} from "react-bootstrap";
import {timeSince} from "../Util";

export default function Snackbar({alert}){
    return(
        <Toast autohide={true} delay={5000}>
            <Toast.Header>
                <img className="rounded mr-2" alt="" />
                <strong className="mr-auto">{alert.title}</strong>
            </Toast.Header>
            <Toast.Body>{alert.message}</Toast.Body>
        </Toast>
    );
}