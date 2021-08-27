<template>
	<div class="google-login" :id="googleLoginButtonId" />
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

<style>
.google-login {
	width: 100%;
	height: 100%;
}
</style>