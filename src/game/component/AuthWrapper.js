import React from "react";
import { Redirect } from "react-router-dom";


export default function AuthWrapper(IfAuthComponent) {
    return class extends React.Component {
        render() {
            const authorized = !!localStorage.getItem("token");
            console.log("authorized", authorized, localStorage.getItem("token"));
            if (!authorized) {
                return <Redirect to="/login" />
            }
            console.log("...");
            return <IfAuthComponent {...this.props} />;
        }
    };
}