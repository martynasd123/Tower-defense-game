import { HandleHttpRequest } from "./http";

const login = async (data) => HandleHttpRequest("POST", "http://localhost:2567/api/users/login", data);

export {
    login,
};
