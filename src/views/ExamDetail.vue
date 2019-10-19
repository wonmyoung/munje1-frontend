<template>
  <div class="container">
    <div class="contentWrap">
      <div v-if="index == 0 && resultData.resultId == null" class="intro">
        <div class="munjeWrap">
          <h1>문제 풀기</h1>
          <div class="thumbnailWrap">
            <img :src="exam.thumbnail" class="thumbnail" />
          </div>
          <p>
            제목 :
            <b>{{ exam.title }}</b>
          </p>
          <p>
            저자 :
            <b>{{ exam.author }}</b>
          </p>
          <!-- <p>
              카테고리 :
              <b>{{ exam.category }}</b>
          </p>-->
          <p>
            문제집 요약설명 :
            <b>{{ exam.description }}</b>
          </p>
        </div>
        <el-button type="primary" class="btn" @click="next">
          다음
          <i class="el-icon-arrow-right"></i>
        </el-button>
      </div>
      <div v-else-if="index < exam.questions.length && isFinish == false">
        <div class="munjeWrap">
          <div class="munjeContent">
            <el-row>
              <el-col :span="1">
                <div class="grid-content bg-purple bold">{{ index }}.</div>
              </el-col>
              <el-col :span="23">
                <div
                  class="grid-content bg-purple-light left"
                  v-html="exam.questions[index].question"
                ></div>
                <div v-show="exam.questions[index].images.length">
                  <ul class="preview">
                    <li v-for="(image, i) in exam.questions[index].images" :key="i">
                      <img :src="image" class="questionImage" />
                    </li>
                  </ul>
                </div>
              </el-col>
            </el-row>
          </div>

          <span id="subtitle">보기</span>
          <el-radio-group v-model="exam.questions[index].answer">
            <el-radio :label="1">1번</el-radio>
            <el-radio :label="2">2번</el-radio>
            <el-radio :label="3">3번</el-radio>
            <el-radio :label="4">4번</el-radio>
            <el-radio :label="5">5번</el-radio>
          </el-radio-group>
        </div>

        <div class="btnWrap">
          <el-button type="primary" class="btn" @click="prev">
            <i class="el-icon-arrow-left"></i>이전
          </el-button>
          <div class="change">
            <el-button type="primary" class="btn" @click="next">
              다음
              <i class="el-icon-arrow-right"></i>
            </el-button>
            <el-button
              :class="{
                btnToggle: exam.showSolution,
                btn: !exam.showSolution
              }"
              @click="checkSolution"
            >정답및해설</el-button>
          </div>
        </div>
        <div v-show="exam.showSolution" class="munjeWrap">
          <h3>정답 및 해설</h3>
          <article>
            <p class="value">정답 : {{ exam.questions[index].value }}</p>
            <div v-html="exam.questions[index].solution"></div>
          </article>
        </div>
        <div class="commentInputWrap">
          <h4>댓글작성</h4>
          <article>
            <p class="author">작성자 : {{ userInfo.username }}</p>
            <el-input
              class="textarea"
              placeholder="댓글을 작성하려면 로그인 해주세요."
              type="textarea"
              v-model="content"
              style="min-height: 60px;"
            ></el-input>
            <div class="registerBtnWrap">
              <el-button type="primary" class="registerComment" @click="registerComment">등록</el-button>
            </div>
            <p class="countion">
              해당 문제와 연관이 없는 내용의 댓글은 운영원칙에 따라 삭제될 수
              있습니다.
              <br />또한, 해당 댓글을 상습적으로 등록하면 서비스 이용에 제한을
              받을 수 있으니 참고 부탁드립니다.
            </p>
          </article>
        </div>
        <div class="commentWrap">
          <h4>
            댓글
            <b>{{ comments.length }}</b>
          </h4>
          <ul>
            <li class="commentlist" v-for="(comment, i) in comments" :key="i">
              <div class="name">
                <div class="left">
                  <p class="author">{{ comment.author.username }}</p>
                  <p class="date">{{ moment(comment.created_at).fromNow() }}</p>
                </div>
                <div v-if="userInfo._id == comment.author._id" class="right">
                  <a @click="editComment(i)">수정</a>
                  <a @click="deleteComment(comment._id)">삭제</a>
                </div>
              </div>
              <p v-show="commentEditMode[i] !== true" class="comment">{{ comment.comment }}</p>
              <div v-show="commentEditMode[i] == true">
                <el-input calss="textarea" type="textarea" v-model="comment.comment"></el-input>
                <div class="registerBtnWrap">
                  <el-button
                    type="primary"
                    class="registerComment"
                    @click="submitComment(comment._id, comment.comment)"
                  >등록</el-button>
                </div>
              </div>
              <span class="replyButton" @click="createReply(i)">답글달기</span>
              <div v-if="replyMode[i] == true">
                <el-input
                  class="textarea_reply"
                  placeholder="댓글을 작성하려면 로그인 해주세요."
                  v-model="reply"
                  type="textarea"
                ></el-input>
                <div class="rightBtnWrap">
                  <el-button
                    type="primary"
                    class="registerReply"
                    @click="handleReply(comment._id)"
                  >등록</el-button>
                </div>
              </div>
              <ul v-show="comment.replys.length > 0" class="replyWrap">
                <li class="replylist" v-for="(reply, i) in comment.replys" :key="i">
                  <p class="author">{{ reply.userId.username }}</p>
                  <p class="comment">{{ reply.content }}</p>
                  <p class="date">{{ moment(reply.created_at).fromNow() }}</p>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div v-else-if="isFinish == true">
        <table class="resultTable">
          <thead>
            <tr>
              <th>문제번호</th>
              <th>정답</th>
              <th>나의답안</th>
              <th>정답여부</th>
            </tr>
          </thead>
          <tr v-for="(result, i) in resultData.results" :key="i">
            <td>{{ result.id }}번</td>
            <td>{{ result.value }}</td>
            <td>{{ result.answer }}</td>
            <td>{{ result.result }}</td>
          </tr>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>정답개수</th>
              <th style="font-weight:bold;font-size:16px;">{{ sum.length }}</th>
            </tr>
          </thead>
        </table>

        <div class="btnWrap">
          <el-button type="primary" class="btn" @click="confirm">확인</el-button>
        </div>
      </div>
    </div>
    <div class="menu" ref="menu">
      <h2 id="username">{{ userInfo.username }}</h2>
      <a id="menuTitle" @click="toggleMenutTable">
        나의 최근 성적
        <i v-show="display == false" class="el-icon-arrow-down"></i>
        <i v-show="display == true" class="el-icon-arrow-up"></i>
      </a>
      <transition mode="in-out">
        <div class="resultWrap">
          <div v-if="userResults[0] !== undefined">
            <ul v-show="display">
              <p>
                {{
                moment(userResults[0].created_at).format("YYYY년 MM월 DD일")
                }}
              </p>
              <li>
                <table class="menuTable">
                  <tr>
                    <th>번호</th>
                    <th>
                      {{
                      moment(userResults[0].results[0].created_at).fromNow()
                      }}
                    </th>
                    <th>
                      {{
                      moment(userResults[1].results[0].created_at).fromNow()
                      }}
                    </th>
                    <th>
                      {{
                      moment(userResults[2].results[0].created_at).fromNow()
                      }}
                    </th>
                  </tr>
                  <td>
                    <tr
                      v-for="(question, i) in exam.questions.filter(
                        (q, i) => i > 0
                      )"
                      :key="i"
                    >
                      {{
                      i + 1
                      }}
                    </tr>
                  </td>

                  <td>
                    <tr
                      v-for="(result, i) in userResults[0].results"
                      :key="i"
                      :class="{
                        good: result.result == 1,
                        bad: result.result == 0
                      }"
                    ></tr>
                  </td>

                  <td>
                    <tr
                      v-for="(result, i) in userResults[1].results"
                      :key="i"
                      :class="{
                        good: result.result == 1,
                        bad: result.result == 0
                      }"
                    ></tr>
                  </td>

                  <td>
                    <tr
                      v-for="(result, i) in userResults[2].results"
                      :key="i"
                      :class="{
                        good: result.result == 1,
                        bad: result.result == 0
                      }"
                    ></tr>
                  </td>
                </table>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <div class="btnMenu">
      <el-button type="primary" icon="el-icon-arrow-up" circle @click="handleMenu" class="open"></el-button>
    </div>
    <!-- <div id="background" :class="{ on: displayBackground == true ? true : false }">
      <div class="modalRight">
        <a class="rightModalBtnClose" @click="closeModal">✕</a>
        <component v-bind:is="currentComponent"></component>
      </div>
    </div>-->
  </div>
