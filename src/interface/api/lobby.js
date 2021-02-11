import { HandleHttpRequest } from "./http";

const getRoomEndData = async (id) => HandleHttpRequest("GET", "http://localhost:2567/api/lobby/" + id);

export {
    getRoomEndData,
};
