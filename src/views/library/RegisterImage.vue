<template>
  <div class="container">
    <div class="navBox">
      <a href="/examDetail">Lessons</a>
      <router-link to="/library">Libraries</router-link>
    </div>
    <div class="contentWrap">
      <h1>{{ header }}</h1>
      <el-form>
        <el-form-item label="라이브러리명">
          <el-input v-model="title"></el-input>
        </el-form-item>

        <el-form-item label="카테고리">
          <select v-model="category">
            <option :value="1">과일</option>
            <option :value="2">채소</option>
            <option :value="3">식물</option>
            <option :value="4">의류</option>
            <option :value="5">문구</option>
            <option :value="6">직업</option>
            <option :value="7">동물</option>
            <option :value="8">탈것</option>
            <option :value="9">가구</option>
            <option :value="10">음식</option>
            <option :value="11">기타</option>
          </select>
        </el-form-item>
        <el-form-item label="작성자">
          <el-input v-if="isEdit == true" v-model="author"></el-input>
          <el-input v-else :value="userInfo.username"></el-input>
        </el-form-item>
        <div class="btns">
          <input
            type="radio"
            name="rd"
            id="rd1"
            v-model="status"
            value="PUBLIC"
            checked
          />
          <label for="rd1">공개</label>
          <input
            type="radio"
            name="rd"
            id="rd2"
            v-model="status"
            value="PRIVATE"
          />
          <label for="rd2">비공개</label>
        </div>
        <el-upload
          v-if="isEdit == false"
          :action="uploadURL"
          list-type="picture-card"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form>
      <div v-if="isEdit == true">
        <img :src="files[0]" class="image" />
      </div>
      <div class="btnWrap">
        <el-button type="primary" class="btn" @click="submit">{{
          header
        }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { BASE_URL } from "../../config/env";

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      header: "라이브러리 등록",
      title: null,
      value: null,
      author: null,
      dialogVisible: false,
      category: null,
      files: [],
      status: "PUBLIC",
      uploadURL: BASE_URL + "/file/upload"
    };
  },
  created() {
    this.getEditData();
  },
  computed: {
    ...mapState(["isLogin", "isLoginError", "userInfo"])
  },
  watch: {},
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleAvatarSuccess(res, file) {
      if (res.path) {
        this.files.push(res.path);
        this.dialogVisible = true;
      } else if (file) {
        this.files.push(file);
        this.dialogVisible = true;
      } else {
        return alert("파일을 다시 등록 하세요.");
      }
    },
    submit() {
      if (this.title == null) {
        return alert("제목을 입력해주세요");
      } else if (this.files.length == 0) {
        return alert("이미지를 업로드 해주세요");
      } else if (this.category == null) {
        return alert("카테고리를 선택해주세요");
      }
      let data = {
        title: this.title,
        category: this.category,
        files: this.files,
        status: this.status
      };

      let accessToken = localStorage.getItem("accessToken");
      let config = {
        headers: {
          accessToken: accessToken
        }
      };
      let address;

      if (this.isEdit == true) {
        address = BASE_URL + `/library/edit/${this.$route.params.id}`;
      } else {
        address = BASE_URL + "/library/register";
      }
      if (accessToken == undefined) {
        return alert("로그인 후 사용해주세요.");
      }
      axios.post(address, data, config).then(res => {
        if (res.status == 200) {
          alert("정상적으로 완료 되었습니다.");
          if (this.isEdit == true) {
            this.$router.push({ name: "home" });
          } else return this.$router.push({ name: "library" });
        } else {
          alert("서버 오류로 등록 할수 없습니다.");
        }
      });
    },
    getEditData() {
      if (this.isEdit == false) {
        return;
      }
      this.header = "라이브러리 수정";

      let accessToken = localStorage.getItem("accessToken");
      let config = {
        headers: {
          accessToken: accessToken
        }
      };
      axios
        .get(BASE_URL + `/library/userLibrary/${this.$route.params.id}`, config)
        .then(res => {
          // console.log("imageInfo", JSON.parse(res.data.imageInfo[0]));
          let libraryInfo = res.data.imageInfo[0];

          this.files.push(libraryInfo.file[0]);
          console.log("files", this.files);
          this.category = libraryInfo.category;
          console.log("category", this.category);

          this.title = libraryInfo.title;
          console.log("title", this.title);

          this.author = libraryInfo.author.username;
          this.status = libraryInfo.status;
          this.dialogVisible = true;
        });
    }
  }
};
</script>

<style scoped>
.navBox {
  display: flex;
  justify-content: flex-start;
  margin: 0 0 20px 5px;
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

.container {
  max-width: 1000px;
  height: auto;
}
.contentWrap {
  text-align: left;
  margin: 10px auto;
  width: calc(100% - 10px);
  padding: 1em;
  background: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 5px 7px 0 rgba(105, 105, 105, 0.1);
}
.contentWrap h1 {
  font-size: 1.3em;
  font-weight: bold;
  margin: 1em 0 1em 0;
}

select {
  width: 100%;
  border: 1px solid #dcdfe6;
  background: url("../../assets/images/home/select_arrow.png") no-repeat 100%
    50%;
  border-radius: 5px;
  padding-left: 10px;
}
.image {
  width: 50%;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.btnWrap {
  text-align: right;
}
.btn {
  margin: 20px 0 10px 0;
}
input[type="radio"] {
  display: none;
}
input:checked + label {
  background: #409eff;
  color: #fff;
}
label {
  margin: 20px 0 50px 0;
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
#radio {
  margin-right: 5px;
}
</style>
