<template>
  <div class="container">
    <div class="conWrap">
      <div v-loading="loading" class="left">
        <div class="navBox">
          <a href="/examDetail">Lessons</a>
          <router-link to="/library">Libraries</router-link>
        </div>
        <article>
          <header>
            <h2>SeeAll</h2>
          </header>
          <ul class="newWrap">
            <li v-for="(exam, i) in tExamList" :key="exam.id" @click="moveToDetail(exam.id)">
              <div class="thumbnail">
                <img :src="exam.thumbnail" />
              </div>
              <b>{{ exam.title }}</b>
              <p>{{ exam.description }}</p>
              <div class="inner_box">
                <div class>
                  <div class="text-center">
                    <v-rating small half-increments color="orange" v-model="exam.rating"></v-rating>
                  </div>
                </div>
                <!-- <div class="count">33</div> -->
              </div>
            </li>
            <li v-for="(exam, i) in tExamList" :key="exam.id" @click="moveToDetail(exam.id)">
              <div class="thumbnail">
                <img :src="exam.thumbnail" />
              </div>
              <b>{{ exam.title }}</b>
              <p>{{ exam.description }}</p>
              <div class="inner_box">
                <div class>
                  <div class="text-center">
                    <v-rating small half-increments color="orange" v-model="exam.rating"></v-rating>
                  </div>
                </div>
                <!-- <div class="count">33</div> -->
              </div>
            </li>
            <li v-for="(exam, i) in tExamList" :key="exam.id" @click="moveToDetail(exam.id)">
              <div class="thumbnail">
                <img :src="exam.thumbnail" />
              </div>
              <b>{{ exam.title }}</b>
              <p>{{ exam.description }}</p>
              <div class="inner_box">
                <div class>
                  <div class="text-center">
                    <v-rating small half-increments color="orange" v-model="exam.rating"></v-rating>
                  </div>
                </div>
                <!-- <div class="count">33</div> -->
              </div>
            </li>
            <li v-for="(exam, i) in tExamList" :key="exam.id" @click="moveToDetail(exam.id)">
              <div class="thumbnail">
                <img :src="exam.thumbnail" />
              </div>
              <b>{{ exam.title }}</b>
              <p>{{ exam.description }}</p>
              <div class="inner_box">
                <div class>
                  <div class="text-center">
                    <v-rating small half-increments color="orange" v-model="exam.rating"></v-rating>
                  </div>
                </div>
                <!-- <div class="count">33</div> -->
              </div>
            </li>
            <li v-for="(exam, i) in tExamList" :key="exam.id" @click="moveToDetail(exam.id)">
              <div class="thumbnail">
                <img :src="exam.thumbnail" />
              </div>
              <b>{{ exam.title }}</b>
              <p>{{ exam.description }}</p>
              <div class="inner_box">
                <div class>
                  <div class="text-center">
                    <v-rating small half-increments color="orange" v-model="exam.rating"></v-rating>
                  </div>
                </div>
                <!-- <div class="count">33</div> -->
              </div>
            </li>
            <li v-for="(exam, i) in tExamList" :key="exam.id" @click="moveToDetail(exam.id)">
              <div class="thumbnail">
                <img :src="exam.thumbnail" />
              </div>
              <b>{{ exam.title }}</b>
              <p>{{ exam.description }}</p>
              <div class="inner_box">
                <div class>
                  <div class="text-center">
                    <v-rating small half-increments color="orange" v-model="exam.rating"></v-rating>
                  </div>
                </div>
                <!-- <div class="count">33</div> -->
              </div>
            </li>
            <li v-for="(exam, i) in tExamList" :key="exam.id" @click="moveToDetail(exam.id)">
              <div class="thumbnail">
                <img :src="exam.thumbnail" />
              </div>
              <b>{{ exam.title }}</b>
              <p>{{ exam.description }}</p>
              <div class="inner_box">
                <div class>
                  <div class="text-center">
                    <v-rating small half-increments color="orange" v-model="exam.rating"></v-rating>
                  </div>
                </div>
                <!-- <div class="count">33</div> -->
              </div>
            </li>

          </ul>
          
        </article>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
import { BASE_URL } from "../config/env";
// import Loading from "../components/Loading";
// axios.defaults.headers = "Access-Control-Allow-Origin: *";
const header = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  "X-Content-Type-Options": "nosniff",
  "X-XSS-Protection": "1"
};

