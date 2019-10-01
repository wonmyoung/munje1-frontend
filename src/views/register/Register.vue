<template>
  <div>
    <div class="container">
      <div class="wrap">
        <!-- <div class="buttonWrap">
          <el-button
            type="primary"
            class="primary1 location"
            @click="openSlideMenu"
            >{{ button }}</el-button
          >
        </div>-->
        <div
          v-if="index == 0"
          v-bind:class="{
            contentWrap: show == false,
            contentWrap2: show == true
          }"
        >
          <h1>문제 등록</h1>
          <el-form :model="form">
            <el-form-item label="문제집 이름">
              <el-input v-model="title"></el-input>
            </el-form-item>
            <el-form-item label="카테고리">
              <el-input v-model="category"></el-input>
            </el-form-item>
            <!-- <el-form-item label="카테고리">
              <select v-model="category">
                <option :value="1">택스</option>
                <option :value="2">청자반응</option>
                <option :value="3">매팅</option>
                <option :value="4">LRFFC</option>
                <option :value="5">인트라버벌</option>
                <option :value="6">읽기</option>
              </select>
            </el-form-item>-->

            <el-form-item label="문제집 요약 설명">
              <el-input v-model="description"></el-input>
            </el-form-item>
            <div class="uploaderWrapp" v-if="!images.length">
              <div class="uploaderWrap">
                <div
                  class="uploader"
                  @dragenter="OnDragEnter"
                  @dragleave="OnDragLeave"
                  @dragover.prevent
                  @drop="OnDrop"
                >
                  <p>Drag and Drop upload</p>
                  <input type="file" class="input-file" ref="file" @change="sendFile" multiple />
                </div>
              </div>
            </div>
            <div v-show="thumbnail">
              <ul class="preview">
                <li class="wrapper">
                  <img :src="thumbnail" class="image" />
                  <div class="overlay" @click="deleteFile(0)">
                    <i class="material-icons">delete</i>
                  </div>
                </li>
              </ul>
            </div>
          </el-form>
          <div class="btnWrap">
            <el-button class="btn" @click="next">다음</el-button>
          </div>
        </div>
        <div v-else>
          <div
            v-bind:class="{
              contentWrap: show == false,
              contentWrap2: show == true
            }"
          >
            <h1>문제 등록</h1>
            <el-form ref="form">
              <el-form-item>
                <span>{{ index }}번 문제</span>
                <vue-editor
                  id="editor"
                  placeholder="문제와 보기를 입력해주세요"
                  useCustomImageHandler
                  @image-added="handleImageAdded"
                  v-model="question"
                  @dragover.prevent
                  @drop="OnDrop"
                ></vue-editor>
              </el-form-item>
              <!-- <el-form-item label="문제">
                <el-input v-model="question"></el-input>
              </el-form-item>

              <div v-if="images.length">
                <ul class="preview">
                  <li class="wrapper" v-for="(image, i) in images" :key="i">
                    <img :src="image" class="questionImage" />
                    <div class="overlay" @click="deleteFile(i)">
                      <i class="material-icons">delete</i>
                    </div>
                  </li>
                </ul>
              </div>
              <div v-else class="uploaderWrapp">
                <div class="uploaderWrap">
                  <div
                    class="uploader"
                    @dragenter="OnDragEnter"
                    @dragleave="OnDragLeave"
                    @dragover.prevent
                    @drop="OnDrop"
                  >
                    <p>드래그 앤드랍 혹은 Click하여 이미지를 업로드 해주세요</p>
                    <input type="file" class="input-file" ref="file" @change="sendFile" multiple />
                  </div>
                </div>
              </div>-->
              <!-- <el-form-item label="보기">
                <el-input v-model="examples" type="textarea" id="textarea"></el-input>
              </el-form-item>-->
              <p>문제의 정답을 선택해주세요.</p>
              <div class="valueWrap">
                <input type="radio" value="1" v-model="value" />1번
                <input type="radio" value="2" v-model="value" />2번
                <input type="radio" value="3" v-model="value" />3번
                <input type="radio" value="4" v-model="value" />4번
                <input type="radio" value="5" v-model="value" /> 5번
                <!-- <el-radio-group v-model="value"> -->
                <!-- <radio :label="1">1번</radio>
                <radio :label="2">2번</radio>
                <radio :label="3">3번</radio>
                <radio :label="4">4번</radio>
                <radio :label="5">5번</radio>-->
                <!-- </el-radio-group> -->
              </div>

              <div v-if="images.length">
                <ul class="preview">
                  <li class="wrapper" v-for="(image, i) in images" :key="i">
                    <img :src="image" class="questionImage" />
                    <div class="overlay" @click="deleteFile(i)">
                      <i class="material-icons">delete</i>
                    </div>
                  </li>
                </ul>
              </div>
              <div v-else class="uploaderWrapp">
                <div class="uploaderWrap">
                  <div
                    class="uploader"
                    @dragenter="OnDragEnter"
                    @dragleave="OnDragLeave"
                    @dragover.prevent
                    @drop="OnDrop"
                  >
                    <p>드래그 앤드랍 혹은 Click하여 이미지를 업로드 해주세요</p>
                    <input type="file" class="input-file" ref="file" @change="sendFile" multiple />
                  </div>
                </div>
              </div>

              <el-form-item>
                <span>해설</span>
                <vue-editor
                  id="editor"
                  placeholder="정답의 해설을 입력해 주세요."
                  useCustomImageHandler
                  @image-added="handleImageAdded"
                  v-model="solution"
                  @dragover.prevent
                  @drop="OnDrop"
                ></vue-editor>
              </el-form-item>
            </el-form>
            <div class="btnWrap">
              <el-button class="default" @click="prev">이전</el-button>
              <el-button class="btn" @click="next">저장후 다음</el-button>
              <el-button class="btn" @click="submit">완료하기</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { BASE_URL } from "../../config/env";
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {},
      index: 0, //문제 번호 인덱스 값
      idx: 0, //questions 인덱스 값
      isDragging: false,
      questions: [
        {
          index: null,
          question: null,
          images: [],
          // htmlForEditor: "",
          solution: "",
          value: null
        }
      ],
      count: null,
      thumbnail: null,
      status: "PUBLIC",
      images: [],
      title: null,
      question: null,
      category: null,
      description: null,
      answer: null,
      value: null,
      button: "라이브러리 열기",
      show: false,
      // htmlForEditor: "",
      solution: "",
      files: []
    };
  },
  created() {
    this.getEditData();
  },
  methods: {
    // onInputChange(e) {
    //   console.log(e);
    //   const files = e.dataTransfer.files;
    //   Array.from(files).forEach(file => this.addImage(file));
    // },
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
      let accessToken = localStorage.getItem("accessToken");
      let config = {
        headers: {
          accessToken: accessToken
        }
      };
      var formData = new FormData();
      formData.append("file", file);
      axios
        .post("http://localhost:3010/file/upload", formData, config)
        .then(result => {
          console.log("result", result);
          let url = result.data.path; // Get url from response
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch(err => {
          console.log(err);
        });
    },
    OnDragEnter(e) {
      e.preventDefault();
      this.count++;
    },
    OnDragLeave(e) {
      e.preventDefault();
      this.count--;
    },
    OnDropOver() {
      console.log("OnDropOver");
    },
    async OnDrop(e) {
      console.log("onDrop!!!");
      e.preventDefault();
      e.stopPropagation();
      let imageUrl = e.dataTransfer.getData("text/html");
      let rex = /src="?([^"\s]+)"?\s*/;
      let url = rex.exec(imageUrl);
      let file = url[1];
      console.log("url!!!", url);
      console.log("file!!!", file);
      this.addFilePath(file);
      // let files = e.dataTransfer.files;
      // Array.from(files).forEach(file => this.addImage(file));
    },
    async sendFile() {
      console.log("sendFile>>>>>>>>");
      let result;
      const file = this.$refs.file.files[0];
      console.log("file>>>>>>>>", file);

      const formdata = new FormData();
      let accessToken = localStorage.getItem("accessToken");
      let config = {
        headers: {
          accessToken: accessToken
        }
      };
      formdata.append("file", file);
      formdata.append("config", config);
      try {
        result = await axios.post(BASE_URL + "/file/upload", formdata, config);
        console.log("result >>>>", result);
        if (result.status === 200) {
          if (this.index == 0) {
          }
        }
      } catch (err) {
        alert(err);
      }
      this.addFilePath(result.data.path);
    },
    // addImage(file) {
    //   console.log("addImage");
    //   this.files.push(file);
    //   const image = new Image();
    //   const reader = new FileReader();
    //   reader.onload = e => this.images.push(e.target.result);
    //   reader.readAsDataURL(file);
    // },
    addFilePath(path) {
      console.log("addFilePath");
      console.log("this.index > > >", this.index);
      console.log("path > > >", path);
      if (this.index == 0) {
        this.thumbnail = path;
        // this.paths.push(path);
        this.images.push(path);
      } else {
        console.log("this.images11111", this.images);
        // this.paths.push(path);
        this.images.push(path);
        console.log("this.images22222", this.images);
      }
    },
    deleteFile(index) {
      if (index == 0) {
        this.thumbnail = null;
        this.images.splice(index, 1);
      } else {
        console.log("index > > > >", index);
        console.log("this.images > > > >", this.images);
        // console.log("this.paths > > > >", this.paths);
        this.images.splice(index, 1);
        // this.paths.splice(index, 1);
      }
    },
    next() {
      /**
       * index가 0일땐, 이미지를 썸네일에만 저장
       * 기존것 저장, 업데이트
       * 새로운것 보여주면 됨
       * 새로운것이 저장된 내역이 있으면, 저장된 내역보여주고
       * 없으면, 빈공란 보여주면 됨
       */

      //먼저 저장 혹은 수정
      console.log("next!!!!!");
      // if (this.index == 0) {
      //   if (!this.title) {
      //     return alert("문제집 이름을 기입해 주세요");
      //   }
      //   if (!this.category) {
      //     return alert("카테고리를 선택해 주세요");
      //   }
      //   if (!this.thumbnail) {
      //     return alert("썸네일은 필수 입니다.");
      //   }
      // } else if (this.index > 0) {
      //   if (!this.question) {
      //     return alert("문제를 입력해 주세요");
      //   } else if (this.images.length == 0) {
      //     return alert("보기 이미지를 넣어 주세요");
      //   } else if (!this.value) {
      //     return alert("정답을 입력해 주세요");
      //   }
      // }
      if (!this.questions[this.index]) {
        console.log("1111");
        let data = {
          question: this.question,
          // paths: this.paths,
          images: this.images,
          value: this.value,
          // htmlForEditor: this.htmlForEditor,
          solution: this.solution
        };
        this.questions.push(data);
      } else {
        //수정
        this.questions = this.questions.map((exam, i) => {
          if (i == this.index) {
            console.log("3333");
            console.log("i", i);
            console.log("this.index", this.index);

            let data = {
              // paths: this.paths,
              images: this.images,
              value: this.value,
              question: this.question,
              // htmlForEditor: this.htmlForEditor,
              solution: this.solution
            };
            return data;
          } else {
            return exam;
          }
        });
        // this.questions.splice(0, 1);
        console.log("questions > > > >", this.questions);
      }

      /**
       * 다음 장의 내용을 보여준다.
       * 다음장의 내용이 questions객체에 없으면 null로 보여준다.
       */

      if (!this.questions[this.index + 1]) {
        this.images = [];
        // this.paths = [];
        this.question = null;
        this.value = null;
        // this.htmlForEditor = "";
        this.solution = "";
        this.index++;
        console.log("index", this.index);
      } else {
        this.index++;
        this.images = this.questions[this.index].images;
        // this.paths = this.questions[this.index].paths;
        this.question = this.questions[this.index].question;
        this.value = this.questions[this.index].value;
      }
    },
    prev() {
      console.log("PREV > > > >");
      this.index--;
      if (this.index > 0) {
        this.question = this.questions[this.index].question;
        // this.paths = this.questions[this.index].paths;
        this.images = this.questions[this.index].images;
        this.value = this.questions[this.index].value;
        // this.htmlForEditor = this.questions[this.index].htmlForEditor;
        this.solution = this.questions[this.index].solution;
      }
    },

    submit() {
      console.log("submit()");

      // confirm("문제 등록을 완료 하시겠습니까?");
      // if (this.title == null) {
      //   return alert("문제집 이름을 기입해 주세요");
      // } else if (!this.thumbnail.length) {
      //   return alert("썸네일를 넣어 주세요");
      // }
      let questionsData = this.questions.filter((question, i) => i > 0);
      console.log("questionsData >>>", questionsData);
      console.log("this.questions >>>", this.questions);
      let accessToken = localStorage.getItem("accessToken");

      let config = {
        headers: {
          accessToken: accessToken
        }
      };
      let data = {
        title: this.title,
        thumbnail: this.thumbnail,
        category: this.category,
        description: this.description,
        questions: questionsData,
        status: this.status
      };
      let address;
      if (this.isEdit == true) {
        address = BASE_URL + `/exam/update/${this.$route.params.id}`;
      } else {
        address = BASE_URL + "/exam/register";
      }
      axios.post(address, data, config).then(res => {
        console.log("status", res);

        if (res.status === 200) {
          console.log("questions", this.questions);
          console.log("status", res);
          this.index++;
          this.answer = null;
          this.questions = [];
          this.question = null;
          this.value = null;
          this.images = [];
          // this.paths = [];
          if (this.isEdit == true && this.isAdmin == true) {
            this.$router.push({
              name: "questionManage"
            });
          } else {
            this.$router.push({
              name: "home"
            });
          }
        }
      });
    },
    complete() {
      let result = confirm("문제 등록을 완료 하시겠습니까?");
      let accessToken = localStorage.getItem("accessToken");

      console.log("this.questions", this.questions);
      let config = {
        headers: {
          accessToken: accessToken
        }
      };
      if (result) {
        axios
          .post(BASE_URL + "/exam/register", this.questions, config)
          .then(res => {
            if (res.status === 200) {
              this.$router.push({ name: "home" });
            }
          });
      }
    },
    openSlideMenu() {
      if (this.show == true) {
        this.show = false;
        this.button = "라이브러리 열기";
        document.getElementById("side-menu").style.width = "0";
      } else {
        if (window.screen.availWidth < 500) {
          alert("모바일 화면에서는 등록할수 없습니다.", window.screenX);
        } else {
          this.show = true;
          this.button = "라이브러리 닫기";
          document.getElementById("side-menu").style.width = "52%";
        }
      }
    },
    closeSlideMenu() {
      document.getElementById("side-menu").style.width = "0";
    },
    getEditData() {
      if (this.isEdit == false) {
        return;
      }
      axios
        .get(BASE_URL + `/admin/detail/${this.$route.params.id}`)
        .then(res => {
          console.log("EDIT MODE : res", res);
          this.questions = res.data.exam.questions;
          this.questions.splice(0, 0, null);
          this.thumbnail = res.data.exam.thumbnail;
          this.category = res.data.exam.category;
          this.description = res.data.exam.description;
          this.title = res.data.exam.title;
          this.status = res.data.status;
          this.images = this.questions.map((question, i) => {
            return question.images;
          });
        });
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 100%;
  height: auto;
}
.btns input[type="radio"] {
  display: none;
}
input:checked + label {
  background: #409eff;
  color: #fff;
}
label {
  margin-top: 20px;
  display: inline-block;
  width: 50%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #ccc;
  background: white;
  font-weight: bold;
}
label:hover {
  background: rgb(23, 118, 214);
}
label:nth-child(2) {
  border-right: none;
}
.wrap {
  text-align: left;
}
.buttonWrap {
  text-align: left;
  margin: 0 auto;
  width: 90%;
  padding-bottom: 1em;
}
.buttonWrap .primary1 {
  width: 150px;
}
.contentWrap {
  margin: 10px auto;
  width: 60%;
  min-width: 400px;
  padding: 30px 80px 30px 80px;
  border: 1px solid #ccc;
  box-shadow: 0 5px 7px 0 rgba(105, 105, 105, 0.1);
  background: #fff;
}

