<script setup>
import { onMounted } from "@vue/runtime-core";
import { GoogleService } from "social-login-service";

const props = defineProps({
  clientId: {
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

const googleLoginButtonId = 'google-login-button';

const googleLoginService = new GoogleService({
  clientId: props.clientId,
  elementId: googleLoginButtonId,
  success: props.success,
  fail: props.fail,
});

onMounted(() => {
  googleLoginService.initiate();
});
</script>

<template>
  <button :id="googleLoginButtonId">
    <img :src="require('../assets/img_googleLogin.png')" alt="구글 로그인">
  </button>
</template>
