<template>
  <div class="wrap">
    <div class="top">
      <md-button class="md-icon-button">
        <md-icon>menu</md-icon>
      </md-button>
      <header>
        <h1 @click="moveTo()">HOME</h1>
      </header>
    </div>
    <div class="left">
      <ul>
        <div v-if="isLogin">
          <li @click="$router.push({ name: 'admin' })">
            <img src="@/assets/images/home/005-user.svg" alt="icon" />관리자
          </li>
          <li>
            <img src="@/assets/images/home/id-card.svg" alt="icon" />
            {{ userInfo.username }}
          </li>
        </div>
        <div v-else>
          <li @click="$router.push({ name: 'login' })">
            <img src="@/assets/images/home/006-lock.svg" />로그인
          </li>
          <li @click="$router.push({ name: 'signup' })">
            <img src="@/assets/images/home/007-photos.svg" />회원가입
          </li>
        </div>
        <li @click="$router.push({ name: 'register' })">
          <img src="@/assets/images/home/004-pencil.svg" alt="icon" />문제등록
        </li>
        <div v-if="isLogin">
          <li @click="logout">
            <img src="@/assets/images/home/006-lock.svg" alt="icon" />로그아웃
          </li>
        </div>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    menuVisible: true,
    showNavigation: true,
    showSidepanel: false,
    // isMobile: "mini"
    searchWord: null
  }),
  computed: {
    ...mapState(["userInfo", "isLogin"]),
    isMobile: function() {
      if (window.screen.availWidth < 500) {
        return;
      } else {
        return "mini";
      }
    }
  },
  methods: {
    // toggleMenu() {
    //   this.menuVisible = !this.menuVisible;
    //   if (this.menuVisible == false) {
    //     this.$refs.sideBar.style.width = "230px";
    //     this.$refs.sideBar.style.position = "fixed";
    //   } else {
    //     this.$refs.sideBar.style.width = "0";
    //     this.$refs.sideBar.style.position = "static";
    //   }
    // },
    // openSideBar() {
    //   this.$refs.sideBar.style.width = "148px";
    // },
    // closeSideBar() {
    //   this.$refs.sideBar.style.width = "0";
    //   this.$refs.sideBar.style.position = "static";
    // },
    ...mapActions(["LOGOUT"]),
    // toggleMenu() {
    //   this.menuVisible = !this.menuVisible;
    //   this.showNavigation = false;
    // },
    logout() {
      let result = confirm("로그아웃 하시겠습니까?");
      if (result == false) return;
      this.$store.dispatch("LOGOUT");
    },
    moveTo() {
      window.location.href = "/";
    }
  }
};
</script>

<style scoped>
.wrap {
  width: 100%;
}
.top {
  position: fixed;
  width: calc(100%);
  border-bottom: #fafafa;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  z-index: 99999;
  height: 65px;
  right: 0;
  background: white;
  line-height: 64px;
  text-align: left;
  padding-left: 20px;
}
.left {
  position: fixed;
  z-index: 99999;
  top: 65px;
  width: 230px;
  height: calc(100% - 65px);
  background: white;
  padding: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  text-align: left;
  /* transition: 0.38s; */
}
.left ul {
  margin-top: 50px;
}
.left li {
  font-size: 14px;
  color: #0d0d0d;
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
  margin-bottom: 10px;
  transition: all 0.5s;
}
.left li:hover {
  cursor: pointer;
}
.left li img {
  height: 30px;
  margin-right: 20px;
}
</style>