.contentWrap2 {
  text-align: left;
  margin: 10px auto;
  margin-left: 0;
  width: 36%;
  padding: 1em;
  border: 1px solid #ccc;
  box-shadow: 2px 5px 7px 2px rgba(105, 105, 105, 0.1);
  transition: 0.5s;
  background: #fff;
}
.contentWrap h1 {
  text-align: left;
  font-size: 1.4rem;
  margin: 20px 0 20px 0;
  font-weight: bold;
}
select {
  width: 100%;
  border: 1px solid #dfdfdf;
  background: url("../../assets/images/home/select_arrow.png") no-repeat 100%
    50%;
  border-radius: 5px;
  padding-left: 10px;
}

.uploaderWrapp {
  width: 100%;
  height: 170px;
}

.uploaderWrap {
  position: relative;
}
.uploader {
  position: absolute;
  top: 0;
  right: 0;
  /* left: calc(50% - 150px); */
  width: 100%;
  min-height: 150px;
  outline: 2px dashed #ccc;
  /* margin: 10px 0 10px 0; */
}
.uploader:hover {
  outline: 2px dashed rgba(0, 0, 255, 0.432);
  background: #fafafa;
}
.input-file {
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  cursor: pointer;
}

.wrapper {
  position: relative;
}
.image {
  border-radius: 7px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 100%;
  /* height: 300px; */
  margin-bottom: 30px;
  background-repeat: no-repeat;
  background-size: cover;
}
.questionImage {
  border-radius: 7px;
  border: 1px solid #ccc;
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
  background-repeat: no-repeat;
  background-size: cover;
}