</template>
<script>
import { BASE_URL } from "../config/env";
import axios from "axios";
import moment from "moment";
import { mapState } from "vuex";
export default {
  data() {
    return {
      index: 0,
      userValue: null,
      display: false,
      // activeNames: ["0"],
      isFinish: false,
      menuVisible: false,
      exam: {
        examId: null,
        title: null, //문제집 이름
        created_at: null,
        description: null,
        thumbnail: null,
        author: null,
        isFinish: false,
        showSolution: false,
        questions: [
          {
            id: null,
            question: null,
            images: [],
            value: null,
            answer: null,
            examples: [],
            solution: null
          }
        ]
      },
      resultData: {
        examId: null,
        finish: false,
        resultId: null,
        results: []
      },
      sum: [],
      userResults: [],
      content: "",
      comments: [],
      reply: "",
      moment: moment,
      replyMode: [],
      commentEditMode: []
    };
  },
  created() {
    this.getCommentInfo();
    this.getExamInfo();
    this.getResultData();
  },
  computed: {
    ...mapState(["userInfo", "isLogin"])
  },
  mounted() {},
  methods: {
    handleMenu() {
      // if (this.$refs.menu.style.display == "none") {
      //   this.$refs.menu.style.display = "block";
      //   this.$refs.menu.style.display = "block";
      // } else {
      //   this.$refs.menu.style.display = "none";
      // }
    },
    getExamInfo() {
      let accessToken = localStorage.getItem("accessToken");
      let config = {
        headers: {
          accessToken: accessToken
        }
      };
      axios
        .get(BASE_URL + `/exam/detail/${this.$route.params.id}`, config)
        .then(res => {
          console.log("getExamInfo : res > > ", res);
          let exam = JSON.parse(res.data.exam);

          this.exam.title = exam.title;
          this.exam.examId = exam._id;
          this.resultData.examId = exam._id;
          this.exam.description = exam.description;
          this.exam.thumbnail = exam.thumbnail;
          this.exam.created_at = exam.created_at;
          this.exam.author = exam.author.username;

          let item = {
            questions: [
              {
                value: null,
                images: [],
                examples: [],
                question: null,
                solution: null
              }
            ]
          };

          let data;

          for (let i = 0; i < exam.questions.length; i++) {
            if (
              res.data.preExam &&
              res.data.preExam.finish == false &&
              res.data.preExam.results[i] !== undefined
            ) {
              data = {
                question: exam.questions[i].question,
                value: exam.questions[i].value,
                images: exam.questions[i].images,
                solution: exam.questions[i].solution,
                answer: res.data.preExam.results[i].answer
              };
            } else {
              data = {
                question: exam.questions[i].question,
                value: exam.questions[i].value,
                images: exam.questions[i].images,
                solution: exam.questions[i].solution
              };
            }
            item.questions.push(data);
          }

          this.exam.questions = item.questions;
          let results = res.data.preExam.results;
          if (res.data.preExam.finish == false) {
            this.resultData.results = res.data.preExam.results;
            this.resultData.examId = this.$route.params.id;
            this.resultData.resultId = res.data.preExam._id;
            this.index = results[results.length - 1].id;
            console.log("this.index", this.index);
          }
        });
    },
    next() {
      if (this.index > 0) {
        let answer = this.exam.questions[this.index].answer;
        let value = this.exam.questions[this.index].value;
        let question = this.exam.questions[this.index].question;
        let examId = this.exam.examId;

        let result = null;
        let id = this.index;
        if (answer == value) {
          result = 1;
        } else {
          result = 0;
        }
        let data = {
          id: id,
          answer: answer,
          value: value,
          result: result,
          created_at: new Date()
        };
        this.resultData.results.splice(id - 1, 1, data);
        if (this.index + 1 == this.exam.questions.length) {
          let result = confirm("수고하셨습니다!. 모든 문제를 푸셨습니다.");
          if (result) {
            this.sum = this.resultData.results.filter(
              (result, i) => result.result == 1
            );
            this.isFinish = true;
            this.index++;
            this.resultData.finish = true;
          }
        } else {
          this.isFinish = false;
          this.index++;
          this.resultData.finish = false;
        }
        // this.resultData.finish = this.finish;

        let accessToken = localStorage.getItem("accessToken");
        let config = {
          headers: {
            accessToken: accessToken
          }
        };
        console.log("this.isFinish : ", this.isFinish);
        console.log("this.resultData :before ", this.resultData);

        axios
          .post(BASE_URL + "/exam/register/result", this.resultData, config)
          .then(res => {
            if (res.status == 200) {
              this.resultData.resultId = res.data.resultId;
            }
          });
      } else {
        this.index++;
      }
      this.exam.showSolution = false;
    },

    checkSolution() {
      this.exam.showSolution = !this.exam.showSolution;
    },
    confirm() {
      /**
       * 초기화
       */
      this.exam.questions = null;
      this.isFinish = false;
      this.index = 0;
      this.resultData.resultId = null;

      this.getResultData();
      this.getExamInfo();
    },
    registerComment() {
      if (!this.isLogin) return alert("로그인 후 사용가능 합니다.");

      let accessToken = localStorage.getItem("accessToken");
      let config = {
        headers: {
          accessToken: accessToken
        }
      };
      let data = {
        comment: this.content,
        index: this.index
      };
      axios
        .post(
          BASE_URL + `/comment/register/${this.$route.params.id}`,
          data,
          config
        )
        .then(res => {
          if (res.status == 200) {
            this.getCommentInfo();
            this.content = "";
          }
        });
    },
    getCommentInfo() {
      let accessToken = localStorage.getItem("accessToken");
      let config = {
        headers: {
          accessToken: accessToken
        }
      };
      axios
        .get(BASE_URL + `/comment/commentInfo/${this.$route.params.id}`, config)
        .then(res => {
          if (res.data.status == 200) {
            this.comments = res.data.commentInfo;
            res.data.commentInfo.map((item, i) => {
              this.replyMode[i] = false;
            });
            let list = this.commentEditMode.map(() => false);
            this.commentEditMode = list;
          }
        });
    },
    createReply(i) {
      /**배열의 변경을 DOM감지 하기위해서는 push, shift, splice등 사용하여 원형요소가 변형되도록 해야 하거나, 참조하고 있는 주소가 변경되어야 한다 */
      let list = this.replyMode.map(() => false);
      list.splice(i, 1, true);
      this.replyMode = list;
    },
    handleReply(id) {
      if (!this.isLogin) return alert("로그인 후 사용가능 합니다.");
      let accessToken = localStorage.getItem("accessToken");
      let config = {
        headers: {
          accessToken: accessToken
        }
      };
      let data = {
        reply: this.reply
      };
      axios.post(BASE_URL + `/comment/${id}/reply`, data, config).then(res => {
        if (res.data.status == 200) {
          this.getCommentInfo();
          this.reply = "";
        }
      });
    },
    prev() {
      this.index--;
    },
    getResultData() {
      console.log("getResultData>>>>");

      let accessToken = localStorage.getItem("accessToken");
      let config = {
        headers: {
          accessToken: accessToken
        }
      };
      axios
        .get(BASE_URL + `/exam/result/${this.$route.params.id}`, config)
        .then(res => {
          if (res.status == 200) {
            this.userResults = res.data.userResult;
            console.log("res.data.userResult>>>>", res.data.userResult);
          }
        });
    },
    deleteComment(id) {
      let result = confirm("해당 댓글을 삭제 하시겠습니까?");
      if (result == false) return;
      let accessToken = localStorage.getItem("accessToken");
      let config = {
        headers: {
          accessToken: accessToken
        }
      };
      axios.get(BASE_URL + `/comment/delete/${id}`, config).then(res => {
        if (res.status == 200) {
          this.getCommentInfo();
        }
      });
    },
    editComment(i) {
      let list = this.commentEditMode.map(() => false);
      list.splice(i, 1, true);
      this.commentEditMode = list;
    },
    submitComment(id, comment) {
      let result = confirm("해당 댓글을 수정 하시겠습니까?");
      if (result == false) return;

      let accessToken = localStorage.getItem("accessToken");
      let config = {
        headers: {
          accessToken: accessToken
        }
      };
      let data = {
        comment: comment
      };
      axios.post(BASE_URL + `/comment/edit/${id}`, data, config).then(res => {
        if (res.status == 200) {
          // this.userResults = res.data.userResult;
          this.getCommentInfo();
        }
      });
    },
    toggleMenutTable() {
      this.display = !this.display;
    }
  }
};
</script>
<style scoped>
.container {
  max-width: 1100px;
  height: auto;
  display: flex;
  justify-content: space-between;
  padding-right: 40px;
}
.contentWrap {
  width: 73%;
  position: relative;
}
.munjeWrap h1 {
  font-size: 1.3em;
  font-weight: bold;
  margin: 1em 0 1em 0;
}
.munjeContent {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 30px 40px 30px 40px;
  color: #383838;
  margin-bottom: 50px;
  font-size: 13px;
}

