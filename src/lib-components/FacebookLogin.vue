<template>
	<div class="facebook-login" @click="loginWithFacebook(this.success, this.fail)" />
</template>

<script>
import { facebookService } from "social-login-service";

export default {
	name: 'FacebookLogin',
	props: {
		appId: {
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
			loadInitFacebook: facebookService.loadInitFacebook,
			loginWithFacebook: facebookService.loginWithFacebook,
		}
	},
	mounted() {
		this.loadInitFacebook(this.appId);
	}
}
</script>

<style>
.facebook-login {
	width: 100%;
	height: 100%;
}
</style>