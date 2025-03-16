<template>
  <main>
    <div>
      <input v-model="title" placeholder="title" />
      <select v-model="selectedTag" id="tags">
        <option disabled value="">태그를 선택하세요</option>
        <option v-for="tag in tags" :key="tag.id" :value="tag.id">
          {{ tag.name }}
        </option>
      </select>
      <textarea v-model="content" placeholder="content" />
    </div>
    <div>
      <button @click="submitPost">write</button>
      <button>cancel</button>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const postId = route.params.id;

const tags = ref([]);
const post = ref(null);

const title = ref("");
const content = ref("");
const selectedTag = ref("");

onMounted(async () => {
  try {
    const resTags = await axios.get("http://localhost:3000/tags", {
      withCredentials: true,
    });
    tags.value = resTags.data;

    if (postId) {
      const resPost = await axios.get(`http://localhost:3000/posts/${postId}`, {
        withCredentials: true,
      });

      title.value = resPost.data.title;
      content.value = resPost.data.content;
      selectedTag.value = resPost.data.tag_id;
    }
  } catch (err) {
    console.error("데이터 불러오기 실패:", err);
  }
});

// 글 작성 요청
const submitPost = () => {
  const postData = {
    title: title.value,
    content: content.value,
    tag_id: selectedTag.value,
  };

  const request = postId
    ? axios.patch(
        `http://localhost:3000/posts/${postId}`,
        { post: postData },
        {
          withCredentials: true,
        }
      )
    : axios.post(
        "http://localhost:3000/posts",
        { post: postData },
        {
          withCredentials: true,
        }
      );

  request
    .then((res) => {
      alert(postId ? "글 수정 성공!" : "글 작성 성공!");
      console.log(res.data);
      router.push("/home"); // 작성/수정 후 이동할 경로
    })
    .catch((err) => {
      console.error("글 저장 실패:", err);
    });
};
</script>