h3 {
  font-size: 18px;
  color: rgb(99, 99, 99);
  font-weight: bold;
  margin-bottom: 20px;
}
.value {
  color: rgb(221, 0, 0);
  font-weight: bold;
  margin: 10px 0;
}
.munjeWrap {
  outline: 1px solid #f7f7f7;
  width: 100%;
  padding: 40px;
  margin: 50px auto;
  text-align: left;
  background: #fff;
  box-shadow: 0 3px 3px 0 rgba(105, 105, 105, 0.1);
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
.bold {
  font-weight: bold;
  font-size: 14px;
}
.examples {
  width: 100%;
  margin: 10px;
  padding: 10px;
}
.examples > li {
  padding: 5px;
}

.exampleCircle {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 50%;
  text-align: center;
  font-size: 11px;
  line-height: 20px;
  /* padding: 10px; */
  margin-right: 10px;
}
#username {
  font-weight: bold;
  margin-bottom: 30px;
}
#username::after {
  content: " 님";
  font-size: 12px;
  font-weight: normal;
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
/* .preview {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0;
} */

.thumbnailWrap {
  width: 100%;
  margin: 0 auto;
  margin-bottom: 20px;
  text-align: center;
}
.thumbnail {
  width: 500px;
  height: auto;
  border: 1px solid #fff;
  border-radius: 10px;
  text-align: center;
}
.menu {
  position: relative;
  margin: 50px 0 50px 30px;
  width: 30%;
  max-width: 280px;
  min-width: 130px;
  outline: 1px solid #efefef;
  min-height: 700px;
  background: white;
  border: 1px solid rgb(255, 255, 255);
  text-align: left;
  padding: 20px;
  min-width: 210px;
}
.menu #title {
  font-size: 13px;
  font-weight: bold;
}
.menu ul {
  margin-top: 10px;
  margin-left: -24px;
}
.menu ul li {
  height: 40px;
  /* line-height: 40px; */
  transition: all 0.5s;
}
#menuTitle {
  text-decoration: none;
  font-size: 14px;
}
.resultWrap p {
  font-size: 13px;
  margin-bottom: 5px;
}
.menuTable {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  font-size: 12px;
  border: 1px solid #eee;
}

