<template>
  <main>
    <div class="input-wrapper">
      <label>EMAIL</label>
      <input v-model="inputEmail" placeholder="EMAIL" />
      <label>PWD</label>
      <input v-model="inputPWD" type="password" placeholder="password" />
      <label>PWD_CONFIRM</label>
      <input
        v-model="inputConfirm"
        type="password"
        placeholder="password-confirm"
      />
      <label>NAME</label>
      <input v-model="inputName" placeholder="name" />

      <div class="button-wrapper">
        <button class="signupbtn" @click="submitForm">Sign Up</button>
        <button class="homebtn" @click="goToHome">Cancel</button>
      </div>
    </div>
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

const goToHome = () => {
  router.push("/");
};

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
        withCredentials: true,
      }
    )
    .then((response) => {
      console.log("회원가입 성공 응답:", response);
      alert("회원가입 성공! 로그인 페이지로 이동");
      router.push("/login");
    })
    .catch((error) => {
      console.error("회원가입 실패:", error.response);
    });
};
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
}
.input-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  width: 300px;
}

.input-wrapper input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-wrapper {
  display: flex;
  justify-content: space-between; /* 좌우 정렬 */
  gap: 10px;
}

.homebtn {
  background-color: red;
}

@media screen and (max-width: 480px) {
  .signupbtn {
    width: 50vw;
  }

  .homebtn {
    width: 50vw;
  }
}
</style>
