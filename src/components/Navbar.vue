<template>
  <md-app>
    <md-app-toolbar class="md-primary" md-elevation="0">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">LOGO</span>
      <span class="md-title" @click="$router.push({ name: 'home' })">HOME</span>
    </md-app-toolbar>

    <md-app-drawer :md-active.sync="showNavigation" :md-persistent="isMobile">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span>Navigation</span>

        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button md-dense" @click="toggleMenu">
            <md-icon>keyboard_arrow_left</md-icon>
          </md-button>
        </div>
      </md-toolbar>
      <md-list>
        <div>
          <md-list-item>
            <i class="material-icons">feedback</i>
            <span
              class="md-list-item-text"
              @click="$router.push({ name: 'admin' })"
              >관리자</span
            >
          </md-list-item>
        </div>
        <div v-if="isLogin">
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span
              class="md-list-item-text"
              @click="$store.dispatch('LOGOUT')"
              >{{ userInfo.username }}</span
            >
          </md-list-item>
          <md-list-item @click="$store.dispatch('LOGOUT')">
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">로그아웃</span>
          </md-list-item>
        </div>
        <div v-else>
          <md-list-item @click="$router.push({ name: 'login' })">
            <i class="material-icons">account_circle</i>
            <span class="md-list-item-text">로그인</span>
          </md-list-item>

          <md-list-item @click="$router.push({ name: 'signup' })">
            <i class="material-icons">assignment</i>
            <span class="md-list-item-text">회원가입</span>
          </md-list-item>
        </div>
        <md-list-item @click="$router.push({ name: 'profile' })">
          <i class="material-icons">person_outline</i>
          <span class="md-list-item-text">프로파일</span>
        </md-list-item>
        <md-list-item @click="$router.push({ name: 'register' })">
          <i class="material-icons">add_to_queue</i>
          <span class="md-list-item-text">문제등록</span>
        </md-list-item>
        <md-list-item @click="$router.push({ name: 'library' })">
          <i class="material-icons">photo_library</i>
          <span class="md-list-item-text">Library</span>
        </md-list-item>
        <md-list-item @click="$router.push({ name: 'registerImage' })">
          <i class="material-icons">photo_album</i>
          <span class="md-list-item-text">Library 등록</span>
        </md-list-item>
      </md-list>
    </md-app-drawer>

    <md-app-content>
      <router-view></router-view>
    </md-app-content>
  </md-app>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "PersistentMini",
  data: () => ({
    menuVisible: false,
    showNavigation: false,
    showSidepanel: false
  }),
  computed: {
    ...mapState(["userInfo", "isLogin"]),
    isMobile: function() {
      if (window.screen.availWidth < 500) {
        return "full";
      } else {
        return "mini";
      }
    }
  },
  watch: {
    // handleNavbar() {
    //   console.log("handleNavbar");
    //   if (window.screen.availWidth < 500) {
    //     console.log("window.screen.availWidth", window.screen.availWidth);
    //     this.isMobile = "mini";
    //   } else {
    //     this.isMobile = "full";
    //   }
    // }
  },
  methods: {
    ...mapActions(["LOGOUT"]),
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
      this.showNavigation = false;
    }
  }
};
</script>

<style scoped>
.md-app-content {
  padding: 0;
  margin: 0;
}
.md-content,
.md-flex {
  padding: 0;
}
.md-content.md-theme-default {
  padding: 0;
  background: #2d4468;
}
.md-app {
  height: 100vh;
  /* // border: 1px solid rgba(#000, 0.12); */
  z-index: 9999;
}
.material-icons {
  font-size: 30px;
}
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
  z-index: 9999;
}
span {
  padding: 0 10px;
  margin: 0 10px;
  cursor: pointer;
}
</style>
