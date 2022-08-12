<template>
  <div class="auth">
    <div class="auth-inner">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<style lang="scss" scoped>
.auth {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &-inner {
    padding: 20px 50px;
    border-radius: 15px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
}
</style>
