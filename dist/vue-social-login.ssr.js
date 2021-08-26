'use strict';var vue=require('vue');function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}function naverService() {
    let naverLogin;
    const initiate = (clientId, callbackUrl, isPopup, buttonStyles) => {
        naverLogin = new window.naver.LoginWithNaverId({
            clientId,
            callbackUrl,
            isPopup,
            loginButton: {
                color: buttonStyles.buttonColor,
                type: buttonStyles.buttonType,
                height: buttonStyles.buttonHeight,
            } /* 로그인 버튼의 타입을 지정 */,
        });
        setNaver();
    };
    const initNaver = (clientId, callbackUrl, isPopup, success, fail, buttonStyles) => {
        const scriptId = 'naver_login';
        const isExist = !!document.getElementById(scriptId);
        if (!isExist) {
            const script = document.createElement('script');
            script.src = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js';
            script.onload = () => {
                initiate(clientId, callbackUrl, isPopup, buttonStyles);
                naverLogin.getLoginStatus((status) => {
                    if (status) {
                        success(naverLogin);
                    }
                    else {
                        fail();
                    }
                });
            };
            script.onerror = error => console.log(error);
            script.id = scriptId;
            document.head.appendChild(script);
        }
    };
    const setNaver = () => {
        naverLogin.init();
    };
    const getUserInfo = () => {
        setNaver();
        naverLogin.getLoginStatus((status) => {
            if (status) {
                const email = naverLogin.user.email;
                const name = naverLogin.user.name;
                console.log(email, name);
            }
            else {
                console.log("AccessToken이 올바르지 않습니다.");
            }
        });
    };
    return {
        initNaver,
        setNaver,
        getUserInfo,
    };
}async function loadInitFacebook(appId) {
    await loadFacebookSDK('facebook-jssdk');
    await initFacebook(appId);
    // window.FB.login((response: any) => {
    // 	if (response.authResponse) {
    // 		alert("You are logged in &amp; cookie set!");
    // 	} else {
    // 		alert("User cancelled login or did not fully authorize.");
    // 	}
    // });
    // return false;
}
async function initFacebook(appId) {
    window.fbAsyncInit = function () {
        window.FB.init({
            appId,
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v11.0'
        });
    };
}
async function loadFacebookSDK(id) {
    let js, fjs = document.getElementsByTagName('script')[0];
    if (document.getElementById(id)) {
        return;
    }
    js = document.createElement('script');
    js.id = id;
    js.src = 'https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v11.0';
    js.async = true;
    if (fjs.parentNode) {
        fjs.parentNode.insertBefore(js, fjs);
    }
}
async function loginWithFacebook() {
    window.FB.login(function (response) {
        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            //console.log(response); // dump complete info
            let access_token = response.authResponse.accessToken; //get access token
            let user_id = response.authResponse.userID; //get FB UID
            console.log(`access_token`, access_token);
            console.log(`user_id`, user_id);
            window.FB.api('/me', function (response) {
                let user_email = response.email; //get user email
                console.log(`user_email`, user_email);
                // you can store this data into your database             
            });
        }
        else {
            //user hit cancel button
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {
        scope: 'public_profile,email'
    });
}class KakaoService {
    constructor(props) {
        this.props = props;
    }
    initiate() {
        const scriptId = 'kakao-login-sdk';
        const isExist = !!document.getElementById(scriptId);
        if (!isExist) {
            const script = document.createElement('script');
            script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
            script.onload = () => window.Kakao.init(this.props.apiKey);
            script.onerror = (error) => console.log('APPEND SCRIPT ERROR - ', error);
            script.id = scriptId;
            document.head.appendChild(script);
        }
    }
    async login() {
        await window.Kakao.Auth.login({
            success: () => this.getUserInfo(),
            fail: (error) => {
                console.log('KAKAO LOGIN ERROR - ', error);
                this.props.fail(error);
            }
        });
    }
    async getUserInfo() {
        await window.Kakao.API.request({
            url: '/v2/user/me',
            success: (userInfo) => {
                console.log('GET KAKAO USER INFO - ', userInfo);
                this.props.success(userInfo);
            },
            fail: (error) => {
                console.log('GET KAKAO USER INFO - ', error);
                this.props.fail(error);
            },
        });
    }
}class GoogleService {
    constructor(props) {
        this.props = props;
    }
    initiate() {
        const scriptId = 'google-login-sdk';
        const isExist = !!document.getElementById(scriptId);
        if (!isExist) {
            const script = document.createElement('script');
            script.src = 'https://apis.google.com/js/api:client.js';
            script.onload = () => this.loadAndAttachLoginFunc();
            script.onerror = (error) => console.log('APPEND SCRIPT ERROR - ', error);
            script.id = scriptId;
            document.head.appendChild(script);
        }
    }
    async loadAndAttachLoginFunc() {
        await window.gapi.load('auth2', () => {
            const auth = window.gapi.auth2.init({
                client_id: this.props.clientId,
                cookiepolicy: 'single_host_origin',
            });
            const element = document.querySelector('#' + this.props.elementId);
            auth.attachClickHandler(element, {}, (user) => this.successCallback(user), (error) => this.failCallback(error));
        });
    }
    async successCallback(user) {
        console.log('GOOGLE LOGIN SUCCESS');
        const result = {
            name: await user.getBasicProfile().getName(),
        };
        this.props.success(result);
    }
    failCallback(error) {
        console.log('GOOGLE LOGIN FAIL - ', error);
        this.props.fail();
    }
}var script$3 = {
  name: 'GoogleLogin',
  props: {
    clientId: {
      type: String,
      required: true
    },
    success: {
      type: Function,
      required: true
    },
    fail: {
      type: Function,
      required: true
    }
  },
  data: function data() {
    var googleLoginButtonId = 'google-login-button';
    return {
      googleLoginButtonId: googleLoginButtonId,
      googleLoginService: new GoogleService({
        clientId: this.clientId,
        elementId: googleLoginButtonId,
        success: this.success,
        fail: this.fail
      })
    };
  },
  mounted: function mounted() {
    this.googleLoginService.initiate();
  }
};var img$1 = "data:image/png;base64,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";
  var _imports_0$1 = img$1;var _hoisted_1$3 = ["id"];

var _hoisted_2$3 = /*#__PURE__*/vue.createElementVNode("img", {
  src: _imports_0$1,
  alt: "구글 로그인"
}, null, -1);

var _hoisted_3 = [_hoisted_2$3];
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("button", {
    id: $data.googleLoginButtonId
  }, _hoisted_3, 8, _hoisted_1$3);
}script$3.render = render$3;var script$2 = {
  name: 'KakaoLogin',
  props: {
    apiKey: {
      type: String,
      required: true
    },
    success: {
      type: Function,
      required: true
    },
    fail: {
      type: Function,
      required: true
    }
  },
  data: function data() {
    return {
      kakaoService: new KakaoService({
        apiKey: this.apiKey,
        success: this.success,
        fail: this.fail
      })
    };
  },
  mounted: function mounted() {
    this.kakaoService.initiate();
  }
};var img = "data:image/png;base64,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";
  var _imports_0 = img;var _hoisted_1$2 = /*#__PURE__*/vue.createElementVNode("img", {
  src: _imports_0,
  alt: "카카오 로그인"
}, null, -1);

