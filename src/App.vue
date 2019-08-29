<template>
  <div id="app">
    <Navbar />
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {
      //
    };
  },
  computed: {
    ...mapState(["visible"])
  }
};
</script>
