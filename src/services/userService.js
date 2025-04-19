import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    password: user.password,
    name: user.name,
  });
}

// export function getUser(userId) {
//   return http.get(`${apiEndpoint}/${userId}`);
// }

// export function updateUser(userId, user) {
//   return http.put(`${apiEndpoint}/${userId}`, user);
// }

// export function deleteUser(userId) {
//   return http.delete(`${apiEndpoint}/${userId}`);
// }
