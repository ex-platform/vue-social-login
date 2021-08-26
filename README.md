@ex-platform/vue-social-login
===

- 네이버
- 카카오
- 구글
- 페이스북

Preparation
---
소셜 로그인 제공사의 개발자 페이지에서 키발급이 필요 합니다.
해당 키는 `sdk` 연결에 사용 됩니다.

- [네이버 개발자 페이지][naverLink] 

- [카카오 개발자 페이지][kakaoLink]

- [구글 개발자 페이지][googleLink]

- [페이스북 개발자 페이지][facebookLink]

[naverLink]: https://developers.naver.com/products/login/api/api.md
[kakaoLink]: https://developers.kakao.com/docs/latest/ko/kakaologin/common
[googleLink]: https://developers.google.com/identity/sign-in/web/sign-in
[facebookLink]: https://developers.facebook.com/docs/facebook-login/web

Installation
---
```
yarn add @ex-platform/vue-social-login
```

Usage
---
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

<script/>

<template>
	<div>
		<NaverLogin
			clientId="NAVER_CLIENT_ID"
			callbackUrl="NAVER_CALLBACK_URL"
		/>
		<KakaoLogin
			apiKey="KAKAO_API_KEY"
			:sucess="setUserInfo"
			:fail="failToLogin"
		/>
		<GoogleLogin
			clientId="GOOGLE_CLIENT_ID"
			:sucess="setUserInfo"
			:fail="failToLogin"
		/>
		<FacebookLogin
			appId="APP_ID"
		/>
	</div>
</template>
```

