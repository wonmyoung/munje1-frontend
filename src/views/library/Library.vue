<template>
  <div v-loading="loading" class="container">
    <div id="page" class="pageWrap">
       <div class="navBox">
          <a href="/examDetail">Lessons</a>
          <router-link to="/library">Libraries</router-link>
        </div>
      <h2 class>라이브러리</h2>
      <div class="selectWrap" label="카테고리">
        <select @change="select" v-model="category">
          <option :value="0">모두보기</option>
          <option :value="1">과일</option>
          <option :value="2">채소</option>
          <option :value="3">식물</option>
          <option :value="4">의류</option>
          <option :value="5">문구</option>
          <option :value="6">직업</option>
          <option :value="7">동물</option>
          <option :value="8">탈것</option>
          <option :value="9">가구</option>
          <option :value="10">음식</option>
          <option :value="11">기타</option>
        </select>
      </div>

      <article
        v-show="imageInfo.filter(image => image.category == '1').length > 0"
        class="outLinks"
      >
        <h3>과일</h3>
        <ul>
          <li
            v-for="(image, index) in imageInfo.filter(
              image => image.category == '1'
            )"
            :key="index"
          >
            <a href="#">
              <img :src="image.file" class="image" />
              <!-- <p id="title">{{ image.title }}</p> -->
              <!-- <p id="author">{{ image.author.username }}</p> -->
            </a>
          </li>
        </ul>
      </article>
      <article
        v-if="imageInfo.filter(aimage => aimage.category == '7').length > 0"
        class="outLinks"
      >
        <h3>동물</h3>
        <ul>
          <li
            v-for="(image, index) in imageInfo.filter(
              aimage => aimage.category == '7'
            )"
            :key="index"
          >
            <a href="#">
              <img :src="image.file" class="image" />
              <!-- <span id="title">{{ image.title }}</span>
              <span id="author">{{ image.author.username }}</span>-->
            </a>
          </li>
        </ul>
      </article>
      <article
        v-if="imageInfo.filter(vimage => vimage.category == '2').length > 0"
        class="outLinks"
      >
        <h3>채소</h3>
        <ul>
          <li
            v-for="(image, index) in imageInfo.filter(
              aimage => aimage.category == '2'
            )"
            :key="index"
          >
            <a href="#">
              <img :src="image.file" class="image" />
              <!-- <p id="title">{{ image.title }}</p>
              <p id="author">
                작성자 : {{ JSON.parse(JSON.stringify(image.author)) }}
              </p>-->
            </a>
          </li>
        </ul>
      </article>
      <article
        v-if="imageInfo.filter(image => image.category == '9').length > 0"
        class="outLinks"
      >
        <h3>가구</h3>
        <ul>
          <li
            v-for="(image, index) in imageInfo.filter(
              image => image.category == '9'
            )"
            :key="index"
          >
            <a href="#">
              <img :src="image.file" class="image" />
              <!-- <p id="author">{{ image.title }}</p> -->
              <!-- <p id="author">작성자 : {{ JSON.parse(JSON.stringify(image.author)) }}</p> -->
            </a>
          </li>
        </ul>
      </article>
      <article
        v-if="imageInfo.filter(cimage => cimage.category == '4').length > 0"
        class="outLinks"
      >
        <h3>의류</h3>
        <ul>
          <li
            v-for="(image, index) in imageInfo.filter(
              cimage => cimage.category == '4'
            )"
            :key="index"
          >
            <a href="#">
              <img :src="image.file" class="image" />
              <p id="author">{{ image.title }}</p>
              <!-- <p id="author">작성자 : {{ JSON.parse(JSON.stringify(image.author)) }}</p> -->
            </a>
          </li>
        </ul>
      </article>
      <article
        v-if="imageInfo.filter(vimage => vimage.category == '3').length > 0"
        class="outLinks"
      >
        <h3>식물</h3>
        <ul>
          <li
            v-for="(image, index) in imageInfo.filter(
              image => image.category == '3'
            )"
            :key="index"
          >
            <a href="#">
              <img :src="image.file" class="image" />
              <!-- <p id="author">{{ image.title }}</p> -->
              <!-- <p id="author">작성자 : {{ JSON.parse(JSON.stringify(image.author)) }}</p> -->
            </a>
          </li>
        </ul>
      </article>
      <article
        v-if="imageInfo.filter(image => image.category == '6').length > 0"
        class="outLinks"
      >
        <h3>직업</h3>
        <ul>
          <li
            v-for="(image, index) in imageInfo.filter(
              image => image.category == '6'
            )"
            :key="index"
          >
            <a href="#">
              <img :src="image.file" class="image" />
              <!-- <p id="author">{{ image.title }}</p> -->
              <!-- <p id="author">작성자 : {{ JSON.parse(JSON.stringify(image.author)) }}</p> -->
            </a>
          </li>
        </ul>
      </article>

      <article
        v-if="imageInfo.filter(image => image.category == '8').length > 0"
        class="outLinks"
      >
        <h3>탈것</h3>
        <ul>
          <li
            v-for="(image, index) in imageInfo.filter(
              image => image.category == '8'
            )"
            :key="index"
          >
            <a href="#">
              <img :src="image.file" class="image" />
              <!-- <p id="author">{{ image.title }}</p> -->
              <!-- <p id="author">작성자 : {{ JSON.parse(JSON.stringify(image.author)) }}</p> -->
            </a>
          </li>
        </ul>
      </article>
      <article
        v-if="imageInfo.filter(simage => simage.category == '5').length > 0"
        class="outLinks"
      >
        <h3>문구</h3>
        <ul>
          <li
            v-for="(image, index) in imageInfo.filter(
              simage => simage.category == '5'
            )"
            :key="index"
          >
            <a href="#">
              <img :src="image.file" class="image" />
              <p id="author">{{ image.title }}</p>
              <!-- <p id="author">작성자 : {{ JSON.parse(JSON.stringify(image.author)) }}</p> -->
            </a>
          </li>
        </ul>
      </article>

      <article
        v-if="imageInfo.filter(image => image.category == '10').length > 0"
        class="outLinks"
      >
        <h3>음식</h3>
        <ul>
          <li
            v-for="(image, index) in imageInfo.filter(
              image => image.category == '10'
            )"
            :key="index"
          >
            <a href="#">
              <img :src="image.file" class="image" />
              <!-- <p id="author">{{ image.title }}</p> -->
              <!-- <p id="author">작성자 : {{ JSON.parse(JSON.stringify(image.author)) }}</p> -->
            </a>
          </li>
        </ul>
      </article>

      <article
        v-if="imageInfo.filter(image => image.category == '11').length > 0"
        class="outLinks"
      >
        <h3>기타</h3>
        <ul>
          <li
            v-for="(image, index) in imageInfo.filter(
              image => image.category == '11'
            )"
            :key="index"
          >
            <a href="#">
              <img :src="image.file" class="image" />
              <!-- <p id="author">{{ image.title }}</p> -->
              <!-- <p id="author">작성자 : {{ JSON.parse(JSON.stringify(image.author)) }}</p> -->
            </a>
          </li>
        </ul>
      </article>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { BASE_URL } from "../../config/env";

