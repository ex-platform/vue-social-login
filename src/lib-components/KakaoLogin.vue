
<script setup>
import { onMounted } from "@vue/runtime-core";
import { KakaoService } from "social-login-service";

const props = defineProps({
  apiKey: {
    type: String,
    required: true,
  },
  success: {
    type: Function,
    required: true,
  },
  fail: {
    type: Function,
    required: true,
  },
});

const kakaoService = new KakaoService({
  apiKey: props.apiKey,
  success: props.success,
  fail: props.fail,
});

onMounted(() => {
  kakaoService.initiate();
});

</script>

<template>
  <button @click="kakaoService.login()">
    <img :src="require('../assets/img_kakaoLogin.png')" alt="카카오 로그인">
  </button>
</template>
