import http from "./httpService";
import config from "../config.json";
import { jwtDecode } from "jwt-decode";

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

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    console.error("Error loading user data:", ex);
  }
}

http.setJwt(getJwt());

export default {
  login,
  loginWithJwt,
  getCurrentUser,
  logout,
  getJwt,
};