.menuTable th,
td {
  border: 1px solid #eee;
  text-align: center;
  line-height: 20px;
}
.menuTable tr {
  text-align: center;
}
.menuTable th:nth-child(1) {
  width: 15%;
}
.menuTable th:nth-child(2) {
  width: 25%;
}
.menuTable th:nth-child(3) {
  width: 25%;
}
.menuTable th:nth-child(4) {
  width: 25%;
}
.good:after {
  content: "O";
  color: black;
}
.bad:after {
  content: "X";
  color: red;
}
/* .menuTable tr,
td {
  font-weight: normal;
  border-style: solid;
  overflow: hidden;
  word-break: normal;
  border-color: #eee;
} */
.btnMenu {
  position: fixed;
  right: 30px;
  top: 130px;
  border-radius: 30px;
  color: #fff;
  font-size: 14px;
  padding: 5px;
  display: inline-block;
  z-index: 9999;
  display: none;
}
@media all and (max-width: 1065px) {
  #subtitle[data-v-95bc19ec] {
    margin-bottom: 10px;
  }
}
@media all and (max-width: 822px) {
  .el-radio-group {
    margin: 30px 0 10px;
  }
}
@media all and (max-width: 600px) {
  .thumbnail,
  .munjeWrap {
    width: 100%;
  }
  /* .btn {
    width: 100%;
  } */
  .container {
    padding: 20px 0;
    overflow: hidden;
  }
  .contentWrap {
    width: 90%;
    margin: 0 auto;
  }
  .menu {
    width: 200px;
    height: calc(100vh - 56px);
    position: absolute;
    top: 56px;
    right: 0;
    margin: 0;
  }

  #background {
    /* position: fixed; */
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    left: 0;
    top: 0;
    z-index: 9999;
    display: none;
  }

  #background.on {
    /* 모달창에 on클래스 붙으면 나온다 */
    display: block;
  }
  /* .btnWrap {
    flex-wrap: wrap;
  }
  .btnWrap button {
    margin: 10px 0;
  } */
  .btnMenu {
    position: absolute;
    display: block;
    bottom: 30px;
    right: 20px;
    height: 50px;
    bottom: 20px;
  }
  /* .btnWrap .change {
    flex-wrap: wrap;
    width: 100%;
  } */
}
.questionImage {
  width: 100%;
  height: auto;
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
  color: #ddd;
}

