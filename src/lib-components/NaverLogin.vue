<template>
  <div class="naver-login" @click="onClickNaver">
    <div id="naverIdLogin" />
    <!-- <div id="naverIdLogin" style="visibility: hidden"/> -->
  </div>
</template>

<script>
import { naverService } from "social-login-service";

export default {
	name: 'NaverLogin',
	props: {
		clientId: {
			type: String,
			required: true,
		},
		callbackUrl: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			naverService: naverService.naverService(),
		}
	},
	mounted() {
		this.naverService.initNaver(this.clientId, this.callbackUrl);
	},
	methods: {
		onClickNaver() {
			const naverLogin = document.getElementById("naverIdLogin").firstChild;
				return naverLogin.click();
		}
	}
}

</script>
