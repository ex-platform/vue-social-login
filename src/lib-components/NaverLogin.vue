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
		success: {
      type: Function,
      required: true,
    },
    fail: {
      type: Function,
      required: true,
    },
		isPopup: {
			type: Boolean,
			default: false,
		},
		buttonColor: {
      type: String,
      default: 'green'
    },
    buttonType: {
      type: Number,
      default: 3
    },
    buttonHeight: {
      type: Number,
      default: 60
    },
	},
	data() {
		return {
			naverService: naverService.naverService(),
			buttonStyles: {
				buttonColor: this.buttonColor,
				buttonType: this.buttonType,
				buttonHeight: this.buttonHeight,
			}
		}
	},
	mounted() {
		this.naverService.initNaver(
			this.clientId, 
			this.callbackUrl, 
			this.isPopup, 
			this.success,
			this.fail,
			this.buttonStyles,
		);
	},
	methods: {
		onClickNaver() {
			const naverLogin = document.getElementById("naverIdLogin").firstChild;
				return naverLogin.click();
		}
	}
}

</script>
