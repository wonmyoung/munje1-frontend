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
        <div v-if="isLogin">
          <md-list-item @click="$router.push({ name: 'admin' })">
            <i>
              <img src="@/assets/images/home/005-user.svg" />
            </i>
            <span class="md-list-item-text">관리자</span>
          </md-list-item>
        </div>
        <div v-if="isLogin">
          <md-list-item @click="$router.push({ name: 'profile' })">
            <i>
              <img src="@/assets/images/home/id-card.svg" />
            </i>
            <span class="md-list-item-text">{{ userInfo.username }}</span>
          </md-list-item>
          <md-list-item @click="$store.dispatch('LOGOUT')">
            <i>
              <img src="@/assets/images/home/006-lock.svg" />
            </i>
            <span class="md-list-item-text">로그아웃</span>
          </md-list-item>
        </div>
        <div v-else>
          <md-list-item @click="$router.push({ name: 'login' })">
            <i>
              <img src="@/assets/images/home/006-lock.svg" />
            </i>
            <span class="md-list-item-text">로그인</span>
          </md-list-item>

          <md-list-item @click="$router.push({ name: 'signup' })">
            <i>
              <img src="@/assets/images/home/007-photos.svg" />
            </i>
            <span class="md-list-item-text">회원가입</span>
          </md-list-item>
        </div>
        <!-- <md-list-item @click="$router.push({ name: 'profile' })">
          <i>
            <img src="@/assets/images/home/002-pass.svg" />
          </i>
          <span class="md-list-item-text">프로파일</span>
        </md-list-item>-->
        <md-list-item @click="$router.push({ name: 'register' })">
          <i>
            <img src="@/assets/images/home/004-pencil.svg" />
          </i>
          <span class="md-list-item-text">문제등록</span>
        </md-list-item>
        <md-list-item @click="$router.push({ name: 'library' })">
          <i>
            <img src="@/assets/images/home/003-photo.svg" />
          </i>
          <span class="md-list-item-text">Library</span>
        </md-list-item>
        <md-list-item @click="$router.push({ name: 'registerImage' })">
          <i>
            <img src="@/assets/images/home/001-plus.svg" />
          </i>
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
  min-height: calc(100vh - 64px);
  height: auto;
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
.md-list-item {
  width: 200px;
}
i img {
  width: 30px;
  margin-bottom: 10px;
}
</style>
