<template>
  <div>
    <div class="container">
      <div class="wrap">
        <div class="buttonWrap">
          <el-button
            type="primary"
            class="primary1 location"
            @click="openSlideMenu"
            >{{ button }}</el-button
          >
        </div>
        <div
          v-bind:class="{
            contentWrap: show == false,
            contentWrap2: show == true
          }"
        >
          <h1>문제 등록</h1>
          <el-form ref="form">
            <el-form-item label="문제">
              <span>{{ index + 1 }}번</span>
              <el-input v-model="question"></el-input>
            </el-form-item>

            <div class="uploaderWrapp">
              <div class="uploaderWrap">
                <div
                  class="uploader"
                  @dragenter="OnDragEnter"
                  @dragleave="OnDragLeave"
                  @dragover.prevent
                  @drop="OnDrop"
                >
                  <p>드래그 앤드랍 혹은 Click을하여 이미지를 업로드 해주세요</p>
                  <input
                    type="file"
                    class="input-file"
                    ref="file"
                    @change="sendFile"
                    multiple
                  />
                </div>
              </div>
            </div>
            <div v-show="images.length">
              <ul class="preview">
                <li v-for="(file, i) in files" :key="i">
                  <div>
                    <input
                      id="radio"
                      type="radio"
                      :value="{ answer: file }"
                      v-model="answer"
                    />정답
                  </div>
                  <img :src="paths[i]" class="image" />
                </li>
              </ul>
            </div>
          </el-form>
          <div class="btnWrap">
            <el-button class="btn" @click="prev">이전</el-button>
            <el-button class="btn" @click="submit">다음</el-button>
            <el-button class="btn" @click="complete">완료하기</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      publicUID: null,
      examData: [],
      isDragging: false,
      index: 0,
      count: null,
      files: [],
      images: [],
      title: null,
      name: null,
      question: null,
      category: null,
      answer: null,
      value: null,
      button: "라이브러리 열기",
      show: false,
      paths: [],
      region: null
    };
  },
  mounted() {
    this.setPublicUID();
  },
  methods: {
    setPublicUID() {
      this.publicUID = this.$route.params.publicUID;
    },
    onInputChange(e) {
      console.log(e);
      const files = e.dataTransfer.files;
      Array.from(files).forEach(file => this.addImage(file));
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
      console.log("file!!!", file);

      this.addFilePath(file);
      // let files = e.dataTransfer.files;
      // Array.from(files).forEach(file => this.addImage(file));
    },
    async sendFile() {
      let result;
      const file = this.$refs.file.files[0];
      const formdata = new FormData();
      let accessToken = localStorage.getItem("accessToken");
      console.log("accessToken", accessToken);
      let config = {
        headers: {
          accessToken: accessToken
        }
      };
      formdata.append("file", file);
      formdata.append("config", config);
      try {
        result = await axios.post(
          "http://localhost:3001/file/upload",
          formdata,
          config
        );
      } catch {
        alert("err!!");
      }
      console.log("result", result.data.path);
      this.addFilePath(result.data.path);
      // const files = this.$refs.file.files;
      // Array.from(files).forEach(file => this.addImage(file));
    },
    addImage(file) {
      this.files.push(file);
      console.log("file!!!", file);

      const image = new Image();
      const reader = new FileReader();
      reader.onload = e => this.images.push(e.target.result);
      reader.readAsDataURL(file);
    },
    addFilePath(path) {
      console.log("addFilePath!!!");
      this.files.push(path);
      this.paths.push(path);
      this.images.push(path);
      console.log("images", this.images);
    },
    async submit() {
      console.log("submit!!!!");
      if (this.question == null) {
        return alert("문제를 기입해 주세요");
      } else if (this.paths.length == 0) {
        return alert("보기 이미지를 넣어 주세요");
      } else if (this.answer == null) {
        return alert("정답을 선택해 주세요");
      }

      let accessToken = localStorage.getItem("accessToken");
      console.log("accessToken", accessToken);
      let config = {
        headers: {
          accessToken: accessToken
        }
      };

      let data = {
        publicUID: this.publicUID,
        title: this.title,
        answer: this.answer,
        path: this.files,
        question: this.question,
        value: this.value,
        index: this.index,
        images: this.images
      };
      axios
        .post("http://localhost:3001/exam/register", data, config)
        .then(res => {
          if (res.status === 200) {
            console.log("status", res);
            this.examData.push(data);
            console.log("examData", this.examData);

            this.publicUID = res.data.publicUID;
            this.index++;
            this.answer = null;
            this.files = [];
            this.question = null;
            this.value = null;
            this.images = [];
            this.paths = [];
            this.files = [];
          }
        });
    },
    complete() {
      let result = confirm("문제 등록을 완료 하시겠습니까?");
      if (result) {
        this.$router.push({ name: "home" });
      }
    },
    openSlideMenu() {
      if (this.show == true) {
        this.show = false;
        this.button = "라이브러리 열기";
      } else {
        this.show = true;
        this.button = "라이브러리 닫기";
      }
    },
    closeSlideMenu() {
      document.getElementsById("libraryWrap").style.width = "0";
    },
    prev() {
      console.log("prev", this.index--);
      // if (this.index - 1 < 1) return;

      let index = this.index - 1;
      this.examData[index];
      console.log("this.examData[index]>>>>>", this.examData[index]);

      this.files = this.examData[index].path;
      this.images = this.examData[index].images;
      this.title = this.examData[index].title;
      this.value = this.examData[index].value;
      this.question = this.examData[index].question;

      console.log("files>>>>>", this.files);
      console.log("images>>>>>", this.images);
      console.log("title>>>>>", this.title);
      console.log("value>>>>>", this.value);
      console.log("question>>>>>", this.question);
    }
  },
  computed: {}
};
</script>
<style scoped>
.container {
  width: 100%;
  height: auto;
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
  width: 120px;
}
.contentWrap {
  margin: 10px auto;
  width: 90%;
  padding: 1em;
  border: 1px solid #ccc;
  box-shadow: 0 5px 7px 0 rgba(105, 105, 105, 0.1);
}

