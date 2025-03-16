<template>
  <main>
    <div>
      EMAIL <input v-model="inputEmail" /> PWD
      <input v-model="inputPWD" type="password" />
    </div>
    <div><button @click="submitForm">login</button></div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

// ✅ 반응형 변수 선언 (useState 같은 역할)
const inputEmail = ref("");
const inputPWD = ref("");

// ✅ 로그인 요청 함수
const submitForm = () => {
  axios
    .post(
      "http://localhost:3000/users/sign_in",
      {
        user: {
          email: inputEmail.value,
          password: inputPWD.value,
        },
      },
      {
        withCredentials: true, // ✅ 세션/쿠키를 주고받으려면 무조건 필요!
      }
    )
    .then((response) => {
      alert("로그인 성공!");
      console.log(response.data);
      router.push("/home");
    })
    .catch((error) => {
      console.error("로그인 실패:", error);
      alert("로그인 실패! 이메일과 비밀번호를 확인하세요.");
    });
};
</script>
