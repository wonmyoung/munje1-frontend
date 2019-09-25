<template>
  <div class="container">
    <div class="contentWrap">
      <!-- <a href="javascript:void(0);" class="btnMenu">메뉴버튼</a> -->
      <div class>
        <div v-if="index == 0" class="intro">
          <div class="munjeWrap">
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
          </div>
          <el-button type="primary" class="btn" @click="next">
            다음
            <i class="el-icon-arrow-right"></i>
          </el-button>
        </div>
        <div v-else-if="index < exam.questions.length">
          <div class="munjeWrap">
            <h3>
              {{ index }}.
              <span v-html="exam.questions[index].question"></span>
            </h3>
            <!-- <div v-if="exam.questions[index].examples.length">
              <ul class="examples">
                <li v-for="(example, i) in exam.questions[index].examples" :key="i">
                  <el-radio v-model="exam.questions[index].examples.answer" :label="i + 1">
                    <span class="exampleCircle">{{ i + 1 }}</span>
                    {{ example }}
                  </el-radio>
                </li>
              </ul>
            </div>-->
            <span id="subtitle">보기</span>
            <el-radio-group v-model="exam.questions[index].answer">
              <el-radio :label="1">1번</el-radio>
              <el-radio :label="2">2번</el-radio>
              <el-radio :label="3">3번</el-radio>
              <el-radio :label="4">4번</el-radio>
              <el-radio :label="5">5번</el-radio>
            </el-radio-group>
            <div v-show="exam.questions[index].images.length">
              <ul class="preview">
                <li v-for="(image, i) in exam.questions[index].images" :key="i">
                  <el-button type="danger" plain @click="select(image, index)">
                    <img :src="image" class="questionImage" />
                  </el-button>
                </li>
              </ul>
            </div>
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
            <el-button class="btn" @click="checkSolution">정답및해설</el-button>
            </div>
          </div>
          <div v-show="exam.showSolution" class="munjeWrap">
            <h3>정답 및 해설</h3>
            <article>
              <p class="value">정답 : {{exam.questions[index].value}}</p>
              <div v-html="exam.questions[index].solution"></div>
            </article>
          </div>
          <div class="commentInputWrap">
            <h4>댓글작성</h4>
            <article>
              <p class="author">작성자 : 이원명</p>
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
                  <div class="right">
                    <a href="#">수정</a>
                    <a href="#">삭제</a>
                  </div>
                </div>
                <p class="comment">{{ comment.comment }}</p>
                <span class="replyButton" @click="createReply(i)">답글달기</span>
                <a href="#">댓글보기</a>
                <div v-if="replyMode[i] == true">
                  <!-- <p class="author">작성자 : 이원명</p> -->
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
                <ul v-show="comment.replys.length>0" class="replyWrap">
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
      </div>
      <div v-if="isFinish">
        <table class="tg">
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
        </table>

        <div class="btnWrap">
          <el-button type="primary" class="btn" @click="confirm">확인</el-button>
        </div>
      </div>
    </div>
    <div class="menu">
      <ul>
        <li>
          <a href="#">menu1</a>
        </li>
      </ul>
    </div>
    <div class="btnMenu">
      <el-button type="primary" icon="el-icon-arrow-up" circle @click="handleMenu" class="open"></el-button>
    </div>
     <!-- <div id="background" :class="{ on: displayBackground == true ? true : false }">
      <div class="modalRight">
        <a class="rightModalBtnClose" @click="closeModal">✕</a>
        <component v-bind:is="currentComponent"></component>
      </div>
    </div> -->
  </div>
