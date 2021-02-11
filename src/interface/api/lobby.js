import { HandleHttpRequest } from "./http";

const getRoomEndData = async () => HandleHttpRequest("GET", "http://localhost:2567/api/lobby/BNg-Wv6hE");

export {
    getRoomEndData,
};
