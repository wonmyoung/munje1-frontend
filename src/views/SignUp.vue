<template>
  <div class="container">
    <div class="md-layout-item contentWrap">
      <h1>회원가입</h1>
      <div class="md-layout">
        <md-field>
          <label>이메일</label>
          <md-input v-model="email"></md-input>
          <!-- <div class="error" v-if="errors.has('email')">{{errors.first('email')}}</div> -->
        </md-field>
        <md-field>
          <label>이름</label>
          <md-input v-model="username"></md-input>
        </md-field>
        <md-field md-inline>
          <label>비밀번호</label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>
        <md-field md-inline>
          <label>비밀번호 확인</label>
          <md-input v-model="password_2" type="password"></md-input>
        </md-field>
        <md-button class="btn" @click="submit">회원가입</md-button>
        <p>
          이미 회원가입 되었습니까?
          <a href="/login">로그인</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "../config/env";

export default {
  data() {
    return {
      email: null,
      username: null,
      password: null,
      password_2: null
    };
  },
  mounted() {
    this.setVisible();
  },
  methods: {
    emailValidate() {
      let exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

      if (exptext.test(this.email) == false) {
        //이메일 형식이 알파벳+숫자@알파벳+숫자.알파벳+숫자 형식이 아닐경우

        alert("이메일형식이 올바르지 않습니다.");

        document.addjoin.email.focus();

        return false;
      }
    },
    submit() {
      this.emailValidate();
      if (!this.email) {
        alert("이메일을 입력해주세요.");
        return;
      }
      if (!this.username) {
        alert("이름을 입력해주세요.");
        return;
      }
      if (!this.password) {
        alert("비밀번호를 입력해주세요.");
        return;
      }
      if (this.password != this.password_2) {
        alert("비밀번호를 다시 확인 하세요");
        return;
      }
      let data = {
        email: this.email,
        username: this.username,
        password: this.password_2
      };
      axios
        .post(BASE_URL + "/accounts/join", data)
        .then(res => {
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
    },
    setVisible() {
      this.$store.dispatch("SET_VISIBLE");
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  //   outline: 1px solid #ccc;
}
.contentWrap > h1 {
  font-size: 1.7em;
  margin: 15px;
}
.contentWrap {
  margin: 20px auto;
  width: 450px;
  border: 1px solid #ccc;
  background: #fff;
  border: 1px solid #ccc;
  padding: 4% 5% 3% 5%;
  box-shadow: 0 5px 7px 0 rgba(105, 105, 105, 0.5);
}
@media (max-width: 700px) {
  .contentWrap {
    width: 80%;
  }
}

.md-layout > p {
  margin: 10px auto;
}

.md-layout p > a {
  cursor: pointer;
}

.btn {
  width: 100%;
  height: 50px;
  border-radius: 25px;
  color: #fff;
  font-size: 18px;
  background-color: #448aff;
  border: 1px solid #ccc;
}

@media all and (max-width: 500px) {
  .contentWrap > p {
    font-size: 12px;
    margin: 20px 15px 0;
  }
}
</style>
