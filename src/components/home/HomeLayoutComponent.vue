<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <RouterLink to="/" class="logo">My Anime List</RouterLink>

        <div class="header-right">
          <AppBarMenuComponent />
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { RouterView, RouterLink } from "vue-router";
import AppBarMenuComponent from "./AppBarMenuComponent.vue";
</script>

<style scoped>
.el-header {
  background-color: var(--el-color-primary-light-7);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-right {
  display: flex;
  align-items: center;
}

.el-dropdown {
  margin-left: 10px;
}

.logo {
  color: inherit;
  font-family: "Rubik Burned", cursive;
  font-size: 24px;
}
</style>
