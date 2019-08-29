<template>
  <div class="container">
    <div class="md-layout-item contentWrap">
      <h1>로그인</h1>
      <div class="md-layout">
        <div class="md-layout-item">
          <md-field>
            <label>이메일</label>
            <md-input v-model="email"></md-input>
          </md-field>
          <md-field md-inline>
            <label>비밀번호</label>
            <md-input
              v-model="password"
              type="password"
              @keyup.enter="login"
            ></md-input>
          </md-field>
        </div>
      </div>
      <md-button class="btn" @click="login">로그인</md-button>
      <p>
        아직 회원가입을 안하셨나요?
        <a href="/signup">회원가입</a>
      </p>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      email: null,
      password: null
    };
  },

  computed: {
    ...mapState(["isLogin", "isLoginError"])
  },
  methods: {
    login() {
      if (!this.email || !this.password) {
        alert("이메일과 비밀번호를 입력해주세요");
      }
      const { email, password } = this;
      this.$store.dispatch("LOGIN", { email, password });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  //   outline: 1px solid #ccc;
}
.contentWrap {
  margin: 70px auto;
  max-width: 500px;
  height: 400px;
  border: 1px solid #ccc;
  background: #fff;
  padding: 40px 7% 20px 7%;
  box-shadow: 0px 5px 7px 0 rgba(124, 118, 190, 0.6);
}
.contentWrap > h1 {
  font-size: 1.7em;
  margin: 15px;
}
.contentWrap > p {
  margin: 10%;
}
.btn {
  margin: 0 auto;
  width: 100%;
  height: 50px;
  border: 1px solid #448aff;
  border-radius: 25px;
  background-color: #448aff;
  margin-top: 20px;
}
.contentWrap > .btn:hover {
  cursor: pointer;
}

@media all and (max-width: 500px) {
  .contentWrap > p {
    font-size: 10px;
  }
  .contentWrap {
    margin: 50px auto;
    max-width: 500px;
    height: 320px;
    border: 1px solid #ccc;
    background: #fff;
    padding: 20px 0 20px 0;
    box-shadow: 10px 5px 11px 0 rgba(219, 90, 90, 0.7);
  }
  .contentWrap > p {
    margin: 50px;
  }
}
</style>
