<template>
  <div class="welcome">
    <h2>My Blog에 오신 걸 환영합니다!</h2>
    <p>로그인하거나 회원가입해주세요</p>

    <button @click="goToLogin">로그인</button>
    <button @click="goToSignup">회원가입</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToLogin = () => router.push("/login");
const goToSignup = () => router.push("/signup");
</script>
