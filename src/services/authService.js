import http from "./httpService";
import * as jwtDecode from "jwt-decode";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/auth";
const tokenKey = "token";

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode.default(jwt);
  } catch (ex) {
    console.log("ex", ex);
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

http.setJwt(getJwt());

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
