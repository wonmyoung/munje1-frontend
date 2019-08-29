<template>
  <div v-loading="loading" class="container">
    <div id="page" class="pageWrap">
      <h2 class>라이브러리</h2>
      <article class="outLinks">
        <ul>
          <li v-for="(image, index) in imageInfo" :key="index">
            <a href="#">
              <img :src="image.file" class="image" />
              <p id="author">{{ image.title }}</p>
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
import { BASE_URL } from "../config/env";

export default {
  data() {
    return {
      loading: false,
      imageInfo: []
    };
  },
  mounted() {
    this.getLibrary();
  },
  methods: {
    getLibrary() {
      this.loading = true;
      axios.get(BASE_URL + "/library").then(res => {
        console.log("res > >", res);
        this.imageInfo = JSON.parse(JSON.stringify(res.data.imageInfo));
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
  margin: 30px auto;
  border: 1px solid #efefef;
  border-radius: 5px;
  max-width: 1200px;
  margin: 30px auto;
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
  overflow-y: scroll;
  height: auto;
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
</style>
