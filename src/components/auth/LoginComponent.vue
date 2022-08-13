<template>
  <el-form
    @submit.prevent="onSubmit"
    ref="formRef"
    :rules="rules"
    :model="form"
    label-width="auto"
    hide-required-asterisk
  >
    <el-form-item prop="email">
      <el-input
        v-model="form.email"
        native-type="email"
        placeholder="Email..."
      />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="form.password"
        type="password"
        placeholder="Password..."
        show-password
      />
    </el-form-item>

    <el-form-item v-show="isError">
      <el-alert
        v-if="isError"
        :title="errorMessage"
        @close="isError = false"
        type="error"
        show-icon
      />
    </el-form-item>

    <div class="form-bottom">
      <el-button type="primary" native-type="submit" :loading="isLoading">
        Login
      </el-button>

      <el-button @click="onRegisterBtnCLick"> Register </el-button>
    </div>
  </el-form>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
import { useAuthUserStore } from "../../stores/authUser";
import { extractUserIdFromToken } from "../../utils/helpers";
import restApiService from "@/services/rest-api/apiService.js";
import localStorageService from "../../services/localStorage.service";

const router = useRouter();

const authUserStore = useAuthUserStore();

const form = reactive({
  email: "",
  password: "",
});

const formRef = ref();
const isLoading = ref(false);
const isError = ref(false);
const errorMessage = ref("");

const rules = reactive({
  email: [
    { required: true, message: "Please enter valid email", trigger: "blur" },
    { min: 3, max: 255, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Please enter valid password", trigger: "blur" },
    { min: 6, max: 255, message: "Length should be 3 to 5", trigger: "blur" },
  ],
});

const onRegisterBtnCLick = () => {
  router.push("/auth/register");
};

const onSubmit = () => {
  formRef.value.validate(async (valid, fields) => {
    if (valid) {
      try {
        isLoading.value = true;
        const { data } = await restApiService.login({
          email: form.email,
          password: form.password,
        });

        localStorageService.setAccessToken(data.accessToken);
        localStorageService.setRefreshToken(data.refreshToken);

        await authUserStore.fetchAuthUserData(
          extractUserIdFromToken(data.accessToken)
        );

        router.push("/");
      } catch (err) {
        errorMessage.value = err.response?.data.error || err.message;
        isError.value = true;
        localStorageService.clearTokens();
      } finally {
        isLoading.value = false;
      }
    }
  });
};
</script>

<style scoped>
.el-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  margin: 0 auto;
  height: 100%;
}

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
