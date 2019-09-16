<template>
  <div class="container">
    <div class="introduce_box clearfix">
      <div class="l_box">
        <div class="thumbnail">
          <img v-if="userInfo.avatar" :src="userInfo.avatar" />
          <img v-else src="@/assets/images/home/user.png" />
        </div>
        <md-button class="editBtn" @click="edit('Modalpop')"
          >프로필편집</md-button
        >
      </div>
      <section class="section">
        <header>
          <h1>{{ userInfo.username }}</h1>
        </header>
        <article>
          <p>{{ userInfo.email }}</p>
        </article>
      </section>
    </div>

    <div class="tab">
      <input type="radio" name="rd" id="rd1" checked />
      <label for="rd1">내가푼문제({{ userInfo.resultData.length }})</label>
      <input type="radio" name="rd" id="rd2" />
      <label for="rd2">내가만든 문제({{ userInfo.myExam.length }})</label>
      <input type="radio" name="rd" id="rd3" />
      <label for="rd3">나의 라이브러리({{ imageInfo.length }})</label>
      <div class="content">
        <div class="content_1">
          <div
            v-for="(results, i) in userInfo.resultData"
            :key="i"
            class="img_box"
          >
            <div @click="moveToResult(results._id)" class="black_box">
              <p>{{ results.examId.title }}</p>
              <p>{{ moment(results.created_at).fromNow() }}</p>
            </div>
            <img :src="results.examId.thumbnail" />
          </div>
        </div>
        <div class="content_2">
          <div v-for="(exam, i) in userInfo.myExam" :key="i" class="img_box">
            <div @click="moveToExam(exam._id)" class="black_box">
              <p>{{ exam.title }}</p>
            </div>
            <img :src="exam.thumbnail" />
          </div>
        </div>
        <div class="content_3">
          <div v-for="(image, i) in imageInfo" :key="i" class="img_box">
            <div @click="moveToLibrary(image._id)" class="black_box">
              <p>{{ image.title }}</p>
            </div>
            <img :src="image.file[0]" />
          </div>
        </div>
      </div>

      <div
        id="background"
        :class="{ on: displayBackground == true ? true : false }"
      >
        <component v-bind:is="currentComponent"></component>
        <!-- <Modalpop /> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Modalpop from "./Modalpop";
import { eventBus } from "../main";
import axios from "axios";
import { BASE_URL } from "../config/env";
import moment from "moment";

export default {
  components: { Modalpop },
  data() {
    return {
      currentComponent: null,
      displayBackground: false,
      imageInfo: [],
      moment: moment
    };
  },
  computed: {
    ...mapState(["userInfo", "isLogin"])
  },
  created() {
    eventBus.$on("closemodal", () => {
      this.displayBackground = false;
      this.currentComponent = null;
    });
    this.getUserLibrary();
    // this.getUserData();
  },
  methods: {
    moveToResult(id) {
      console.log("ididididi", id);
      this.$router.push({ name: "examResult", params: { id: id } });
    },
    moveToExam(id) {
      this.$router.push({ name: "editExam", params: { id: id } });
    },
    moveToLibrary(id) {
      console.log("ididididi", id);
      this.$router.push({ name: "editLibrary", params: { id: id } });
    },
    edit(view) {
      this.currentComponent = view;
      this.displayBackground = true;
    },
    closeBtn() {
      this.currentComponent = null;
      this.displayBackground = false;
    },
    getUserLibrary() {
      let config;
      let accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        console.log("accessToken!!", accessToken);

        config = {
          headers: {
            accessToken: accessToken
          }
        };
      }
      this.loading = true;
      axios.get(BASE_URL + "/library/userLibrary", config).then(res => {
        console.log("res", res);
        this.imageInfo = JSON.parse(JSON.stringify(res.data.imageInfo));
        console.log("this.imageInfo", this.imageInfo);
        this.backupImageInfo = JSON.parse(JSON.stringify(res.data.imageInfo));

        this.loading = false;
      });
    }
  }
};
</script>

<style scoped>
#background {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  left: 0;
  top: 0;
  z-index: 11;
  display: none;
}

