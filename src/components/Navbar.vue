<template>
  <md-app>
    <md-app-toolbar class="white" md-elevation="0">
      <md-button
        v-if="showNavigation == false"
        class="md-icon-button"
        @click="showNavigation = true"
      >
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title" @click="$router.push({ name: 'home' })">LOGO</span>
      <span class="md-title" @click="$router.push({ name: 'home' })">HOME</span>
    </md-app-toolbar>

    <!-- <md-app-drawer :md-active.sync="showNavigation"> -->
    <md-app-drawer :md-permanent="showNavigation" :md-active.sync="showNavigation">
      <md-toolbar class="md-transparent" md-elevation="0">
        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button md-dense" @click="toggleMenu">
            <md-icon>menu</md-icon>
          </md-button>
        </div>
      </md-toolbar>
      <md-list>
        <div>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text" @click="$router.push({ name: 'admin' })">관리자</span>
          </md-list-item>
        </div>
        <div v-if="isLogin">
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text" @click="$router.push('profile')">
              {{
              userInfo.username
              }}
            </span>
          </md-list-item>
          <md-list-item @click="$store.dispatch('LOGOUT')">
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">로그아웃</span>
          </md-list-item>
        </div>
        <div v-else>
          <md-list-item @click="$router.push({ name: 'login' })">
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">로그인</span>
          </md-list-item>

          <md-list-item @click="$router.push({ name: 'signup' })">
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">회원가입</span>
          </md-list-item>
        </div>
        <md-list-item @click="$router.push({ name: 'profile' })">
          <md-icon>delete</md-icon>
          <span class="md-list-item-text">프로파일</span>
        </md-list-item>
        <md-list-item @click="$router.push({ name: 'register' })">
          <md-icon>send</md-icon>
          <span class="md-list-item-text">문제등록</span>
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
    showNavigation: true,
    showSidepanel: false
    // isMobile: "mini"
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
    }
  }
};
</script>

<style scoped>
.md-app-toolbar {
  box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
}
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
  background: #fafafa;
}
.md-app {
  height: 100vh;
  /* // border: 1px solid rgba(#000, 0.12); */
  z-index: 9999;
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
