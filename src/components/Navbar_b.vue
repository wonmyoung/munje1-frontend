<template>
  <div class="Wrap">
    <div class="top">
      <header>
        <h1>HOME</h1>
      </header>
    </div>
    <ul class="left">
      <li>
        <img src="@/assets/images/home/005-user.svg" alt="icon" />관리자
      </li>
      <li>
        <img src="@/assets/images/home/004-pencil.svg" alt="icon" />문제등록
      </li>
      <li>
        <img src="@/assets/images/home/id-card.svg" alt="icon" />프로필
      </li>
      <li>
        <img src="@/assets/images/home/006-lock.svg" alt="icon" />로그아웃
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "PersistentMini",
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
    ...mapActions(["LOGOUT"]),
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
      this.showNavigation = false;
    },
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
.Wrap {
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
}
.left li {
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
  transition: all 0.5s;
}
.left li:hover {
  background: #cccccc;
}
.left li img {
  height: 30px;
  margin-right: 10px;
}
</style>