.contentWrap2 {
  text-align: left;
  margin: 10px auto;
  margin-left: 0;
  width: 36%;
  padding: 1em;
  border: 1px solid #ccc;
  box-shadow: 2px 5px 7px 2px rgba(105, 105, 105, 0.1);
}
.contentWrap h1 {
  text-align: left;
  font-size: 1.4rem;
  margin: 20px 0 20px 0;
}

.uploaderWrapp {
  width: 100%;
  height: 230px;
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
  text-align: center;
  padding-top: 50px;
  /* margin: 10px 0 10px 0; */
}
.uploader > p {
  color: #888;
  font-size: 12px;
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
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.image {
  border-radius: 7px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 250px;
  height: 180px;
  margin-bottom: 30px;
  background-repeat: no-repeat;
  background-size: cover;
}

.image:hover {
  border-radius: 7px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 250px;
  height: 180px;
  opacity: 0.8;
  margin-bottom: 30px;
  background-repeat: no-repeat;
  background-size: cover;
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

.libraryWrap {
  height: 100%;
  width: 58%;
  position: absolute;
  z-index: 10;
  /* z-index: 100; */
  top: 0;
  right: 0;
  /* background-color: #dfdfdf; */
  /* opacity: 0.9; */
  padding-top: 100px;
  overflow-x: hidden;
  transition: 0.6s;
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
  right: 10px;
  /* overflow-y: scroll; */
  z-index: 100;
}

#side-menu {
  position: absolute;
  top: 0;
  right: 10px;
}
.btnWrap {
  text-align: center;
}
.el-input {
  margin: 0;
  padding: 0;
}
.el-select {
  width: 100%;
}
</style>
