<script>
import { defineComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { VueSocialLoginSample } from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
  // components: {
  //  VueSocialLoginSample,
  // }
});
</script>

<template>
  <div id="app">
    <GoogleLogin />
    <KakaoLogin />
  </div>
</template>
