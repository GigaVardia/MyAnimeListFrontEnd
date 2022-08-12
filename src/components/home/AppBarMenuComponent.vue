<template>
  <el-dropdown>
    <el-avatar
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>Action 1</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
        <el-dropdown-item>
          <ToggleThemeComponent />
        </el-dropdown-item>
      </el-dropdown-menu>
      <el-dropdown-item>Logout</el-dropdown-item>
    </template>
  </el-dropdown>
</template>

<script setup></script>

<style scoped>
.el-avatar {
  cursor: pointer;
}
</style>
