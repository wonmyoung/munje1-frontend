<template>
  <div class="container">
    <table class="tg">
      <thead>
        <tr>
          <th>번호</th>
          <th>문제</th>
          <th>정답</th>
          <th>나의답안</th>
          <th>정답여부</th>
        </tr>
      </thead>
      <tr
        v-show="userResult.length > 0"
        v-for="(results, i) in userResult"
        :key="i"
      >
        <td>{{ results.id }}번</td>
        <td>{{ results.question }}</td>
        <td>
          <img :src="results.value" class="resultImage" />
        </td>
        <td>
          <img :src="results.answer" class="resultImage" />
        </td>
        <td>{{ results.result }}</td>
      </tr>

      <tr v-show="userResult == null">
        데이터가 없습니다.
      </tr>
    </table>

    <div class="btnWrap">
      <a href="/">확인</a>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { BASE_URL } from "../config/env";
import { mapState } from "vuex";
import { eventBus } from "../main";

export default {
  data() {
    return {
      index: 0,
      userResult: []
    };
  },
  created() {
    this.getResultInfo();
    // eventBus.$on("resultdata", data => {
    //   console.log("this.userResult~");
    //   console.log("resultdata!!!", data);
    //   this.userResult = data.results;
    // });
  },
  computed: {
    ...mapState(["userInfo", "isLogin"])
  },
  methods: {
    getResultInfo() {
      let resultData = this.$store.state.userInfo.resultData;
      console.log("resultData of getResultInfo", resultData);

      // let result = resultData.filter(
      //   result => result._id == this.$route.params.id
      // );
      this.userResult = resultData[resultData.length - 1].results;
    },
    confirm() {
      this.vm.$forceUpdate();
    }
  }
};
</script>
<style scoped>
.container {
  max-width: 1000px;
  height: auto;
  padding: 50px;
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
  text-align: center;
  border: #448aff;
  border-radius: 5px;
  background: #448aff;
  width: 100px;
  height: 50px;
  margin: 50px auto;
  line-height: 50px;
}
.btnWrap a {
  color: #fff;
}
.btn {
  margin: 20px 0 10px 0;
}

.resultImage {
  width: 70%;
  height: auto;
  height: 100px;
  border: 1px solid #efefef;
  border-radius: 12px;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 90%;
  margin: 0 auto;
  text-align: center;
  background: #fff;
}

th {
  font-size: 14px;
  font-weight: normal;
  border-style: solid;
  overflow: hidden;
  word-break: normal;
  border-color: black;
  background: rgb(0, 204, 0);
}
td,
th {
  line-height: 30px;
  padding: 10px;
  border: 1px solid #efefef;
}
td,
th:nth-child(1) {
  width: 20px;
}
td,
th:nth-child(2) {
  width: 80px;
}
th:nth-child(3) {
  width: 70px;
}
th:nth-child(4) {
  width: 70px;
}
td,
th:nth-child(5) {
  width: 40px;
}
</style>