</template>
<script>
import { BASE_URL } from "../config/env";
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      index: 0,
      userValue: null,
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
        results: []
      },
      content: "",
      comments: [],
      reply: "",
      moment: moment,
      replyMode: []
    };
  },
  created() {
    this.getCommentInfo();
  },
  computed: {
    // get: function() {
    //   return this.index;
    // },
    // set: function(index) {
    //   this.getCommentInfo(index);
    //   return true;
    // }
  },
  mounted() {
    this.getExamInfo();
    // this.getCommentInfo();
  },
  methods: {
    getExamInfo() {
      console.log("getExamInfo()실행!");
      axios
        .get(BASE_URL + `/exam/detail/${this.$route.params.id}`)
        .then(res => {
          console.log("res > > ", JSON.parse(res.data.exam));
          let exam = JSON.parse(res.data.exam);
          console.log("exam", exam);
          this.exam.title = exam.title;
          this.exam.examId = exam._id;
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
          for (let i = 0; i < exam.questions.length; i++) {
            let data = {
              question: exam.questions[i].question,
              value: exam.questions[i].value,
              images: exam.questions[i].images,
              solution: exam.questions[i].solution
            };
            item.questions.push(data);
          }
          this.exam.questions = item.questions;
          console.log("resultData1", this.resultData);
        });
    },
    next() {
      console.log("resultData2", this.resultData);

      if (this.index > 0) {
        if (!this.exam.questions[this.index].answer)
          return alert("답안 선택 후 다음을 눌러주세요.");
        console.log("index", this.index);
        let answer = this.exam.questions[this.index].answer;
        let value = this.exam.questions[this.index].value;
        let question = this.exam.questions[this.index].question;
        let examId = this.exam.examId;
        console.log("answer!!!");
        console.log("examId!!!~~~~", examId);
        console.log("value!!!", value);
        let result = null;
        let id = this.index;
        if (answer == value) {
          result = 1;
        } else {
          result = 0;
        }
        let userResult = {
          id: id,
          answer: answer,
          value: value,
          result: result,
          question: question,
          examId: examId
        };
        this.resultData.results.push(userResult);
        let data = this.resultData;
        let accessToken = localStorage.getItem("accessToken");
        let config = {
          headers: {
            accessToken: accessToken
          }
        };
        axios
          .post(BASE_URL + "/exam/register/result", data, config)
          .then(res => {
            console.log("next : res > >", res);
          });
      }
      console.log("this.exam.questions.length", this.exam.questions.length);
      console.log("this.exam.questions >>>>>", this.exam.questions);
      console.log("this.index", this.index);
      this.exam.showSolution = false;
      this.index++;

      if (this.index == this.exam.questions.length) {
        console.log("resultData", this.resultData);
        let result = confirm("수고하셨습니다!. 모든 문제를 푸셨습니다.");
        if (result) {
          this.isFinish = true;
        }
      }
      console.log("resultData", this.resultData);
    },
    select(answer, index) {
      this.exam.questions[index].answer = answer;
    },
    checkSolution() {
      this.exam.showSolution = !this.exam.showSolution;
    },
    confirm() {
      window.location.href = "/";
    },
    registerComment() {
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
      console.log("registerComment : _id", this.$route.params.id);
      console.log("this.index>>", this.index);
      axios
        .post(
          BASE_URL + `/comment/register/${this.$route.params.id}`,
          data,
          config
        )
        .then(res => {
          this.getCommentInfo();
          this.content = "";
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
          console.log("getCommentInfo : res >>>", res);
          if (res.data.status == 200) {
            this.comments = res.data.commentInfo;
            res.data.commentInfo.map((item, i) => {
              this.replyMode[i] = false;
            });
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
      console.log("handleReply : id >>>", id);

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
        console.log("reply : res >>>", res);
        if (res.data.status == 200) {
          this.getCommentInfo();
          this.reply = "";
        }
      });
    },
    prev() {
      this.index--;
    },
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
.questionWrap {
  width: 800px;
  padding: 40px;
  margin: 50px auto;
  text-align: left;
  background: #fff;
  box-shadow: 0 3px 3px 0 rgba(105, 105, 105, 0.1);
}
.questionWrap h2 {
  font-size: 22px;
  color: rgb(73, 73, 73);
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 100px;
  text-align: center;
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
  outline: 1px solid #e9e9e9;
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
  padding:0;
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
.menu {
  position: relative;
  margin: 50px 0 50px 30px;
  width: 30%;
  max-width: 250px;
  min-width: 130px;
  outline: 1px solid #e6e6e6;
  height: 700px;
  background: white;
  border: 1px solid rgb(255, 255, 255);
  text-align: left;
}
.menu ul {
  margin-top: 40px;
  margin-left: -24px;
}
.menu ul li {
  height: 40px;
  line-height: 40px;
  transition: all 0.5s;
}
.menu ul li:hover {
  background: #ccc;
}
.menu ul li a {
  font-weight: bold;
  color: black;
  padding-left: 20px;
  display: block;
  width: 100%;
  height: 100%;
}
.btnMenu {
  position: fixed;
  right: 30px;
  top: 65px;
  border-radius: 30px;
  color: #fff;
  font-size: 14px;
  padding: 5px;
  display: inline-block;
  z-index: 9999;
  display: none;
}
@media all and (max-width: 822px) {
  .el-radio-group{
    margin:30px 0 10px;
  }
}
@media all and (max-width: 600px) {
  .thumbnail,
  .munjeWrap {
    width: 100%;
  }
  .btn {
    width: 100%;
  }
  .container {
    padding: 20px 0;
    overflow: hidden;
  }
  .contentWrap {
    width: 90%;
    margin: 0 auto;
  }
  .menu {
    height: 100%;
    display: none;
  }
  .btnWrap{
    flex-wrap: wrap;
  }
  .btnWrap button{
    margin:10px 0;
  }
  .btnMenu {
    display: block;
  }
  .btnWrap .change{
    flex-wrap: wrap;
    width:100%;
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

.rightBtnWrap {
  text-align: right;
  margin: 10px 0 20px 0;
}
.btn {
  margin: 10px;
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
  background: #fff;
  margin: 50px 0 30px;
}

th {
  font-size: 14px;
  font-weight: bold;
  font-weight: normal;
  border-style: solid;
  overflow: hidden;
  word-break: normal;
  border-color: black;
  background: #38c70d;
}
td,
th {
  padding: 5px;
  border: 1px solid #ddd;
}
td,
th:nth-child(1) {
  width: 30px;
}
td,
th:nth-child(2) {
  width: 140px;
}
th:nth-child(3) {
  width: 50px;
}
th:nth-child(4) {
  width: 50px;
}
td,
th:nth-child(5) {
  width: 40px;
}
.btnWrap {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 50px;
}
.btnWrap .change{
  display: flex;
  flex-direction: row-reverse;
}
.commentInputWrap {
  margin-bottom: 10px;
  padding: 20px;
  background: #fff;
}
.commentlist .name{
  display: flex;
  justify-content: space-between;
}

.commentlist .name .right,
.commentlist .name .left{
  display: flex;
}
.commentlist .name .left .author:after{
    content: "|";
    margin:0 10px;
}
.commentlist .name .right a{
  margin-right:10px;
}
.commentlist .name .right a:last-child{
  color:red;
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
.textarea textarea {
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
}
</style>
