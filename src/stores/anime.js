import { defineStore } from "pinia";
import restApiService from "../services/rest-api/apiService";

export const useAnimeStore = defineStore({
  id: "anime",
  state: () => ({
    animeData: null,
  }),
  getters: {
    animeListGetter: (state) => state.animeData?.docs || [],
    animeDataGetter: (state) => state.animeData,
  },
  actions: {
    async fetchMyAnime() {
      const { data } = await restApiService.fetchAnime(
        this.animeData?.page + 1 || 1
      );
      this.animeData = data;
    },
  },
});
