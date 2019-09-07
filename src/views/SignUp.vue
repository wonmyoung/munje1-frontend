<template>
  <div class="container">
    <div class="md-layout-item contentWrap">
      <h1>회원가입</h1>
      <div class="md-layout">
        <ValidationProvider name="email" rules="required|email">
          <div slot-scope="{ errors }">
            <input v-model="email" />
            <p>{{ errors[0] }}</p>
          </div>
        </ValidationProvider>
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
import { ValidationProvider } from "vee-validate";
import { BASE_URL } from "../config/env";

export default {
  components: { ValidationProvider },
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
    submit() {
      // this.$validator.validateAll().then(result => {
      //   if (result) {
      //     alert("submit");
      //   }
      // });
      // if (this.validateEmail(this.email)) {
      //   return alert("유효한 이메일이 아닙니다.");
      // }
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
          console.log(res);
          if (res.status === 409) {
            return alert("이미 회원 가입을 하였습니다.");
          } else {
            this.$router.push({ name: "login" });
          }
        })
        .catch(err => {
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
.contentWrap {
  margin: 30px auto;
  width: 450px;
  border: 1px solid #ccc;
  background: #fff;
  border: 1px solid #ccc;
  padding: 5% 5% 5% 5%;
  box-shadow: 0 5px 7px 0 rgba(105, 105, 105, 0.5);
}
@media (max-width: 700px) {
  .contentWrap {
    width: 80%;
  }
}

.contentWrap > h1 {
  font-size: 30px;
  margin-bottom: 40px;
}

.md-layout > p {
  margin: 10px auto;
}

.md-layout p > a {
  cursor: pointer;
}

.btn {
  width: 100%;
  height: 40px;
  border-radius: 25px;
  background-color: #448aff;
  border: 1px solid #ccc;
}
</style>
