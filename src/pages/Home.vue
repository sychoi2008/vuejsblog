<template>
  <div>
    <button @click="logout">SignOut</button>
    <button @click="goToWrite">write</button>
  </div>
  <div>
    <input v-model="searchQuery" />
    <select v-model="selectedTag" id="tags">
      <option value="">전체글보기</option>
      <option v-for="tag in tags" :key="tag.id" :value="tag.id">
        {{ tag.name }}
      </option>
    </select>
    <button>검색</button>
  </div>
  <main>
    <template v-for="item in filteredPosts" :key="item.id">
      <div class="item">
        <router-link :to="`/posts/${item.id}`">{{ item.title }}</router-link>
        <p>{{ item.tag.name }}</p>
        <p>{{ item.updated_at }}</p>
      </div>
    </template>
  </main>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const searchQuery = ref("");
const selectedTag = ref("");
const filteredPosts = computed(() => {
  return items.value.filter((item) => {
    const matchesSearch =
      searchQuery.value === "" || item.title.includes(searchQuery.value);

    const matchesTag =
      selectedTag.value === "" || item.tag.id === selectedTag.value;

    return matchesSearch && matchesTag;
  });
});

const items = ref([]);
const tags = ref([]);

onMounted(async () => {
  try {
    const resTags = await axios.get("http://localhost:3000/tags", {
      withCredentials: true,
    });
    tags.value = resTags.data;

    const res = await axios.get("http://localhost:3000/posts", {
      withCredentials: true, // ✅ 세션 쿠키 보내기!
    });
    console.log(res.data);
    items.value = res.data;
  } catch (err) {
    console.error("목록 불러오기 실패:", err);
  }
});

const goToWrite = () => {
  router.push("/write");
};

const logout = () => {
  axios
    .delete("http://localhost:3000/users/sign_out", {
      withCredentials: true, // ✅ 세션 쿠키를 서버에 전달
    })
    .then((response) => {
      alert("로그아웃 성공!");

      router.push("/");
    })
    .catch((error) => {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 실패!");
    });
};
</script>
