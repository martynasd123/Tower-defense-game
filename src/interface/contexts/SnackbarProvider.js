import React, { createContext, useState, useEffect } from "react";
import Snackbar from "../components/Snackbar";

export const SnackbarContext = createContext();

export function SnackbarProvider({children}){

    const [alerts, setAlerts] = useState([]);

    const addAlert = (newAlert) => {
        setAlerts((currentAlerts) => {
            return [...currentAlerts, { ...newAlert, time: new Date().getDate()}];
        });
    }

    return(
        <SnackbarContext.Provider value={{ addAlert }}>
            {children}
            <div style={{position: 'absolute', right: 20, bottom: 20}}>
                {alerts.map((alert) => {
                    return(
                        <Snackbar alert={alert}/>
                    )
                })}
            </div>
        </SnackbarContext.Provider>
    )
}