<template>
  <div v-loading="loading" class="container">
    <div id="page" class="pageWrap">
      <h2 class>라이브러리</h2>
      <article v-show="fImageInfo.length > 0" class="outLinks">
        <h3>과일</h3>
        <ul>
          <li v-for="(image, index) in fImageInfo" :key="index">
            <a href="#">
              <img :src="image.file" class="image" />
              <!-- <p id="title">{{ image.title }}</p> -->
              <!-- <p id="author">{{ image.author.username }}</p> -->
            </a>
          </li>
        </ul>
      </article>
      <article v-if="aImageInfo.length > 0" class="outLinks">
        <h3>동물</h3>
        <ul>
          <li v-for="(image, index) in aImageInfo" :key="index">
            <a href="#">
              <img :src="image.file" class="image" />
              <!-- <span id="title">{{ image.title }}</span>
              <span id="author">{{ image.author.username }}</span>-->
            </a>
          </li>
        </ul>
      </article>
      <article v-if="vImageInfo.length > 0" class="outLinks">
        <h3>채소</h3>
        <ul>
          <li v-for="(image, index) in vImageInfo" :key="index">
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
      <article v-if="uImageInfo.length > 0" class="outLinks">
        <h3>가구</h3>
        <ul>
          <li v-for="(image, index) in uImageInfo" :key="index">
            <a href="#">
              <img :src="image.file" class="image" />
              <!-- <p id="author">{{ image.title }}</p> -->
              <!-- <p id="author">작성자 : {{ JSON.parse(JSON.stringify(image.author)) }}</p> -->
            </a>
          </li>
        </ul>
      </article>
      <article v-if="cImageInfo.length > 0" class="outLinks">
        <h3>의류</h3>
        <ul>
          <li v-for="(image, index) in cImageInfo" :key="index">
            <a href="#">
              <img :src="image.file" class="image" />
              <p id="author">{{ image.title }}</p>
              <!-- <p id="author">작성자 : {{ JSON.parse(JSON.stringify(image.author)) }}</p> -->
            </a>
          </li>
        </ul>
      </article>
      <article v-if="vImageInfo.length > 0" class="outLinks">
        <h3>식물</h3>
        <ul>
          <li v-for="(image, index) in vImageInfo" :key="index">
            <a href="#">
              <img :src="image.file" class="image" />
              <!-- <p id="author">{{ image.title }}</p> -->
              <!-- <p id="author">작성자 : {{ JSON.parse(JSON.stringify(image.author)) }}</p> -->
            </a>
          </li>
        </ul>
      </article>
      <article v-if="jImageInfo.length > 0" class="outLinks">
        <h3>직업</h3>
        <ul>
          <li v-for="(image, index) in jImageInfo" :key="index">
            <a href="#">
              <img :src="image.file" class="image" />
              <!-- <p id="author">{{ image.title }}</p> -->
              <!-- <p id="author">작성자 : {{ JSON.parse(JSON.stringify(image.author)) }}</p> -->
            </a>
          </li>
        </ul>
      </article>

      <article v-if="hImageInfo.length > 0" class="outLinks">
        <h3>탈것</h3>
        <ul>
          <li v-for="(image, index) in hImageInfo" :key="index">
            <a href="#">
              <img :src="image.file" class="image" />
              <!-- <p id="author">{{ image.title }}</p> -->
              <!-- <p id="author">작성자 : {{ JSON.parse(JSON.stringify(image.author)) }}</p> -->
            </a>
          </li>
        </ul>
      </article>
      <article v-if="sImageInfo.length > 0" class="outLinks">
        <h3>문구</h3>
        <ul>
          <li v-for="(image, index) in sImageInfo" :key="index">
            <a href="#">
              <img :src="image.file" class="image" />
              <p id="author">{{ image.title }}</p>
              <!-- <p id="author">작성자 : {{ JSON.parse(JSON.stringify(image.author)) }}</p> -->
            </a>
          </li>
        </ul>
      </article>

      <article v-if="oImageInfo.length > 0" class="outLinks">
        <h3>음식</h3>
        <ul>
          <li v-for="(image, index) in oImageInfo" :key="index">
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
      imageInfo: [],
      fImageInfo: [], //과일
      vImageInfo: [], //채소
      pImageInfo: [], //식물
      cImageInfo: [], //의류
      sImageInfo: [], //문구
      jImageInfo: [], //직업
      hImageInfo: [], //탈것
      aImageInfo: [], //동물
      oImageInfo: [], //동물
      uImageInfo: [] //가구
    };
  },
  created() {
    this.getLibrary();
  },
  methods: {
    getLibrary() {
      this.loading = true;
      axios.get(BASE_URL + "/library").then(res => {
        console.log("res > >", res);
        this.imageInfo = JSON.parse(JSON.stringify(res.data.imageInfo));
        this.fImageInfo = this.imageInfo.filter(item => item.category == "1");
        this.vImageInfo = this.imageInfo.filter(item => item.category == "2");
        this.pImageInfo = this.imageInfo.filter(item => item.category == "3");
        this.cImageInfo = this.imageInfo.filter(item => item.category == "4");
        this.sImageInfo = this.imageInfo.filter(item => item.category == "5");
        this.jImageInfo = this.imageInfo.filter(item => item.category == "6");
        this.aImageInfo = this.imageInfo.filter(item => item.category == "7");
        this.hImageInfo = this.imageInfo.filter(item => item.category == "8");
        this.uImageInfo = this.imageInfo.filter(item => item.category == "9");
        this.oImageInfo = this.imageInfo.filter(item => item.category == "10");
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
  margin: 30px auto;
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
@media (max-width: 768px) {
  #page .outLinks li {
    width: 50px;
    height: 40px;
    margin: 40px 10px 60px 10px;
    padding: 0;
  }
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
</style>
