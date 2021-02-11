import { HandleHttpRequest } from "./http";

const getRoomEndData = async (roomId) => HandleHttpRequest("GET", `http://localhost:2567/api/lobby/${roomId}`);

export {
    getRoomEndData,
};
