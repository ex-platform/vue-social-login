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
async function loginWithFacebook(success, fail) {
    window.FB.login(function (response) {
        if (response.authResponse) {
            let access_token = response.authResponse.accessToken; //get access token
            let user_id = response.authResponse.userID; //get FB UID
            console.log(`access_token`, access_token);
            console.log(`user_id`, user_id);
            window.FB.api('/me', function (response) {
                if (response) {
                    success(response);
                }
                else {
                    fail();
                }
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
};var _hoisted_1$1 = ["id"];
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    "class": "google-login",
    id: $data.googleLoginButtonId
  }, null, 8, _hoisted_1$1);
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
}var css_248z$2 = "\n.google-login {\n\twidth: 100%;\n\theight: 100%;\n}\n";
styleInject(css_248z$2);script$3.render = render$3;var script$2 = {
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
};function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    "class": "kakao-login",
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return $data.kakaoService.login();
    })
  });
}var css_248z$1 = "\n.kakao-login {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n}\n";
styleInject(css_248z$1);script$2.render = render$2;var script$1 = {
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
  }
};var _hoisted_1 = {
  id: "naverIdLogin",
  style: {
    "visibility": "hidden"
  }
};
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1);
}script$1.render = render$1;var script = {
  name: 'FacebookLogin',
  props: {
    appId: {
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
      loadInitFacebook: loadInitFacebook,
      loginWithFacebook: loginWithFacebook
    };
  },
  mounted: function mounted() {
    this.loadInitFacebook(this.appId);
  }
};function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _this = this;

  return vue.openBlock(), vue.createElementBlock("div", {
    "class": "facebook-login",
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return $data.loginWithFacebook(_this.success, _this.fail);
    })
  });
}var css_248z = "\n.facebook-login {\n\twidth: 100%;\n\theight: 100%;\n}\n";
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