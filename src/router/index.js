// router/index.js
import { createRouter, createWebHistory } from "vue-router";

// 페이지 컴포넌트 import (pages 폴더 안에서 불러오는게 일반적)
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import WritePost from "../pages/WritePost.vue";
import SignUp from "../pages/Signup.vue";
import Welcome from "../pages/Welcome.vue";
import Post from "../pages/Post.vue";

const routes = [
  { path: "/", component: Welcome },
  { path: "/home", component: Home },
  { path: "/login", component: Login },
  { path: "/write", component: WritePost },
  { path: "/write/:id", component: WritePost },
  { path: "/signup", component: SignUp },
  { path: "/posts/:id", component: Post },
];

const router = createRouter({
  history: createWebHistory(), // 히스토리 모드 사용 (URL 깔끔하게)
  routes,
});

export default router;
