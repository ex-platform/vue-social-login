<template>
  <button :id="googleLoginButtonId">
    <img src="../assets/img_googleLogin.png" alt="구글 로그인">
  </button>
</template>
<script>
import { GoogleService } from "social-login-service";

export default {
  name: 'GoogleLogin',
  props: {
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
  },
  data() {
    const googleLoginButtonId = 'google-login-button'
    return {
      googleLoginButtonId,
      googleLoginService: new GoogleService({
        clientId: this.clientId,
        elementId: googleLoginButtonId,
        success: this.success,
        fail: this.fail,
      }),
    }
  },
  mounted: function () {
    this.googleLoginService.initiate();
  },
}
</script>