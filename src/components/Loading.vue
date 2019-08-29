<template>
  <div id="background" v-loading="loading"></div>
</template>

<style></style>

<script>
export default {
  props: ["loading"]
};
</script>
<style>
#background {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  left: 0;
  top: 0;
  z-index: 11;
  display: none;
  display: block;
}

#background.on {
  /* 모달창에 on클래스 붙으면 나온다 */
  display: block;
}
</style>
