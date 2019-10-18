<template>
  <div class="container">
    <div id="pageWrap">
      <div style="margin:30px auto;">
        <el-input placeholder="search" v-model="searchWord" class="search">
          <el-button slot="append" icon="el-icon-search" @keyup.enter="search" @click="search"></el-button>
        </el-input>
      </div>
      <div class="configBox">
        <!-- <select>
          <option value="best">인기문제</option>
          <option value="latest">최신문제</option>
          <option value="difficulty">난이도별</option>
        </select>-->
      </div>

      <section class="examList">
        <div v-if="userInfo._id" class="examWrap">
          <p id="subtitle">내가푼 문제</p>
          <ul>
            <li
              v-for="(exam, i) in userExam"
              :key="exam._id"
              @click="moveToDetail(exam._id, exam.status)"
            >
              <!-- <em class="memberType tutor">초1수학</em> -->
              <div class="photo">
                <img v-if="exam.thumbnail" :src="exam.thumbnail" alt="photo" />
                <img v-else src="@/assets/images/home/스마트폰-사진.jpg" alt="photo" />
              </div>
              <div class="contentWrap">
                <p class="title">
                  <b>{{ exam.title }}</b>
                </p>
                <!-- <p class="author">{{ exam.author.username }}</p> -->
                <div class="listInfo">
                  <span>{{ exam.examinee.length }} 명 참여중</span>
                  <span id="dayInfo">
                    {{
                    moment(exam.created_at).fromNow()
                    }}
                  </span>
                </div>
              </div>
            </li>
            <!-- <p id="more">더보기</p> -->
          </ul>
        </div>
        <div class="exam examWrap">
          <p id="subtitle">인기 문제</p>
          <ul>
            <li
              v-for="(exam, i) in examlist"
              :key="exam.id"
              @click="moveToDetail(exam._id, exam.status)"
            >
              <!-- <em class="memberType tutor">초1수학</em> -->
              <div class="photo">
                <img v-if="exam.thumbnail" :src="exam.thumbnail" alt="photo" />
                <img v-else src="@/assets/images/home/스마트폰-사진.jpg" alt="photo" />
              </div>
              <div class="contentWrap">
                <p class="title">
                  <b>{{ exam.title }}</b>
                </p>
                <p class="author">{{ exam.author.username }}</p>
                <div class="listInfo">
                  <span>{{ exam.examinee.length }} 명 참여중</span>
                  <span id="dayInfo">
                    {{
                    moment(exam.created_at).fromNow()
                    }}
                  </span>
                </div>
              </div>
            </li>
          </ul>
          <a class="more" href="#">더보기</a>
        </div>
        <div class="exam">
          <p id="subtitle">최신 문제</p>
          <ul>
            <li
              v-for="(exam, i) in examlist"
              :key="exam.id"
              @click="moveToDetail(exam._id, exam.status)"
            >
              <!-- <em class="memberType tutor">초1수학</em> -->
              <div class="photo">
                <img v-if="exam.thumbnail" :src="exam.thumbnail" alt="photo" />
                <img v-else src="@/assets/images/home/스마트폰-사진.jpg" alt="photo" />
              </div>
              <div class="contentWrap">
                <p class="title">
                  <b>{{ exam.title }}</b>
                </p>
                <p class="author">{{ exam.author.username }}</p>
                <div class="listInfo">
                  <span>{{ exam.examinee.length }} 명 참여중</span>
                  <span id="dayInfo">
                    {{
                    moment(exam.created_at).fromNow()
                    }}
                  </span>
                </div>
              </div>
            </li>
          </ul>
          <a class="more" href="#">더보기</a>
        </div>
      </section>
    </div>
  </div>

  <!-- //page -->
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
import { BASE_URL } from "../config/env";
import moment from "moment";
import pivatePwd from "./pivatePwd";
const header = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  "X-Content-Type-Options": "nosniff",
  "X-XSS-Protection": "1"
};