export default {
  data() {
    return {
      loading: false,
      category: 0,
      value: "",
      imageInfo: [],
      backupImageInfo: []
    };
  },
  created() {
    this.getLibrary();
  },
  methods: {
    select() {
      if (this.category == 0) {
        this.imageInfo = this.backupImageInfo;
        return;
      }
      this.imageInfo = this.backupImageInfo.filter(
        image => image.category == this.category
      );
    },
    getLibrary() {
      this.loading = true;

      axios.get(BASE_URL + "/library").then(res => {
        this.imageInfo = JSON.parse(JSON.stringify(res.data.imageInfo));
        this.backupImageInfo = JSON.parse(JSON.stringify(res.data.imageInfo));

        this.loading = false;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  background: #fff;
}
.navBox {
  margin:15px;
  display: flex;
  justify-content: flex-start;
}
.navBox a {
  /* width:calc(50% - 10px);
     */
  width: 100px;
  height: 35px;
  margin-right: 20px;
  display: block;
  text-align: center;
  background: #ddd;
  border-radius: 6px;
  line-height: 35px;
  text-decoration: none;
}

.navBox a:hover {
  background: rgb(93, 93, 131);
  text-decoration: none;
}

.wrap {
  position: fixed;
  z-index: 11;
}
.pageWrap {
  width: 90%;
  min-height: 80vh;
  margin: 30px auto;
  border: 1px solid #efefef;
  border-radius: 5px;
  max-width: 1200px;
  overflow-y: auto;
}
.pageWrap > h2 {
  font-size: 25px;
  margin: 30px 0 30px 0;
}
// .pageWrap h2 {
//   font-size: 20px;
//   font-weight: 600;
// }
.gallery {
  height: 70% !important;
  width: 100%;
}
#page {
  position: relative;
  z-index: 10;
  background: #fafafa;
  // height: 100vh;
  // overflow-y: scroll;
}
#page h2 {
  text-align: center;
  font-size: 1.5em;
}
.selectWrap {
  text-align: right;
}
select {
  width: 20%;
  margin: 10px;
  text-align: right;
  height: 35px;
  border: 1px solid #cfcfcf;
  background: url("../../assets/images/home/select_arrow.png") no-repeat 100%
    50%;
  background-color: #fff;
  border-radius: 5px;
  padding-left: 10px;
}
#page .outLinks > ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  //   margin: 50px -10px;
  //   text-align: center;
  // overflow-y: scroll;
  height: auto;
  border: 1px solid #448aff;
  margin: 10px;
  background: #fafafa;
  border-radius: 5px;
}
#page h3 {
  text-align: left;
  font-size: 1.1em;
  margin-left: 10px;
  font-weight: bold;
}
#page .outLinks li {
  flex: 0 1 auto;
  width: 120px;
  height: 90px;
  margin: 10px 10px 50px 10px;
  padding: 1px 0;
  transition: all 0.5s;
  // overflow-y: scroll;
}

