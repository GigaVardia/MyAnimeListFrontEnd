import { defineStore } from "pinia";
import restApiService from "../services/rest-api/apiService";
import { extractUserIdFromToken } from "../utils/helpers";

export const useAuthUserStore = defineStore({
  id: "authUser",
  state: () => ({
    authUser: null,
  }),
  getters: {
    authUserGetter: (state) => state.authUser,
  },
  actions: {
    async fetchAuthUserData(userId) {
      if (!userId) userId = extractUserIdFromToken();
      const { data } = await restApiService.getAuthUserData(userId);
      this.authUser = data;
    },
  },
});
