import instance from "./axios-instance";

class RestApiService {
  constructor(instance) {
    this.instance = instance;
  }

  login({ email, password }) {
    return this.instance.post("auth/login", {
      email,
      password,
    });
  }

  register({ email, password, repeatPassword, name }) {
    return this.instance.post("auth/register", {
      email,
      name,
      password,
      repeatPassword,
    });
  }

  getAuthUserData(userId) {
    return this.instance.get(`/users/${userId}`);
  }

  fetchAnime(page) {
    if (page && page !== 1) {
      return this.instance.get(`/anime?page=${page}`);
    }
    return this.instance.get(`/anime`);
  }
}

const restApiService = new RestApiService(instance);

export default restApiService;
