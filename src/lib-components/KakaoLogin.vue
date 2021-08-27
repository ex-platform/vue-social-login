<template>
	<div class="kakao-login" @click="kakaoService.login()" />
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

<style>
.kakao-login {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>