#page .outLinks li:hover {
  border-color: #80629c;
  color: #80629c;
}

#page .outLinks li > a {
  display: block;
  text-align: center;
  color: #777;
}

#page .outLinks li > a img {
  width: 100%;
  height: 80px;
  border: 1px solid #e8e8e8;
  border-radius: 9px;
  //   max-width: 50px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: all 0.5s;
  box-shadow: 0 5px 11px 0 rgba(197, 197, 197, 0.1);
}

#page .outLinks li:hover > a img {
  opacity: 0.9;
}
#author {
  text-align: left;
  margin: 5px;
}
#page .outLinks li > a b {
  display: block;
  position: relative;
}

#page .outLinks li b:after {
  content: ">";
  color: transparent;
  transition: all 0.5s;
  padding-left: 0;
}

#page .outLinks li:hover > a b:after {
  padding-left: 10px;
  color: #80629c;
}
#title {
  font-size: 14px;
  font-weight: bold;
}
@media (max-width: 768px) {
  .navBox {
    justify-content: space-between;
  }
  .navBox a {
    width:45%;
    margin-right:0;
  }
  #page .outLinks li {
    width: 50px;
    height: 40px;
    margin: 40px 10px 60px 10px;
    padding: 0;
  }
}
@media (max-width: 500px) {
  .container {
    padding: 5px;
  }
  .pageWrap {
    width: 100%;
    margin: 10px auto;
    border: 1px solid #efefef;
    border-radius: 5px;
    overflow-y: auto;
  }
  .selectWrap {
    text-align: center;
  }
  select {
    width: 90%;
    margin: 10px;
    height: 35px;
    border: 1px solid #cfcfcf;
    background: url("../../assets/images/home/select_arrow.png") no-repeat 100%
      50%;
    background-color: #fff;
    border-radius: 5px;
    padding-left: 10px;
  }
}
</style>
