import { HandleHttpRequest } from "./http";

const getRoomEndData = async (id) => HandleHttpRequest("GET", "http://192.168.0.110:2567/api/lobby/" + id);

export {
    getRoomEndData,
};
