<template>
  <div class="container">
    <div class="introduce_box clearfix">
      <div class="l_box">
        <div class="thumbnail">
          <img src="../assets/images/home/스마트폰-사진.jpg" />
        </div>
        <a class="editBtn" @click="edit">프로필편집</a>
      </div>
      <section class="sec1">
        <header>
          <h1>{{ userInfo.username }}</h1>
        </header>
        <article>
          <p>{{ userInfo.email }}</p>
        </article>
      </section>
    </div>
    <ul class="smallbox">
      <li>
        나의문제
        <br />
        <b>12</b>
      </li>
      <li>
        내가푼 문제
        <br />
        <b>14</b>
      </li>
      <li>
        평균점수
        <br />
        <b>5점</b>
      </li>
    </ul>

    <div class="tab">
      <input type="radio" name="rd" id="rd1" checked />
      <label for="rd1">내가푼문제</label>
      <input type="radio" name="rd" id="rd2" />
      <label for="rd2">내가만든 문제</label>
      <input type="radio" name="rd" id="rd3" />
      <label for="rd3">통계</label>
      <div class="content">
        <div class="content_1">
          <div v-for="(results, i) in userInfo.resultData" :key="i">
            <a @click="moveToResult(results._id)">
              <h3>{{ results.examId.title }}</h3>
              <img :src="results.examId.thumbnail" />
            </a>
          </div>
        </div>
        <div class="content_2">
          <div>
            <a href="#">
              <img src="@/assets/images/home/스마트폰-사진.jpg" />
            </a>
          </div>
          <div>
            <a href="#">
              <img src="@/assets/images/home/스마트폰-사진.jpg" />
            </a>
          </div>
          <div>
            <a href="#">
              <img src="@/assets/images/home/스마트폰-사진.jpg" />
            </a>
          </div>
          <div>
            <a href="#">
              <img src="@/assets/images/home/스마트폰-사진.jpg" />
            </a>
          </div>
          <div>
            <a href="#">
              <img src="@/assets/images/home/스마트폰-사진.jpg" />
            </a>
          </div>
          <div>
            <a href="#">
              <img src="@/assets/images/home/스마트폰-사진.jpg" />
            </a>
          </div>
        </div>
        <div class="content_3">
          <div>
            <a href="#">
              <img src="@/assets/images/home/스마트폰-사진.jpg" />
            </a>
          </div>
          <div>
            <a href="#">
              <img src="@/assets/images/home/스마트폰-사진.jpg" />
            </a>
          </div>
          <div>
            <a href="#">
              <img src="@/assets/images/home/스마트폰-사진.jpg" />
            </a>
          </div>
          <div>
            <a href="#">
              <img src="@/assets/images/home/스마트폰-사진.jpg" />
            </a>
          </div>
          <div>
            <a href="#">
              <img src="@/assets/images/home/스마트폰-사진.jpg" />
            </a>
          </div>
          <div>
            <a href="#">
              <img src="@/assets/images/home/스마트폰-사진.jpg" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { BASE_URL } from "../config/env";
import axios from "axios";

export default {
  data() {
    return {
      results: null,
      activeName: "first"
    };
  },
  computed: {
    ...mapState(["userInfo", "isLogin"])
  },
  methods: {
    moveToResult(id) {
      console.log("id > > >", id);
      this.$router.push({ name: "examResult", params: { id: id } });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style scoped>
.container {
  background: #fafafa;
}
.introduce_box {
  max-width: 1200px;
  padding: 60px 0;
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
.sec1 {
  float: left;
  max-width: 800px;
}
.sec1 header {
  display: flex;
  min-width: 40px;
  margin-left: 20px;
  margin-bottom: 20px;
}
.sec1 header h1 {
  margin-top: 5px;
  width: 75%;
  font-size: 1.3rem;
}
.editBtn {
  padding: 5px;
  width: 140px;
  background: #fafafa;
  color: rgb(87, 87, 87);
  border: 1px solid #ddd;
  border-radius: 7px;
  text-decoration: none;
}
.sec1 article {
  margin-left: 30px;
  text-align: left;
}
.sec1 article p {
  /* padding-top: 10px; */
  text-align: left;
}

.smallbox {
  text-align: center;
  color: rgb(117, 117, 117);
  display: flex;
  justify-content: space-between;
  border-top: 1px solid;
  border-bottom: 1px solid #ccc;
  margin-top: 50px;
  padding: 5px 0;
}
.smallbox li {
  width: 33.3333%;
}
.smallbox li b {
  color: black;
}
.tab {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
input[type="radio"] {
  display: none;
}
label {
  width: 33%;
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
  height: 400px;
  position: relative;
  overflow: scroll;
}
.content > div {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  opacity: 0;
  transition: all 0.1s;
  width: 100%;
}
.content > div div {
  width: calc(33.3333% - 20px);
  height: 200px;
  margin-right: 20px;
  margin-bottom: 20px;
  outline: 1px solid #efefef;
  margin-bottom: 20px;
}
.content > div div img {
  width: 100%;
  height: 100%;
}
.content > div div:nth-child(3n) {
  margin: 0;
}
#rd1:checked ~ label:nth-child(2),
#rd2:checked ~ label:nth-child(4),
#rd3:checked ~ label:nth-child(6) {
  background: #ccc;
}
#rd1:checked ~ .content > .content_1,
#rd2:checked ~ .content > .content_2,
#rd3:checked ~ .content > .content_3,
#rd4:checked ~ .content > .content_4 {
  opacity: 1;
  transition: all 0.5s;
  transition-delay: 0.1s;
}

@media all and (max-width: 650px) {
  /* .introduce_box {
    width: auto;
  } */
  /* .sec1 {
    float: none;
  }
  .sec1 article {
    box-sizing: border-box;
    padding-top: 50px;
  }
  .sec1 header {
    box-sizing: border-box;
    width: auto;
    padding-top: 30px;
    padding-left: 20px;
    display: inline-block;
  }
  .sec1 header h1 {
    font-size: 1rem;
  }
  .sec1 header a {
    display: block;
    margin-top: 40px;
    text-align: center;
  } */
  /* .sec1 article {
    font-size: 0.7rem;
  } */
  .l_box .thumbnail {
    width: 120px;
    height: 120px;
    margin-left: 40px;
  }

  .content > div div {
    width: calc(100% - 10px);
    height: 200px;
    margin: 5px;
    background: red;
  }
  .content > div div:nth-child(3n) {
    margin: 5px;
  }
  label {
    font-size: 0.9rem;
  }
  .thumbnailWrap {
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }
  .thumbnail {
    width: 500px;
    height: auto;
    border: 1px solid #fff;
    border-radius: 10px;
    text-align: center;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    outline: 1px solid red;
  }

  th {
    font-size: 14px;
    font-weight: normal;
    border-style: solid;
    overflow: hidden;
    word-break: normal;
    border-color: black;
  }
  td,
  th {
    line-height: 50px;
    padding: 10px;
    border: 1px solid #efefef;
  }
  td,
  th:nth-child(1) {
    width: 30px;
  }
  td,
  th:nth-child(2) {
    width: 60px;
  }
  th:nth-child(3) {
    width: 80px;
  }
  th:nth-child(4) {
    width: 80px;
  }
  td,
  th:nth-child(5) {
    width: 40px;
  }

  .resultImage {
    width: 80%;
    height: 100px;
    border: 1px solid #efefef;
    border-radius: 12px;
  }
}
a:hover {
  cursor: pointer;
}
</style>
