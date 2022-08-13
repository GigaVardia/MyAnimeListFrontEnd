<template>
  <el-form
    @submit.prevent="onSubmit"
    :model="form"
    :rules="rules"
    ref="formRef"
    label-width="auto"
  >
    <el-form-item prop="name">
      <el-input v-model="form.name" placeholder="Name..." />
    </el-form-item>

    <el-form-item prop="email">
      <el-input v-model="form.email" placeholder="Email..." />
    </el-form-item>

    <el-form-item prop="password">
      <el-input
        v-model="form.password"
        type="password"
        placeholder="Password..."
        show-icon
      />
    </el-form-item>

    <el-form-item prop="repeatPassword">
      <el-input
        v-model="form.repeat_password"
        placeholder="Repeat password..."
        type="password"
        show-icon
      />
    </el-form-item>

    <el-form-item v-show="showAlert">
      <el-alert
        v-if="showAlert"
        :title="alertMessage"
        @close="showAlert = false"
        :type="isError ? 'error' : 'success'"
      />
    </el-form-item>

    <div class="form-bottom">
      <el-button :loading="isLoading" type="primary" native-type="submit">
        Register
      </el-button>

      <el-button @click="onBackToLoginClick"> Back to login </el-button>
    </div>
  </el-form>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import restApiService from "@/services/rest-api/apiService.js";
import localStorageService from "../../services/localStorage.service";

const router = useRouter();

const form = reactive({
  name: "",
  surname: "",
  nickname: "",
  email: "",
  password: "",
  repeat_password: "",
});

const formRef = ref();
const isLoading = ref(false);
const showAlert = ref(false);
const isError = ref(false);
const alertMessage = ref("");

const repeatPasswordValidator = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("Repeat password required"));
  } else if (form.repeat_password !== form.password) {
    callback(new Error("Passwords are not same"));
  } else {
    callback();
  }
};

const rules = reactive({
  name: [
    { required: true, message: "Please enter name", trigger: "blur" },
    { min: 3, max: 24, message: "Length should be 3 to 24", trigger: "blur" },
  ],
  email: [
    { required: true, message: "Please enter valid email", trigger: "blur" },
    { min: 3, max: 255, trigger: "blur" },
  ],
  password: [
    { required: true, message: "Please enter valid password", trigger: "blur" },
    { min: 6, max: 255, message: "Length should be 6 to 255", trigger: "blur" },
  ],
  repeatPassword: [{ validator: repeatPasswordValidator, trigger: "blur" }],
});

const onBackToLoginClick = () => {
  router.push("/auth/login");
};

const onSubmit = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        isLoading.value = true;
        await restApiService.register({
          name: form.name,
          email: form.email,
          password: form.password,
          repeatPassword: form.repeatPassword,
        });

        alertMessage.value = "Successfully registered";
        isError.value = false;
      } catch (err) {
        alertMessage.value =
          err.response?.data.message || err.response?.data.error || err.message;
        isError.value = true;
        localStorageService.clearTokens();
      } finally {
        showAlert.value = true;
        isLoading.value = false;
      }
    }
  });
};
</script>

<style lang="scss">
.form-bottom {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.el-alert {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
