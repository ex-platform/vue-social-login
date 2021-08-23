import GoogleLogin from './components/GoogleLogin';
import KakaoLogin from './components/KakaoLogin.vue';

module.exports = {
  install: function (Vue, options) {
    Vue.component('vue-social-login/google', GoogleLogin)
    Vue.component('vue-naver-login/kakao', KakaoLogin)
  },
};