.preview > li > .el-button {
  padding: 3px;
  border: 3px solid #fff;
  margin: 20px;
  border-radius: 5px;
}

.rightBtnWrap {
  text-align: right;
  margin: 10px 0 10px 0;
}
.btn {
  margin: 10px;
}
.btnToggle {
  margin: 10px;
  background: #409eff;
  color: #fff;
}
.resultImage {
  width: 80%;
  height: 100px;
  border: 1px solid #efefef;
  border-radius: 12px;
}
.resultTable {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  background: #fff;
  margin: 50px 0 30px;
  /* font-size: 12px; */
}

.resultTable th {
  font-size: 14px;
  font-weight: bold;
  font-weight: normal;
  border-style: solid;
  overflow: hidden;
  word-break: normal;
  /* border-color: #ddd; */
  background: #eee;
}
.resultTable td,
th {
  padding: 5px;
  border: 1px solid #ddd;
}
.resultTable td,
th:nth-child(1) {
  width: 30px;
}
.resultTable td,
th:nth-child(2) {
  width: 50px;
}
.resultTable th:nth-child(3) {
  width: 50px;
}
.resultTable th:nth-child(4) {
  width: 50px;
}
.resultTable td,
th:nth-child(5) {
  width: 40px;
}
.btnWrap {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 50px;
}
.btnWrap .change {
  display: flex;
  flex-direction: row-reverse;
}
.commentInputWrap {
  margin-bottom: 10px;
  padding: 20px;
  background: #fff;
}
.commentlist .name {
  display: flex;
  justify-content: space-between;
}

