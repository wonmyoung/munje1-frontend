<template>
  <div class="container">
    <div class="contentWrap">
      <div v-if="index == 0" class="intro">
        <h1>문제 풀기</h1>
        <p>{{ exam.title }}</p>
        <p>
          저자 :
          <b>{{ exam.author }}</b>
        </p>
        <p>
          카테고리 :
          <b>{{ exam.category }}</b>
        </p>
        <p>{{ exam.description }}</p>
        <div class="thumbnailWrap">
          <img :src="exam.thumbnail" class="thumbnail" />
        </div>
        <div class="btnWrap">
          <el-button type="primary" class="btn" @click="next">다음</el-button>
        </div>
      </div>
      <div v-else-if="index < exam.questions.length" class="questionWrap">
        <p class="indexWrap">{{ index }}번</p>
        <h2>{{ exam.questions[index].question }}</h2>
        <div v-show="exam.questions[index].images.length">
          <ul class="preview">
            <li v-for="(image, i) in exam.questions[index].images" :key="i">
              <el-button type="danger" plain @click="select(image, index)">
                <img :src="image" class="questionImage" />
              </el-button>
            </li>
          </ul>
        </div>
        <div class="btnWrap">
          <el-button type="primary" class="btn" @click="next">다음</el-button>
        </div>
      </div>
      <div v-else-if="index == exam.questions.length" class="text-center">
        <h3>수고하셨습니다. 모든 문제를 푸셨습니다.</h3>
        <p>문제에 점수를 매겨주세요. {{ rating }}</p>
        <v-rating v-model="rating" color="orange"></v-rating>
        <el-button type="primary" class="btn" @click="submit"
          >결과보기</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import shuffle from "../util/shuffle"; //배열을 random으로 반환하는 함수
import { BASE_URL } from "../config/env";
import { eventBus } from "../main";
import ExamResult from "./ExamResult";
export default {
  component: { ExamResult },
  data() {
    return {
      index: 0,
      exam: {
        examId: null,
        title: null, //문제집 이름
        created_at: null,
        description: null,
        thumbnail: null,
        author: null,
        questions: [
          {
            question: null,
            images: [],
            value: null,
            answer: null
          }
        ]
      },
      resultData: {
        examId: null,
        results: [
          {
            id: null,
            question: null,
            answer: null,
            value: null,
            result: null
          }
        ]
      },
      rating: null
    };
  },
  mounted() {
    this.getExamInfo();
  },
  methods: {
    getExamInfo() {
      axios
        .get(BASE_URL + `/exam/detail/${this.$route.params.id}`)
        .then(res => {
          let exam = JSON.parse(res.data.exam);
          console.log("exam", exam);
          this.exam.examId = exam._id;
          this.exam.title = exam.title;
          this.exam.description = exam.description;
          this.exam.thumbnail = exam.thumbnail;
          this.exam.created_at = exam.created_at;
          this.exam.author = exam.author.username;
          let item = {
            questions: [
              {
                value: null,
                images: [],
                question: null
              }
            ]
          };
          for (let i = 0; i < exam.questions.length; i++) {
            let data = {
              question: exam.questions[i].question,
              value: exam.questions[i].value,
              images: shuffle(exam.questions[i].images)
            };
            item.questions.push(data);
          }
          this.exam.questions = item.questions;
        });
    },
    next() {
      if (this.index == 0) {
        this.resultData.examId = this.exam.examId;
      } else if (this.index > 0) {
        let answer = this.exam.questions[this.index].answer;
        let value = this.exam.questions[this.index].value;
        let question = this.exam.questions[this.index].question;
        console.log("answer!!!", answer);
        console.log("value!!!", value);
        let result = null;
        let id = this.index;
        if (answer == value) {
          result = "정답";
        } else {
          result = "오답";
        }

        let data = {
          id: id,
          question: question,
          answer: answer,
          value: value,
          result: result,
          rating: this.rating
        };
        this.resultData.results.push(data);
        console.log("resultData", this.resultData);
      }

      this.index++;
    },
    submit() {
      if (this.index == this.exam.questions.length) {
        console.log("resultData", this.resultData);

        this.resultData.results = this.resultData.results.filter(
          result => result.id > 0
        );
        let accessToken = localStorage.getItem("accessToken");

        let config = {
          headers: {
            accessToken: accessToken
          }
        };
        let data = {
          rating: this.rating,
          results: this.resultData
        };
        axios
          .post(BASE_URL + "/exam/register/result", data, config)
          .then(res => {
            if (res.status == 200) {
              // eventBus.$emit("resultdata", this.resultData);
              let userInfo = {
                resultData: this.resultData
              };
              this.$store.dispatch("UPDATE_USER_DATA", { userInfo });
              console.log("res", res);
              this.$router.push({
                name: "examResult",
                params: { id: this.resultData.examId }
              });
            }
          });
        this.index++;
      }
    },
    select(answer, index) {
      this.exam.questions[index].answer = answer;
    }
  }
};
</script>
<style scoped>
.container {
  max-width: 1000px;
  height: auto;
}
.contentWrap {
  text-align: left;
  margin: 10px auto;
  width: calc(100% - 10px);
  padding: 1em;
  border: 1px solid #ccc;
  background: #fff;
  box-shadow: 0 5px 7px 0 rgba(105, 105, 105, 0.1);
}
.contentWrap h1 {
  font-size: 1.3em;
  font-weight: bold;
  margin: 1em 0 1em 0;
}
.questionWrap h2 {
  font-size: 22px;
  color: rgb(73, 73, 73);
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 100px;
  text-align: center;
}

.indexWrap {
  text-align: right;
  border: 1px solid #f8e809;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: #f8e809;
  padding: 12px;
  color: rgb(233, 27, 27);
}
#outline {
  padding: 100px;
}
.inputBox {
  margin: 10px;
  border: 1px solid #ccc;
  width: 70%;
  height: 40px;
  padding: 2px 5px 2px 5px;
}
.preview {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
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
@media all and (max-width: 500px) {
  .thumbnail {
    width: 100%;
  }
  .el-button {
    width: 100%;
  }
}
.questionImage {
  width: 200px;
  height: 160px;
  /* border: 1px solid #efefef; */
  border-radius: 5px;
  background-repeat: no-repeat;
  background-size: cover;
}

.questionImage:hover {
  opacity: 0.9;
  cursor: pointer;
}
.numberWrap {
  text-align: center;
  line-height: 50px;
  border: 1px solid #ccc;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: #fff;
  color: rgb(73, 73, 73);
}
.preview > li > .el-button {
  padding: 3px;
  border: 3px solid #fff;
  margin: 20px;
  border-radius: 5px;
}
.btnWrap {
  text-align: right;
}
.btn {
  margin: 20px 0 10px 0;
}

.resultImage {
  width: 80%;
  height: 100px;
  border: 1px solid #efefef;
  border-radius: 12px;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  margin: 0 auto;
  text-align: center;
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
.text-center {
  /* padding-top: 10px; */
  background: #fff;
  width: 90%;
  text-align: center;
  min-height: 100px;
  margin: 70px auto;
}
h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
