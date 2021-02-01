import React, { createContext, useState } from "react";
import ServerManager from "../../engine/core/network/ServerManager";

export const ServerManagerContext = createContext();

/**
 * Provides children with a singleton instance of ServerManager
 */
export function ServerManagerProvider({children}){

    const [serverManager, setServerManager] = useState(new ServerManager("localhost", 2567));

    return(
        <ServerManagerContext.Provider value={{ serverManager }}>
            {children}
        </ServerManagerContext.Provider>
    )
}