.commentlist .name .right,
.commentlist .name .left {
  display: flex;
}
.commentlist .name .left .author:after {
  content: "|";
  margin: 0 10px;
  color: #ccc;
}
.commentlist .name .right a {
  margin-right: 10px;
  font-size: 13px;
}
.commentlist .name .right a:last-child {
  color: red;
}
.commentInputWrap .author {
  color: #666;
  text-align: left;
  margin-top: 15px;
}
.commentInputWrap .countion {
  color: #555;
  font-size: 13px;
  background: #f2f2f2;
  padding: 10px;
  margin-top: 15px;
}
h4 {
  text-align: left;
}
.comment {
  margin: 15px;
}
.registerBtnWrap {
  text-align: right;
}
.commentWrap {
  background: #fff;
  text-align: left;
  padding: 20px;
}
.commentWrap .author {
  /* text-align: right; */
  font-size: 13px;
  color: #666;
}
.commentWrap .replyButton {
  text-align: right;
  display: inline-block;
  margin: 0 10px 10px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 3px;
  font-size: 12px;
  color: #666;
}
.commentWrap .replyButton:hover {
  cursor: pointer;
  background: #efefef;
}
.commentWrap .date {
  text-align: right;
  margin: 0;
  font-size: 14px;
  color: #666;
}
.commentWrap .commentlist {
  border-bottom: 1px solid #eaeaea;
  margin: 20px 0 20px 0;
}
.commentWrap .commentlist a {
  font-size: 13px;
  color: #666;
}
.textarea {
  min-height: 60px;
}
.replyWrap {
  background: #f9f9f9;
  padding: 10px;
}

.replylist {
  width: 90%;
  margin: 0 auto;
  padding: 10px;
  border-top: 1px solid #eaeaea;
}
#subtitle {
  margin-right: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  display: inline-block;
}
td tr {
  width: 100%;
  display: block;
}
</style>
