import localStorageService from "../services/localStorage.service";
import jwt_decode from "jwt-decode";

export function extractUserIdFromToken() {
  const token = localStorageService.getAccessToken();

  if (token) {
    return jwt_decode(token)?.userId || null;
  }

  return null;
}