#background.on {
  /* 모달창에 on클래스 붙으면 나온다 */
  display: block;
}
.container {
  height: calc(100vh - 64px);
  background: #efefef;
  overflow: hidden;
}
.introduce_box {
  max-width: 1200px;
  padding: 20px 0 0 0;
}
.introduce_box .l_box {
  float: left;
  margin-left: 50px;
}
.l_box .thumbnail {
  width: 150px;
  height: 150px;
  /* margin-left: 40px; */
  margin-bottom: 30px;
}
.l_box .thumbnail img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.section {
  float: left;
  max-width: 800px;
}
.section header {
  display: flex;
  min-width: 40px;
  margin-left: 20px;
  margin-bottom: 20px;
}
.section header h1 {
  margin-top: 5px;
  width: 75%;
  font-size: 1.2rem;
}
.editBtn {
  padding: 5px;
  width: 100px;
  background: #fafafa;
  color: rgb(87, 87, 87);
  border: 1px solid #ddd;
  border-radius: 7px;
  text-decoration: none;
  background: #fff;
}
.section article {
  margin-left: 30px;
  text-align: left;
}
.section article p {
  /* padding-top: 10px; */
  text-align: left;
}

.middleBox {
  text-align: center;
  color: rgb(104, 104, 104);
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  margin-top: 20px;
  padding: 5px 0;
}
.middleBox li {
  width: 33.3333%;
}
.middleBox li b {
  color: black;
}
.tab {
  max-width: 1200px;
  width: 100%;
  margin: 20px auto;
}
input[type="radio"] {
  display: none;
}
label {
  width: 33.33333%;
  height: 40px;
  line-height: 40px;
  float: left;
  display: block;
  font-weight: bold;
  color: rgb(117, 117, 117);
  text-align: center;
  cursor: pointer;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
}
label:hover {
  background: #efefef;
}
label:nth-child(2) {
  padding-left: 0px;
}

label:first-child {
  border-left: 1px solid #efefef;
}

.content {
  clear: both;
  background: #fff;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 315px;
  height: calc(100vh - 460px);
  position: relative;
  overflow: scroll;
}
.content > div {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  opacity: 0;
  transition: all 0.1s;
  width: 100%;
  padding: 30px 0 30px 25px;
  box-sizing: border-box;
}

.content > div .img_box {
  width: calc(33.3333% - 20px);
  max-height: 150px;
  min-height: 100px;
  margin-right: 20px;
  margin-bottom: 20px;
  outline: 1px solid #efefef;
  margin-bottom: 20px;
  position: relative;
}
.content > div .img_box:hover {
  outline: none;
}
.content > div .img_box:hover .black_box {
  outline: 3px solid #448aff;
  color: rgb(243, 243, 11);
  cursor: pointer;
}
.content > div .img_box:hover .black_box p {
  color: rgb(243, 243, 11);
}
.content > div div img {
  width: 100%;
  height: 100%;
}
.content > div .black_box {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
}
.content > div .black_box p {
  margin-top: 15%;
  text-align: center;
  font-size: 16px;
  color: white;
  font-weight: bold;
}
#rd1:checked ~ label:nth-child(2),
#rd2:checked ~ label:nth-child(4),
#rd3:checked ~ label:nth-child(6) {
  background: #448aff;
  color: #fff;
}
#rd1:checked ~ .content > .content_1,
#rd2:checked ~ .content > .content_2,
#rd3:checked ~ .content > .content_3,
#rd4:checked ~ .content > .content_4 {
  opacity: 1;
  transition: all 0.5s;
  transition-delay: 0.1s;
}
@media all and (max-width: 1264px) {
  .content > div .img_box {
    max-height: 100px;
    min-height: 80px;
  }
}
@media all and (max-width: 900px) {
  .content > div .img_box {
    width: calc(50% - 20px);
  }
  .content > div .img_box .black_box p {
    margin: 0;
    line-height: 100px;
  }
}
@media all and (max-width: 650px) {
  .content > div {
    display: block;
  }
  .content > div .img_box {
    width: auto;
    overflow: hidden;
  }
  .content > div .img_box .black_box p {
    margin: 0;
    line-height: 130px;
  }
  .content > div .img_box img {
    height: 150px;
  }
  .l_box .thumbnail {
    width: 100px;
    height: 100px;
    /* margin-left: 40px; */
    margin-bottom: 30px;
  }
  .content > div .black_box p {
    font-size: 16px;
  }
}

.btnClose {
  position: relative;
  left: 300px;
  top: -20px;
  font-size: 25px;
  z-index: 199;
  display: block;
  width: 35px;
  height: 35px;
  line-height: 35px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  text-align: center;
  border: 1px solid #fff;
  color: red;
}
</style>