export default {
  data() {
    return {
      images: [],
      examlist: [],
      userExam: [],
      moment: moment,
      searchWord: null,
      dialogVisible: false,
      password: null,
      displayBackground: false,
      currentComponent: null
    };
  },
  mounted() {
    this.getExamList();
  },
  computed: {
    ...mapState(["userInfo", "isLogin"])
  },
  methods: {
    getExamList() {
      let accessToken = localStorage.getItem("accessToken");

      let config;
      if (accessToken !== null) {
        config = {
          headers: {
            accessToken: accessToken
          }
        };
      }
      //store에 저장
      axios.get(BASE_URL + "/exam/examList", config).then(res => {
        console.log("getExamList", res);
        this.examlist = res.data.exam;
        this.userExam = res.data.userExam;
      });
    },
    search() {
      console.log("search!!!!");

      let params = {
        searchWord: this.searchWord
      };
      axios.get(BASE_URL + "/exam/examList", { params }).then(res => {
        if (res.status == 200) {
          this.examlist = res.data.exam;
          this.userExam = res.data.userExam;
        }
      });
    },
    moveToDetail(id, status) {
      if (status == "PRIVATE") {
        this.$router.push({ name: "pivate", params: { id: id } });
      } else {
        this.$router.push({ name: "examDetail", params: { id: id } });
      }
    }
  }
};
</script>
<style scoped>
.container {
}

#pageWrap .pageWrap {
  width: 100%;
}
#pageWrap .search {
  width: 90%;
  max-width: 600px;
  margin: 40px 0 40px 0;
}
#pageWrap .examList ul {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
}

#pageWrap .examList #subtitle {
  text-align: left;
  width: 100%;
  font-weight: bold;
  color: #333;
  margin: 20px 30px;
}
#pageWrap .examList .examWrap {
  border-bottom: 1px solid #dedede;
  margin: 20px 0 50px 0;
}
#pageWrap .examList .examWrap[data-v-fae5bece]:after,
.exam {
  content: "";
  display: block;
  clear: both;
}
#more {
  display: block;
  text-align: left;
}
#pageWrap .configBox {
  max-width: 1100px;
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
}
#pageWrap .configBox a {
  margin-left: 30px;
  text-decoration: underline;
  letter-spacing: 1px;
  color: #555;
}

#pageWrap .configBox select {
  height: 35px;
  width: 120px;
  padding-left: 8px;
  border: 1px solid #c4c4c4;
  background: #fff;
}

#pageWrap .configBox select:nth-child(2) {
  margin: 0 15px;
}

#pageWrap .configBox .btnConfig {
  background: #222;
  color: #fff;
  height: 35px;
  border-radius: 3px;
  width: 120px;
}
.contentWrap {
  padding: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

#pageWrap .examList .title b {
  font-size: 14px;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

#pageWrap .examList .author {
  font-size: 14px;
  text-align: left;
  margin: 0;
}
#pageWrap .examList .author:after {
  content: "";
  font-size: 12px;
}
#pageWrap .examList li {
  border: 1px solid #e8e8e8;
  background: #fff;
  /* padding: 20px; */
  box-sizing: border-box;
  flex: 0 1 auto;
  /* width: calc(20% - 20px); */
  width: 200px;
  margin: 0 10px 30px;
  position: relative;
  box-shadow: 0 3px 4px 2px rgba(197, 197, 197, 0.1);
}
#pageWrap .examList li:hover {
  box-shadow: 0 4px 5px 2px rgba(199, 199, 199, 0.4);
}
.more {
  float: right;
  margin-bottom: 20px;
}
@media all and (max-width: 500px) {
  #pageWrap .examList li {
    padding: 20px;
    width: 100%;
  }
}
#pageWrap .examList li:hover {
  cursor: pointer;
}

#pageWrap .memberType {
  position: absolute;
  right: 10px;
  top: 10px;
  background: #ddd;
  color: #fff;
  display: block;
  width: 50px;
  font-size: 12px;
  height: 20px;
  border-radius: 3px;
  text-align: center;
}

#pageWrap .memberType.tutor {
  background: rgb(100, 53, 153);
}

#pageWrap .memberType.worker {
  background: rgb(74, 138, 59);
}

#pageWrap .photo {
  width: 100%;
  height: 100px;
  overflow: hidden;
  margin: 0 auto;
}

#pageWrap .photo img {
  width: 100%;
  height: 100%;
}

#pageWrap .listInfo {
  text-align: left;
  color: #555;
}
#pageWrap .listInfo span {
  font-size: 13px;
  padding-right: 5px;
}
#pageWrap .listInfo #dayInfo:before {
  content: "•";
  padding-right: 5px;
}
/* #pageWrap .listInfo dl {
  display: flex;
  font-size: 13px;
}

#pageWrap .listInfo dt {
  flex: 0 1 auto;
  width: 100px;
}

#pageWrap .listInfo dd {
  flex: 0 1 auto;
} */

#pageWrap .examList .status {
  width: 100px;
  height: 35px;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  text-align: center;
  margin: 20px auto 10px;
}

#pageWrap .examList .status select {
  border: none;
  width: 100%;
  display: block;
  height: 35px;
  padding-left: 10px;
}
</style>
