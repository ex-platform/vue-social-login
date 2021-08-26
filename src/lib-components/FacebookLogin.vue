<template>
	<div class="facebook-login" @click="loginWithFacebook">
		<div
			class="fb-login-button"
			data-width
			data-size="medium"
			data-button-type="login_with"
			data-layout="default"
			data-auto-logout-link="false"
			data-use-continue-as="false"
		></div>
	</div>
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
.fb_iframe_widget iframe {
	width: 100%;
	height: 100%;
	/* opacity: 0; */
}

.fb_iframe_widget {
	/* background-image: url(another-button.png); */
	background-repeat: no-repeat;
}
</style>