export default {
  //   components: { Loading },
  data() {
    return {
      loading: false,
      images: [],
      examlist: [],
      tExamList: [],
      mExamList: [],
      cExamList: [],
      lExamList: [],
      iExamList: [],
      rExamList: [],
      popularLibraries: []
    };
  },
  mounted() {
    this.getExamList();
    this.getLibraries();
  },
  computed: {
    ...mapState(["userInfo", "isLogin"])
  },
  methods: {
    getExamList() {
      //store에 저장
      this.loading = true;
      axios.get(BASE_URL + "/exam/examList", { header }).then(res => {
        console.log(res.data.exam);
        this.examlist = res.data.exam;
        this.tExamList = this.examlist.filter(exam => exam.category == 1);
        this.mExamList = this.examlist.filter(exam => exam.category == 2);
        this.cExamList = this.examlist.filter(exam => exam.category == 3);
        this.lExamList = this.examlist.filter(exam => exam.category == 4);
        this.iExamList = this.examlist.filter(exam => exam.category == 5);
        this.rExamList = this.examlist.filter(exam => exam.category == 6);
        this.loading = false;
      });
    },
    getLibraries() {
      axios.get(BASE_URL + "/library", { header }).then(res => {
        console.log("res >!!! ", res.data);

        res.data.imageInfo.forEach(image => {
          if (image.use.length > 0) {
            console.log("image > !!!1", image);
            let data = {
              id: image._id,
              title: image.title,
              length: image.use.length
            };
            this.popularLibraries.push(data);
          }
        });
        console.log("this.popularLibraries", this.popularLibraries);
        this.popularLibraries.sort((a, b) => {
          return a.length > b.length ? -1 : a.length > b.length ? 1 : 0;
        });
        this.popularLibraries.slice(0, 5);
      });
    },
    moveToDetail(id) {
      this.$router.push({ name: "detail", params: { id: id } });
    }
  }
};
</script>
<style scoped>
.container {
  max-width: 1000px;
  border-radius: 3px;
  /* background:rgb(5, 4, 102); */
}

.conWrap {
  padding: 10px;
  max-width: 1200px;
  margin: 0 auto;
}
.conWrap .left {
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 50px;
}
.navBox {
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

.conWrap .left article {
  background: #e8e8e8;
  margin-top: 15px;
  border-radius: 7px;
}
.conWrap .left article header {
  color: #4999d8;
  display: flex;
  justify-content: space-between;
}
.conWrap .left article header h2 {
  padding: 10px;
  font-size: 1.3rem;
  font-weight: bold;
}
.conWrap .left article header a {
  padding: 10px;
  font-size: 1.3rem;
}
.conWrap .left article ul {
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  min-height: 260px;
  /* outline: 1px solid red; */
}
.conWrap .left article ul li {
  width: calc(18% - 5px);
  min-width: 150px;
  margin-right: 10px;
  margin: 10px;
  cursor: pointer;
}

.conWrap .left article ul li p {
  height: 20px;
  overflow: hidden;
}

.conWrap .left article ul li:hover {
  font-weight: bold;
  opacity: 0.9;
}
.conWrap .left article ul li:last-child {
  margin-right: 0;
}
.thumbnail {
  width: 100%;
}
.thumbnail img {
  width: 180px;
  height: 120px;
  border-radius: 7px;
}
article ul li b {
  margin: 5px 0;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
article ul li p {
  margin: 5px 0;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
article ul li .inner_box {
  display: flex;
    margin:0 auto;
    width:150px;
}
article ul li .star {
  padding-top: 10px;
  width: 80%;
  display: flex;
  justify-content: space-between;
}
article ul li .star span {
  width: 18px;
  height: 18px;
  background: url("../assets/images/home/star_off.png") no-repeat center
    center/contain;
}
article ul li .star .on {
  background-image: url("../assets/images/home/star_on.png");
}
article ul li .star .half {
  background-image: url("../assets/images/home/star_half.png");
}
article ul li .count {
  width: calc(20% - 5px);
  line-height: 40px;
  margin-left: 5px;
}
@media all and (max-width:1083px){
.conWrap .left article ul li {
  width: calc(23% - 5px);
}
}
@media all and (max-width:979px){
.conWrap .left article ul li {
  width: calc(31% - 5px);
}
}
@media all and (max-width:849px){
    .navBox{
        justify-content: space-between;
    }
     .navBox a{
        width:48%;
        margin:0;
    }
.conWrap .left article ul li {
  width: 46%;
}
}
@media all and (max-width:700px){
    .conWrap .left article ul{
        padding:0;
    }
.conWrap .left article ul li {
  width: 100%;
  margin-bottom: 20px;
}
.conWrap .left article ul li b{
    margin:10px;
}
.conWrap .left article ul li p{
    overflow:inherit
}
.conWrap .left article ul li .thumbnail img{
    width:70%;
    height: auto;
}
}
@media all and (max-width:450px){
.conWrap .left article ul li {
  font-size: 13px;
}
}
@media all and (max-width: 350px){
.conWrap .left{
    margin:0 0 20px;
    min-width:180px
}
}
</style>
