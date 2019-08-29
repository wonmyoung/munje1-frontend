<template>
  <div id="side-menu" class="side-nav">
    <a href="#" class="btn-close" onclick="closeSlideMenu()">
      <Library />
    </a>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Library from "@/views/Library";
export default {
  components: { Library },
  name: "PersistentMini",
  data: () => ({
    menuVisible: false
  }),
  computed: {
    ...mapState(["userInfo", "isLogin"])
  },
  methods: {
    ...mapActions(["LOGOUT"]),
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    }
  }
};
</script>

<style lang="scss" scoped>
.md-app {
  min-height: 800px;
  border: 1px solid rgba(#000, 0.12);
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
span {
  padding: 0 10px;
  margin: 0 10px;
  cursor: pointer;
}
</style>
