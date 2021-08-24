<template>
  <button @click="kakaoService.login()">
    <img src="../assets/img_kakaoLogin.png" alt="카카오 로그인">
  </button>
</template>
<script>
import { KakaoService } from "social-login-service";

export default {
  name: 'KakaoLogin',
  props: {
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
  },
  data() {
    return {
      kakaoService: new KakaoService({
        apiKey: this.apiKey,
        success: this.success,
        fail: this.fail,
      }),
    }
  },
  mounted: function () {
    this.kakaoService.initiate();
  }
}
</script>
