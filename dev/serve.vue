<script>
import { defineComponent } from 'vue';
import GoogleLogin from '../src/lib-components/GoogleLogin.vue';
import KakaoLogin from '../src/lib-components/KakaoLogin.vue';


export default defineComponent({
	name: 'ServeDev',
	components: {
		GoogleLogin,
		KakaoLogin
	}
});
</script>

<template>
	<div id="app">
		<GoogleLogin />
		<KakaoLogin />
	</div>
</template>
