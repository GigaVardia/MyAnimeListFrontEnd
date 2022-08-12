<template>
  <el-form @submit.prevent="onSubmit" :model="form" label-width="auto">
    <el-form-item label="Name">
      <el-input v-model="form.name" />
    </el-form-item>

    <el-form-item label="Surname">
      <el-input v-model="form.surname" />
    </el-form-item>

    <el-form-item label="Nickname">
      <el-input v-model="form.nickname" />
    </el-form-item>

    <el-form-item label="Email">
      <el-input v-model="form.email" />
    </el-form-item>

    <el-form-item label="Password">
      <el-input v-model="form.password" />
    </el-form-item>

    <el-form-item label="Repeat password">
      <el-input v-model="form.repeat_password" />
    </el-form-item>

    <div class="form-bottom">
      <el-button type="primary" native-type="submit">Register</el-button>

      <el-button @click="onBackToLoginClick"> Back to login </el-button>
    </div>
  </el-form>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const form = reactive({
  name: "",
  surname: "",
  nickname: "",
  email: "",
  password: "",
  repeat_password: "",
});

const onBackToLoginClick = () => {
  router.push("/auth/login");
};

const onSubmit = () => {
  console.log("submit!");
};
</script>

<style lang="scss">
.form-bottom {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
