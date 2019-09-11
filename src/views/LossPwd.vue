<template>
  <div class="container">
    <div class="md-layout-item contentWrap">
      <h1>비밀번호 찾기</h1>
      <div class="md-layout">
        <div class="md-layout-item">
          <md-field>
            <label>이메일</label>
            <md-input v-model="email"></md-input>
          </md-field>
        </div>
      </div>
      <md-button class="btn" @click="submit">이메일로 인증번호 전송</md-button>
      <p>
        아직 회원가입을 안하셨나요?
        <a href="/signup">회원가입</a>
      </p>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios";
import { BASE_URL } from "../config/env";

export default {
  data() {
    return {
      email: null
    };
  },

  computed: {
    ...mapState(["isLogin", "isLoginError"])
  },
  methods: {
    submit() {
      if (!this.email) {
        alert("이메일 입력해주세요");
      }
      let email = this.email;
      console.log("this.email", this.email);
      axios
        .post(BASE_URL + "/accounts/lostpass", { email })
        .then(res => {
          console.log("res", res);
          if (res.data.code == 409) {
            return alert("이미 회원 가입을 하였습니다.");
          } else {
            this.$router.push({ name: "login" });
          }
        })
        .catch(err => {
          console.log(err);
          alert("다시 등록 해주세요.");
        });
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
  max-width: 480px;
  min-height: 350px;
  border: 1px solid #ccc;
  background: #fff;
  padding: 40px 5% 40px 5%;
  box-shadow: 0px 5px 7px 0 rgba(124, 118, 190, 0.6);
}
.contentWrap > h1 {
  font-size: 1.6em;
  margin: 15px;
}
.contentWrap > p {
  text-align: left;
  margin: 10px;
}
.btn {
  margin: 0 auto;
  width: 100%;
  height: 50px;
  border: 1px solid #448aff;
  border-radius: 25px;
  background-color: #448aff;
  margin: 20px 0 20px 0;
  color: #fff;
  font-size: 18px;
}
.losspawd {
  text-align: left;
  margin: 0;
}
#losspawd {
  color: #888;
}
.contentWrap > .btn:hover {
  cursor: pointer;
}
@media all and (max-width: 750px) {
  .contentWrap {
    width: 85%;
  }
}
@media all and (max-width: 500px) {
  .contentWrap > p {
    font-size: 8px;
    margin: 20px 10px 0;
  }
  .contentWrap {
    margin: 50px auto;
    max-width: 500px;
    height: 400px;
    border: 1px solid #ccc;
    background: #fff;
    padding: 20px 0 20px 0;
    box-shadow: 10px 5px 11px 0 rgba(219, 90, 90, 0.7);
  }
}
</style>
