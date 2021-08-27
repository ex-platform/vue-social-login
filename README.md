# @ex-platform/vue-social-login

- 네이버
- 카카오
- 구글
- 페이스북

## Preparation

소셜 로그인 제공사의 개발자 페이지에서 키발급이 필요 합니다.
해당 키는 `sdk` 연결에 사용 됩니다.

- [네이버 개발자 페이지][naverlink]

- [카카오 개발자 페이지][kakaolink]

- [구글 개발자 페이지][googlelink]

- [페이스북 개발자 페이지][facebooklink]

[naverlink]: https://developers.naver.com/products/login/api/api.md
[kakaolink]: https://developers.kakao.com/docs/latest/ko/kakaologin/common
[googlelink]: https://developers.google.com/identity/sign-in/web/sign-in
[facebooklink]: https://developers.facebook.com/docs/facebook-login/web

## Installation

```
yarn add @ex-platform/vue-social-login
```

## Usage

```
<script setup>
import {
	NaverLogin,
	KakaoLogin,
	GoogleLogin,
	FacebookLogin,
} from '@ex-platform/vue-social-login';

function setUserInfo(userInfo) {
  console.log('SET USER INFO');
}

function failToLogin(error) {
  console.log('FAIL TO LOGIN');
}

// 네이버 로그인 버튼 클릭을 위한 함수
function onClickNaver() {
  const naverLogin = document.getElementById("naverIdLogin").firstChild;
  return naverLogin.click();
}

<script/>

<template>
	<div>
		<div class="naver" @click="onClickNaver">
			<p>네이버 로그인</p>
			<NaverLogin
				clientId="NAVER_CLIENT_ID"
				callbackUrl="NAVER_CALLBACK_URL"
				:success="successLogin"
				:fail="failLogin"
			/>
		</div>
		<div class="kakao">
			<p>카카오 로그인</p>
			<KakaoLogin
				apiKey="KAKAO_API_KEY"
				:sucess="setUserInfo"
				:fail="failToLogin"
			/>
		</div>
		<div class="google">
			<p>구글 로그인</p>
			<GoogleLogin
				clientId="GOOGLE_CLIENT_ID"
				:sucess="setUserInfo"
				:fail="failToLogin"
			/>
		</div>
		<div class="facebook">
			<p>페이스북 로그인</p>
			<FacebookLogin
				appId="APP_ID인
				:success="successLogin"
				:fail="failLogin"
			/>
		</div>
	</div>
</template>

// 로그인 버튼 커스텀 스타일을 적용하여 사용
<style>
.google {
  cursor: pointer;
  width: 300px;
  height: 100px;
  background-color: gray;
}
.kakao {
	// 부모 영역 position: relative 필수
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
```
