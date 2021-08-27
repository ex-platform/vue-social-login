<script>
import { defineComponent } from 'vue';

function successLogin(userInfo) {
  console.log(`userInfo`, userInfo);
  // window.location.replace("http://" + window.location.hostname + ( (location.port==""||location.port==undefined)?"":":" + location.port) + "/sample/main.html");
}

function failLogin() {
  console.log('FAIL LOGIN');
}

function onClickNaver() {
  const naverLogin = document.getElementById("naverIdLogin").firstChild;
  return naverLogin.click();
}

export default defineComponent({
	name: 'ServeDev',
  methods: {
    successLogin,
    failLogin,
    onClickNaver,
  }
});
</script>

<template>
  <div id="app">
    <div class="google">
      <p>구글 로그인</p>
      <GoogleLogin 
        clientId="499740165980-8mhvjr9lbb5ee7rjipdjk22huoreuk7n.apps.googleusercontent.com"
        :success="setUserInfo"
        :fail="failToLogin"
      />
    </div>
    <div class="kakao">
      <p>카카오 로그인</p>
      <KakaoLogin 
        apiKey="eeb3b1befc26f63a5bb54526fec61a8e"
        :success="setUserInfo"
        :fail="failToLogin"
      />
    </div>
    <div class="naver" @click="onClickNaver">
      <p>네이버 로그인</p>
      <NaverLogin 
        clientId="gDSlwK4LOr_cjDAs4tLb"
        callbackUrl="http://localhost:8080/"
        :success="successLogin"
        :fail="failLogin"
      />
    </div>
    <div class="facebook">
      <p>페이스북 로그인</p>
      <FacebookLogin 
        appId="1019241728499676" 
        :success="successLogin"
        :fail="failLogin"
      />
    </div>
  </div>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.google {
  cursor: pointer;
  width: 300px;
  height: 100px;
  background-color: gray; 
}
.kakao {
  position: relative;
  cursor: pointer;
  width: 300px;
  height: 100px;
  background-color: yellow; 
}
.naver {
  cursor: pointer;
  width: 300px;
  height: 100px;
  background-color: yellowgreen;
}
.facebook {
  cursor: pointer;
  width: 300px;
  height: 100px;
  background-color: blue;
}
</style>
