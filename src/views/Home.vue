<template>
  <div class="container">
    <div id="pageWrap">
      <section class="configBox">
        <select>
          <option value="best">인기문제</option>
          <option value="latest">최신문제</option>
          <option value="difficulty">난이도별</option>
        </select>
      </section>

      <section class="examList">
        <ul>
          <li
            class="userExam"
            v-for="(results, i) in userInfo.userExam"
            :key="i"
            @click="moveToDetail(results._id)"
          >
            <div class="thumbnail">
              <img :src="results.thumbnail" />
            </div>
            <b>{{ results.title }}</b>
            <p>{{ results.description }}</p>
            <!-- <p>문제푼날짜:{{ results.created_at.substr(0, 10) }}</p> -->
            <!-- <p>{{ moment(results.created_at).fromNow() }}</p> -->
            <div class="inner_box">
              <div class>
                <div class="text-center">
                  <v-rating small half-increments color="orange" v-model="results.rating"></v-rating>
                </div>
              </div>
            </div>
          </li>
          <li v-for="(exam, i) in examlist" :key="exam.id" @click="moveToDetail(exam._id)">
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
              <div class="listDays">
                <dl>
                  <dd>23명 참여중</dd>
                </dl>
                <dl>
                  <dd>{{ moment(exam.created_at).format("YYYY-MM-DD") }}</dd>
                </dl>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>
    <!-- //page -->
  </div>
  <!-- //page -->
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
import { BASE_URL } from "../config/env";
import moment from "moment";
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
      moment: moment
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
      //store에 저장
      axios.get(BASE_URL + "/exam/examList", { header }).then(res => {
        console.log(res);
        this.examlist = res.data.exam;
      });
    },
    moveToDetail(id) {
      this.$router.push({ name: "examDetail", params: { id: id } });
    }
  }
};
</script>
<style scoped>
.container {
  /* max-width:1000px; */
  border-radius: 3px;
  /* background: rgb(5, 4, 102); */
  max-width: 1300px;
}

#pageWrap .pageWrap {
  width: 100%;
}

#pageWrap .examList ul {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
}
#pageWrap .examList ul .userExam {
  border-bottom: 1px solid #ccc;
  margin: 20px 0 20px 0;
}
#pageWrap .configBox {
  text-align: right;
  margin-bottom: 30px;
}

#pageWrap .configBox select {
  height: 35px;
  width: 120px;
  padding-left: 8px;
  border: 1px solid #c4c4c4;
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
  padding: 20px;
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
}

#pageWrap .examList .author {
  font-size: 15px;
  text-align: left;
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
  width: 220px;
  margin: 0 10px 20px;
  position: relative;
  box-shadow: 0 4px 5px 2px rgba(153, 153, 153, 0.1);
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

#pageWrap .listDays {
  border-top: 1px solid #e8e8e8;
  padding-top: 10px;
  margin-top: 10px;
}

#pageWrap .listDays dl {
  display: flex;
  font-size: 13px;
}

#pageWrap .listDays dt {
  flex: 0 1 auto;
  width: 100px;
}

#pageWrap .listDays dd {
  flex: 0 1 auto;
}

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
