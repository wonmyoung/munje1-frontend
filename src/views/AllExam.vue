<template>
  <div class="container">
    <div class="conWrap">
      <div v-loading="loading" class="left">
        <div class="navBox">
          <a href="/examDetail">Lessons</a>
          <router-link to="/library">Libraries</router-link>
        </div>

        <article v-if="$route.query.id == '0'">
          <header>
            <h2>나의문제</h2>
          </header>
          <ul class="newWrap">
            <li
              v-for="(results, i) in userInfo.resultData.filter(item => item.examId != null)"
              :key="i"
              @click="moveToDetail(results.examId)"
            >
              <div class="thumbnail">
                <img :src="results.examId.thumbnail" />
              </div>
              <b>{{ results.examId.title }}</b>
              <p>{{ results.examId.description }}</p>
              <div class="inner_box">
                <div class>
                  <div class="text-center">
                    <v-rating small half-increments color="orange" v-model="results.examId.rating"></v-rating>
                  </div>
                </div>
              </div>
            </li>
            <li v-for="(exam, i) in sortExamList" :key="exam.id" @click="moveToDetail(exam._id)">
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
            <!-- <li
              v-for="(results, i) in userInfo.resultData.filter(item => item.examId != null)"
              :key="i"
              @click="moveToDetail(results.examId)"
            >
              <div class="thumbnail">{{results}}</div>
            </li>-->
          </ul>
        </article>
        <article v-else>
          <header>
            <h2>{{title}}</h2>
          </header>
          <ul class="newWrap">
            <li v-for="(exam, i) in sortExamList" :key="exam.id" @click="moveToDetail(exam._id)">
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
              @click="moveToDetail(exam.id)"
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
      title: null,
      images: [],
      examlist: [],
      sortExamList: [],
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
      this.loading = true;
      axios.get(BASE_URL + "/exam/examList", { header }).then(res => {
        console.log(res.data.exam);
        let index = this.$route.query.id;
        this.title = this.$route.query.title;
        console.log(this.$route.query.title);

        this.examlist = res.data.exam;

        this.sortExamList = this.examlist.filter(exam => {
          if (exam.category == index || exam.author == this.userInfo._id)
            return exam;
        });

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
  max-width: 1200px;
  border-radius: 3px;
  /* background:rgb(5, 4, 102); */
}

.conWrap {
  padding: 10px;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
}
.conWrap .left {
  box-sizing: border-box;
  width: calc(75% - 20px);
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
  width: 100%;
  margin: 30px auto;
  display: flex;
  flex-wrap: wrap;
  min-height: 260px;
  /* outline: 1px solid red; */
}
.conWrap .left article ul li {
  width: calc(25% - 30px);
  margin: 0 30px 30px 0;
  min-width: 150px;
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
  text-align: center;
}
article ul li .inner_box {
  display: flex;
  margin: 0 auto;
  width: 150px;
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
@media all and (max-width: 1182px) {
  .conWrap .left article ul li {
    width: calc(33% - 30px);
  }
}
@media all and (max-width: 982px) {
  .navBox {
    justify-content: space-between;
  }
  .navBox a {
    width: 48%;
    margin: 0;
  }
  .conWrap .left article ul li {
    width: calc(50% - 30px);
  }
}
@media all and (max-width: 686px) {
  .conWrap .left {
    width: 100%;
  }
  .right {
    display: none;
  }
  .conWrap .left article ul {
    padding-left: 0;
  }
  .conWrap .left article ul li {
    width: 100%;
    margin-right: 0;
  }
  .conWrap .left article ul li .thumbnail img {
    width: 80%;
    height: auto;
  }
}
</style>
