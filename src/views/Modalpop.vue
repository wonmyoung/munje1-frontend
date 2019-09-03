<template>
  <div>
    <section class="profile">
      <a @click="closeModal">X</a>
      <h1>프로필 편집</h1>
      <div class="circle_img">
        <img src="@/assets/images/home/user.png" />
      </div>
      <div class="article">
        <ul class="no_write">
          <li>이름</li>
          <li>이메일</li>
          <li>비밀번호</li>
        </ul>
        <ul class="write">
          <li>
            <input type="text" v-model="userInfo.username" />
          </li>
          <li>
            <input type="text" v-model="userInfo.email" />
          </li>
          <li>
            <input type="password" v-model="password" />
          </li>
        </ul>
      </div>
      <div class="btns">
        <md-button class="md-raised md-accent" @click="closeModal"
          >취소</md-button
        >
        <md-button class="md-raised md-primary" @click="submit"
          >프로필수정</md-button
        >
      </div>
    </section>
    <div class="b"></div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { BASE_URL } from "../config/env";
import axios from "axios";
import { eventBus } from "../main";
export default {
  data() {
    return {
      results: null,
      password: null
    };
  },
  computed: {
    ...mapState(["userInfo", "isLogin"])
  },
  methods: {
    submit() {
      let accessToken = localStorage.getItem("accessToken");
      let config = {
        headers: {
          accessToken: accessToken
        }
      };
      let data = {
        username: this.userInfo.username,
        email: this.userInfo.email,
        password: this.password
      };
      console.log("data", data);
      axios
        .post(BASE_URL + "/accounts/profile/edit", data, config)
        .then(res => {
          if (res.status == 200) {
            let userInfo = {
              username: data.username,
              email: data.email
            };
            this.$store.dispatch("UPDATE_USER_DATA", { userInfo });
            alert("정상적으로 프로필이 수정 되었습니다.");
            this.closeModal();
          } else {
            alert("비밀번호를 다시 확인해주세요.");
          }
        });
    },
    closeModal() {
      console.log("closeModal");
      eventBus.$emit("closemodal");
    }
  }
};
</script>
<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
}
.container .profile {
  position: fixed;
  width: 440px;
  height: 600px;
  background: white;
  top: calc(50% - 280px);
  left: calc(50% - 220px);
  border: 1px solid #efefef;
  text-align: center;
  z-index: 99;
  padding: 20px;
  box-sizing: border-box;
}
.container .profile a {
  float: right;
}
.container .profile a {
  font-size: 20px;
  color: #000;
}
.container .profile h1 {
  font-size: 30px;
  padding: 40px 0 20px;
}
.container .profile .circle_img {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  margin: 0 auto;
}
.container .profile .circle_img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.container .article {
  display: flex;
  width: 95%;
  margin: 30px auto;
  justify-content: space-between;
}
.container .article .no_write {
  width: 35%;
  padding: 7px;
}
.container .article .no_write li {
text-align: left;
  height: 30px;
  margin-bottom: 10px;
  color: #777;
}
.container .article .write {
  width: 65%;
  padding: 0;
}
.container .article .write li {
  width: 100%;
  height: 33px;
  border: 1px solid #cfcfcf;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px;
}
.container .article .write li input {
  width: 100%;
  height: 100%;
  display: block;
  color: #666;
  font-size: 15px;
}
.container .btns {
  width: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
@media all and (max-width:550px) {
  .container .profile{
    width: 80%;
    position: static;
    margin:80px auto 0;
  }
  .container .btns{
    display: block;
    width:100%;
  }
  .md-button.md-theme-default.md-raised:not([disabled]).md-accent,
  .md-button.md-theme-default.md-raised:not([disabled]).md-primary {
    width: 100%;
    display: block;
  }
  .md-button.md-theme-default.md-raised:not([disabled]).md-accent{
    margin-left:-1px;
    margin-bottom: 20px;
  }

}
</style>
