<template>
  <div class="container">
    <section class="private">
      <h2>비밀방</h2>

      <div class="article">
        <span>비밀번호</span>
        <input type="password" class="inputPwd" v-model="password" />
      </div>
      <div class="btns">
        <md-button class="md-raised md-accent" @click="cancel">취소</md-button>
        <md-button class="md-raised md-primary" @click="submit">확인</md-button>
      </div>
    </section>
    <div class="b"></div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { BASE_URL } from "../config/env";
import axios from "axios";
export default {
  data() {
    return {
      password: null
    };
  },
  computed: {
    ...mapState(["userInfo", "isLogin"])
  },
  methods: {
    submit() {
      if (this.password == null) return alert("비밀번호를 입력해주세요");

      let accessToken = localStorage.getItem("accessToken");
      let config = {
        headers: {
          accessToken: accessToken
        }
      };
      let data = {
        password: this.password
      };
      let id = this.$route.params.id;
      console.log("data", data);
      axios.post(BASE_URL + `/exam/private/${id}`, data, config).then(res => {
        console.log("res", res);
        this.password = null;

        if (res.status == 200 && res.data.success == true) {
          this.$router.push({ name: "examDetail", params: { id: id } });
        } else if (res.status == 200 && res.data.status == 409) {
          alert("비밀번호를 다시 확인해주세요.");
        }
      });
    },
    cancel() {
      this.$router.push({ name: "home" });
    }
  }
};
</script>
<style scoped>
.container {
  margin: 0 auto;
  width: 100%;
  height: 100%;
}

.container .private {
  margin: 100px auto;
  width: 400px;
  height: 220px;
  background: white;

  border: 1px solid #efefef;
  border-radius: 5px;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
}
.container .private a {
  float: right;
}

.container .private a {
  font-size: 20px;
  color: #000;
}
.inputPwd {
  border: 1px solid #dfdfdf;
  border-radius: 5px;
  width: 270px;
  height: 40px;
}

.container label {
  bottom: 0;
  position: absolute;
  width: 100%;
  height: 50px;
  background: rgba(13, 59, 143, 0.5);
  color: white;
  line-height: 45px;
  left: 0;
}
.container label img {
  width: 25px;
}

#btnFile {
  width: 1px;
  height: 1px;
  overflow: hidden;
  background: transparent;
  border: none;
}

/* .btnFile {
  background: #222;
  border-radius: 3px;
  height: 30px;
  color: #fff;
  display: inline-block;
  line-height: 30px;
  padding: 0 20px;
  margin-top: 20px;
  transition: all 0.5s;
} */

.btnFile:hover {
  opacity: 0.9;
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
.container .article span {
  line-height: 14px;
  font-size: 14px;
  padding-top: 13px;
}
.container .btns {
  width: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
@media all and (max-width: 550px) {
  .container .private {
    width: 80%;
    position: static;
    margin: 80px auto 0;
  }
  .container .btns {
    display: block;
    width: 100%;
  }
  .md-button.md-theme-default.md-raised:not([disabled]).md-accent,
  .md-button.md-theme-default.md-raised:not([disabled]).md-primary {
    width: 100%;
    display: block;
  }
  .md-button.md-theme-default.md-raised:not([disabled]).md-accent {
    margin-left: -1px;
    margin-bottom: 20px;
  }
}
</style>
