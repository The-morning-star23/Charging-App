<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <p v-if="error" style="color: red;">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import api from "../api";
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const error = ref("");
    const router = useRouter();

    const handleLogin = async () => {
      try {
        const res = await api.post("/auth/login", { email: email.value, password: password.value });
        localStorage.setItem("token", res.data.token);
        router.push("/chargers");
      } catch (err) {
        error.value = err.response?.data?.message || "Login failed";
      }
    };

    return { email, password, handleLogin, error };
  },
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: auto;
  padding-top: 100px;
}
input {
  display: block;
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
}
button {
  padding: 10px;
  width: 100%;
}
</style>
