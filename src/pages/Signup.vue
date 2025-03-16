<template>
  <main>
    <div>
      EMAIL <input v-model="inputEmail" /> PWD
      <input v-model="inputPWD" /> PWD_CONFIRM
      <input v-model="inputConfirm" /> NAME <input v-model="inputName" />
    </div>
    <div><button @click="submitForm">Sign up</button></div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const inputEmail = ref("");
const inputPWD = ref("");
const inputConfirm = ref("");
const inputName = ref("");

const submitForm = () => {
  axios
    .post(
      "http://localhost:3000/users",
      {
        user: {
          email: inputEmail.value,
          password: inputPWD.value,
          password_confirmation: inputConfirm.value,
          name: inputName.value,
        },
      },
      {
        withCredentials: true, // ✅ 세션/쿠키를 주고받으려면 무조건 필요!
      }
    )
    .then((response) => {
      console.log("회원가입 성공 응답:", response);
      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      router.push("/login");
    })
    .catch((error) => {
      console.error("회원가입 실패:", error.response);
    });
};
</script>