.image,
.questionImage:hover {
  opacity: 0.9;
}

.overlay {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  opacity: 0;
  transition: 0.5s;
  margin: 0 auto;
}
.wrapper:hover .overlay {
  opacity: 1;
  color: red;
  cursor: pointer;
}
/* .imageBox {
  width: 700px;
  min-height: 300px;
  display: flex;
  outline: 1px solid red;
} */
.preview {
  /* position: absolute; */
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  /* border: 1px solid #ccc; */
  /* border-radius: 8px;
  background-repeat: no-repeat;
  background-size: cover; */
}
.preview li {
  margin: 10px;
  padding: 0;
}
#radio {
  margin-right: 5px;
}
.valueWrap {
  width: 400px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 30px;
}

.side-nav a:hover {
  color: red;
}

.side-nav .btn-close {
  position: absolute;
  top: 0;
  /* right:22px; */
  font-size: 24px;
  /* margin-left: 50px; */
}

#side {
  margin: 0 auto;
  position: absolute;
  width: 40%;
  height: 100%;
  top: 0;
  right: 0;
  /* overflow-y: scroll; */
  z-index: 100;
}
.el-select {
  width: 100%;
}
#side-menu {
  position: absolute;
  top: 0;
  right: 10px;
}
.btnWrap {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
}
.btn {
  width: 120px;
  height: 50px;
  background: rgba(17, 207, 0, 0.795);
}
.default {
  width: 120px;
  height: 50px;
  background: fff;
  color: rgba(56, 56, 56, 0.849);
  border: 1px solid #ccc;
  border-radius: 7px;
}
.el-button {
  margin: 10px;
}
.vue-editor {
  margin-bottom: 30px;
}
#editor {
  margin-bottom: 30px;
}
</style>
