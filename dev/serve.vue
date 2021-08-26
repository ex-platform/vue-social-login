<script>
import { defineComponent } from 'vue';
import GoogleLogin from '../src/lib-components/GoogleLogin.vue';
import KakaoLogin from '../src/lib-components/KakaoLogin.vue';


function successLogin(userInfo) {
  console.log(`userInfo`, userInfo);
  // window.location.replace("http://" + window.location.hostname + ( (location.port==""||location.port==undefined)?"":":" + location.port) + "/sample/main.html");
}

function failLogin() {
  console.log('FAIL LOGIN');
}

export default defineComponent({
	name: 'ServeDev',
	components: {
		GoogleLogin,
		KakaoLogin
	},
  methods: {
    successLogin,
    failLogin,
  }
});
</script>

<template>
  <div id="app">
    <GoogleLogin />
    <KakaoLogin />
    <NaverLogin 
      clientId="gDSlwK4LOr_cjDAs4tLb"
      callbackUrl="http://localhost:8080/"
      :success="successLogin"
      :fail="failLogin"
    />
  </div>
</template>
