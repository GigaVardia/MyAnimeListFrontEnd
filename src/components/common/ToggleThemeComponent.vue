<template>
  <el-switch
    v-model="isDark"
    :active-icon="Moon"
    :inactive-icon="Sunny"
    @change="toggleDark"
  >
  </el-switch>
</template>

<script setup>
import { useDark, useToggle } from "@vueuse/core";
import { Sunny, Moon } from "@element-plus/icons-vue";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
