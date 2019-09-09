<template>
  <div class="container">
    <div class="conWrap">
      <div class="right">
        <section class="welcome">
          <header>
            <h3>welcome</h3>
            <b v-if="userInfo">{{ userInfo.username }}</b>
            <b v-else>로그인</b>
          </header>
          <div class="button">
            <a v-if="!isLogin" @click="$router.push({ name: 'login' })">Login</a>
            <a v-else @click="$router.push({ name: 'profile' })">Profile</a>
          </div>
        </section>
        <section class="topLessons">
          <header>
            <h3>Top Lessons</h3>
          </header>
          <ul>
            <li
              v-for="(exam, i) in examlist.slice(0, 5)"
              :key="exam.id"
              @click="moveToDetail(exam._id)"
            >{{ i + 1 }}.{{ exam.title }}</li>
          </ul>
        </section>
        <section class="topLessons">
          <header>
            <h3>Top Libraries</h3>
          </header>
          <ul>
            <li
              v-for="(library, i) in popularLibraries.filter((lib, i) => i < 5)"
              :key="i"
            >{{ i + 1 }}.{{ library.title }}</li>
          </ul>
        </section>
      </div>

      <div v-loading="loading" class="left">
        <div class="navBox">
          <router-link to="/">Lessons</router-link>
          <router-link to="/library">Libraries</router-link>
        </div>
        <article v-if="isLogin">
          <header>
            <h2>나의 문제</h2>
            <a @click="$router.push({name : 'allExam', query:{id : 0, title : '나의문제'}})">See All</a>
          </header>
          <ul class="newWrap">
            <li
              v-for="(results, i) in userInfo.resultData.filter(item => item.examId != null)"
              :key="i"
              @click="moveToDetail(results.examId._id)"
            >
              <div class="thumbnail">
                <img :src="results.examId.thumbnail" />
              </div>
              <b>{{ results.examId.title }}</b>
              <p>{{ results.examId.description }}</p>
              <!-- <p>문제푼날짜:{{ results.created_at.substr(0, 10) }}</p> -->
              <p>문제푼날짜:{{ moment(results.created_at).fromNow() }}</p>
              <div class="inner_box">
                <div class>
                  <div class="text-center">
                    <v-rating small half-increments color="orange" v-model="results.examId.rating"></v-rating>
                  </div>
                </div>
              </div>
            </li>
            <li
              v-for="(results, i) in userInfo.myExam.filter(item => item._id!= null)"
              :key="i"
              @click="moveToDetail(results._id)"
            >
              <div class="thumbnail">
                <img :src="results.thumbnail" />
              </div>
              <b>{{ results.title }}</b>
              <p>{{ results.description }}</p>
              <p>문제만든날짜:{{ results.created_at.substr(0, 10) }}</p>
              <div class="inner_box">
                <div class>
                  <div class="text-center">
                    <v-rating small half-increments color="orange" v-model="results.rating"></v-rating>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </article>
        <article>
          <header>
            <h2>택트</h2>
            <a @click="$router.push({name : 'allExam', query:{id : 1, title : '택트'}})">See All</a>
          </header>
          <ul class="newWrap">
            <li v-for="(exam, i) in tExamList" :key="exam.id" @click="moveToDetail(exam._id)">
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

        <article>
          <header>
            <h2>청자반응</h2>
            <a @click="$router.push({name : 'allExam', query:{id : 3,title : '청자반응'}})">See All</a>
          </header>
          <ul class="newWrap">
            <li v-for="(exam, i) in cExamList" :key="exam.id" @click="moveToDetail(exam._id)">
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
        <article>
          <header>
            <h2>매칭</h2>
            <a @click="$router.push({name : 'allExam', query:{id : 2, title : '매칭'}})">See All</a>
          </header>
          <ul class="newWrap">
            <li v-for="(exam, i) in mExamList" :key="exam.id" @click="moveToDetail(exam._id)">
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
        <article>
          <header>
            <h2>LRFFC</h2>
            <a @click="$router.push({name : 'allExam', query:{id : 4, title : 'LRFFC'}})">See All</a>
          </header>
          <ul class="newWrap">
            <li v-for="(exam, i) in lExamList" :key="exam.id" @click="moveToDetail(exam._id)">
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
        <article>
          <header>
            <h2>인트라버벌</h2>
            <a @click="$router.push({name : 'allExam', query:{id : 5, title : '인트라버벌'}})">See All</a>
          </header>
          <ul class="newWrap">
            <li v-for="(exam, i) in iExamList" :key="exam.id" @click="moveToDetail(exam._id)">
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
        <article>
          <header>
            <h2>읽기</h2>
            <a @click="$router.push({name : 'allExam', query:{id : 6, title : '읽기'}})">See All</a>
          </header>
          <ul class="newWrap">
            <li v-for="(exam, i) in rExamList" :key="exam.id" @click="moveToDetail(exam._id)">
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
import moment from "moment";
import "moment/locale/ko";
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
      moment: moment,
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
    ...mapState(["userInfo", "isLogin"]),
    created_ats: function() {
      let date = new Date();
      return date;
    }
  },
  methods: {
    getExamList() {
      //store에 저장
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
      axios.get(BASE_URL + "/exam/examList", { header }, config).then(res => {
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
      axios.get(BASE_URL + "/library", { header, config }).then(res => {
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
      if (this.isLogin == false) return alert("로그인 후에 이용 가능합니다.");
      this.$router.push({ name: "detail", params: { id: id } });
    }
  }
};
</script>
<style scoped>
.container {
  max-width: 1200px;
  border-radius: 3px;
  /* background:rgb(5, 4, 102); */
}

.conWrap {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  padding: 10px;
  max-width: 1200px;
  margin: 0 auto;
}
.conWrap .left {
  box-sizing: border-box;
  width: calc(75% - 20px);
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
  justify-content: flex-start;
  overflow: auto;
  /* outline: 1px solid red; */
}
.conWrap .left article ul li {
  width: calc(20% - 5px);
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

.conWrap .right {
  width: calc(25% - 10px);
  flex: 0 0 auto;
  margin-top: 50px;
  height: 700px;
}
.conWrap .right .welcome {
  padding-top: 20px;
  height: 205px;
  background: white;
  border-radius: 7px;
  margin-bottom: 10px;
}

.conWrap .right .welcome h3 {
  font-size: 1.8rem;
  color: #2c77b1;
}
.conWrap .right .welcome b {
  line-height: 40px;
  padding: 15px;
}
.conWrap .right .welcome .button {
  width: 90%;
  margin: 0 auto;
  cursor: pointer;
}
.conWrap .right .welcome .button a:first-child,
.conWrap .right .welcome .button a:last-child {
  color: white;
  padding: 10px 10px;
  background: #4999d8;
  border-radius: 7px;
  text-align: center;
  display: block;
  margin-top: 20px;
}

.right .topLessons {
  height: auto;
  background: white;
  border-radius: 7px;
  margin-bottom: 10px;
  font-size: 14px;
  text-align: left;
}
.right .topLessons header {
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  color: #4999d8;
  font-size: 14px;
  /* border-bottom:1px solid black; */
  padding: 5px 15px 10px;
}

.right .topLessons ul {
  margin: 0 auto;
  padding: 0;
  overflow: hidden;
}
.right .topLessons ul li {
  padding: 10px;
  border-top: 1px solid #ccc;
  height: 42px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
p {
  font-size: 13px;
  text-align: left;
}
/* @media all and (max-width:1100px) {
    article ul li:last-child{
        display: none;
    }
    .conWrap .right .welcome header h3{
        font-size:1.3rem;
    }
    .conWrap .left article ul li{
        width:calc(30% - 10px);
        margin-right:10px;
    }
} */
@media all and (max-width: 960px) {
  .conWrap .right .topLessons header h3 {
    font-size: 1.1rem;
  }
  .conWrap .right .topLessons header a {
    font-size: 0.9rem;
  }
  .conWrap .left article ul li {
    width: calc(30% - 10px);
    margin-right: 10px;
  }
}
@media all and (max-width: 800px) {
  .conWrap .left article ul li {
    /* width:calc(30% - 10px); */
    margin-right: 10px;
  }
  .header button {
    display: none;
  }
}
@media all and (max-width: 600px) {
  .conWrap {
    padding: 0;
  }
  .conWrap .right {
    display: none;
  }
  .conWrap .left {
    float: left;
    width: 100%;
  }
  .conWrap .newWrap {
    display: block;
    padding: 0;
  }
  .conWrap .left article .newWrap li {
    min-width: 80%;
    margin: 0;
  }
  .conWrap .left article .newWrap li .thumbnail {
    margin-right: 20px;
  }
  .conWrap .left article .newWrap li img {
    width: 80%;
    height: 155px;
    margin-bottom: 20px;
  }
  .conWrap .left article .newWrap li p {
    text-align: center;
  }
  .conWrap .left article .newWrap li .inner_box {
    width: 150px;
    margin: 0 auto;
  }
}
</style>
