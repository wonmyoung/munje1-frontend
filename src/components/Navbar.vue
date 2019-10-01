<template>
  <md-app>
    <md-app-toolbar class="white" md-elevation="0">
      <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
        <md-icon>menu</md-icon>
      </md-button>
      <!-- <span class="md-title" @click="$router.push({ name: 'home' })">LOGO</span> -->
      <span class="md-title" @click="$router.push({ name: 'home' })">HOME</span>
    </md-app-toolbar>

    <md-app-drawer :md-active.sync="menuVisible" md-persistent="full">
      <!-- <md-app-drawer :md-permanent="showNavigation" :md-active.sync="showNavigation"> -->

      <md-toolbar class="md-transparent" md-elevation="0">
        <div class="md-toolbar-section-start">
          <md-button class="md-icon-button md-dense" @click="toggleMenu">
            <md-icon>menu</md-icon>
          </md-button>
          <input type="text " />
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
          <md-list-item @click="logout">
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
    }
  }
};
</script>

<style scoped>
.md-app-toolbar {
  box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
  border-bottom: #fafafa;
  z-index: 99999;
}
.md-app-drawer {
  z-index: 10;
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
.search {
  margin: 0 auto;
  text-align: center;
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
.md-app-content {
  padding: 0;
  margin: 0;
}
.md-content,
.md-flex {
  padding: 0;
}
/* 
.md-app {
  min-height: 100vh;
  z-index: 9999;
} */
.material-icons {
  font-size: 30px;
}
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
  z-index: 9999;
}

.md-list-item {
  width: 200px;
}
i img {
  width: 30px;
  margin-left: 20px;
}
</style>