var _hoisted_2$2 = [_hoisted_1$2];
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("button", {
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return $data.kakaoService.login();
    })
  }, _hoisted_2$2);
}script$2.render = render$2;var script$1 = {
  name: 'NaverLogin',
  props: {
    clientId: {
      type: String,
      required: true
    },
    callbackUrl: {
      type: String,
      required: true
    },
    success: {
      type: Function,
      required: true
    },
    fail: {
      type: Function,
      required: true
    },
    isPopup: {
      type: Boolean,
      "default": false
    },
    buttonColor: {
      type: String,
      "default": 'green'
    },
    buttonType: {
      type: Number,
      "default": 3
    },
    buttonHeight: {
      type: Number,
      "default": 60
    }
  },
  data: function data() {
    return {
      naverService: naverService(),
      buttonStyles: {
        buttonColor: this.buttonColor,
        buttonType: this.buttonType,
        buttonHeight: this.buttonHeight
      }
    };
  },
  mounted: function mounted() {
    this.naverService.initNaver(this.clientId, this.callbackUrl, this.isPopup, this.success, this.fail, this.buttonStyles);
  },
  methods: {
    onClickNaver: function onClickNaver() {
      var naverLogin = document.getElementById("naverIdLogin").firstChild;
      return naverLogin.click();
    }
  }
};var _hoisted_1$1 = /*#__PURE__*/vue.createElementVNode("div", {
  id: "naverIdLogin"
}, null, -1);

var _hoisted_2$1 = [_hoisted_1$1];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    "class": "naver-login",
    onClick: _cache[0] || (_cache[0] = function () {
      return $options.onClickNaver && $options.onClickNaver.apply($options, arguments);
    })
  }, _hoisted_2$1);
}script$1.render = render$1;var script = {
  name: 'FacebookLogin',
  props: {
    appId: {
      type: String,
      required: true
    }
  },
  data: function data() {
    return {
      loadInitFacebook: loadInitFacebook,
      loginWithFacebook: loginWithFacebook
    };
  },
  mounted: function mounted() {
    this.loadInitFacebook(this.appId);
  }
};var _hoisted_1 = /*#__PURE__*/vue.createElementVNode("div", {
  "class": "fb-login-button",
  "data-width": "",
  "data-size": "medium",
  "data-button-type": "login_with",
  "data-layout": "default",
  "data-auto-logout-link": "false",
  "data-use-continue-as": "false"
}, null, -1);

var _hoisted_2 = [_hoisted_1];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    "class": "facebook-login",
    onClick: _cache[0] || (_cache[0] = function () {
      return $data.loginWithFacebook && $data.loginWithFacebook.apply($data, arguments);
    })
  }, _hoisted_2);
}function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}var css_248z = "\n.fb_iframe_widget iframe {\n\twidth: 100%;\n\theight: 100%;\n  /* opacity: 0; */\n}\n.fb_iframe_widget {\n  /* background-image: url(another-button.png); */\n  background-repeat: no-repeat;\n}\n";
styleInject(css_248z);script.render = render;/* eslint-disable import/prefer-default-export */var components$1=/*#__PURE__*/Object.freeze({__proto__:null,GoogleLogin: script$3,KakaoLogin: script$2,NaverLogin: script$1,FacebookLogin: script});var install = function installVueSocialLogin(app) {
  Object.entries(components$1).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    console.log("componentName", componentName);
    app.component(componentName, component);
  });
}; // Create module definition for Vue.use()
var components=/*#__PURE__*/Object.freeze({__proto__:null,'default': install,GoogleLogin: script$3,KakaoLogin: script$2,NaverLogin: script$1,FacebookLogin: script});// only expose one global var, with component exports exposed as properties of
// that global var (eg. plugin.component)

Object.entries(components).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      componentName = _ref2[0],
      component = _ref2[1];

  if (componentName !== 'default') {
    install[componentName] = component;
  }
});module.exports=install;