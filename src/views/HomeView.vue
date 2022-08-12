<template>
  <HomeLayoutComponentVue> </HomeLayoutComponentVue>
</template>

<script setup>
import HomeLayoutComponentVue from "../components/home/HomeLayoutComponent.vue";
import { useAnimeStore } from "@/stores/anime";
import { useAuthUserStore } from "@/stores/authUser";
import localStorageService from "../services/localStorage.service";
import { useRouter } from "vue-router";

const animeStore = useAnimeStore();
const authUserStore = useAuthUserStore();

const router = useRouter();

Promise.all([
  authUserStore.fetchAuthUserData(),
  animeStore.fetchMyAnime(),
]).catch(() => {
  localStorageService.clearTokens();
  animeStore.$reset();
  authUserStore.$reset();
  router.push("/auth/login");
});
</script>
