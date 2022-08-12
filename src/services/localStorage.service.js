class LocalStorageService {
  getItem(key) {
    return localStorage.getItem(key);
  }

  setItem(key, value) {
    if (typeof value === "object") {
      return localStorage.setItem(key, JSON.stringify(value));
    }
    localStorage.setItem(key, value);
  }

  removeItem(key) {
    localStorage.removeItem(key);
  }

  getAccessToken() {
    return this.getItem("accessToken");
  }

  setAccessToken(token) {
    this.setItem("accessToken", token);
  }

  getRefreshToken() {
    return this.getItem("refreshToken");
  }

  setRefreshToken(token) {
    this.setItem("refreshToken", token);
  }

  clearTokens() {
    this.removeItem("accessToken");
    this.removeItem("refreshToken");
  }
}

const localStorageService = new LocalStorageService();

export default localStorageService;
