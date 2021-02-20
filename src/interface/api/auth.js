import { HandleHttpRequest } from "./http";

const login = async (data) => HandleHttpRequest("POST", "http://192.168.0.110:2567/api/users/login", data);

export {
    login,
};
