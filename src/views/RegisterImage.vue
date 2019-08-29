<template>
  <div class="container">
    <div class="contentWrap">
      <h1>라이브러리 등록</h1>
      <el-form>
        <el-form-item label="이미지명">
          <el-input v-model="title"></el-input>
        </el-form-item>
        <!-- <el-form-item label="카테고리">
          <el-input v-model="category"></el-input>
        </el-form-item>-->

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
          </select>
        </el-form-item>
        <el-form-item label="작성자">
          <el-input :value="userInfo.username"></el-input>
        </el-form-item>
        <el-upload
          :action="uploadURL"
          list-type="picture-card"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form>

      <div class="btnWrap">
        <el-button type="primary" class="btn" @click="submit"
          >라이브러리 등록</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { BASE_URL } from "../config/env";

export default {
  data() {
    return {
      title: null,
      value: null,
      dialogImageUrl: "",
      dialogVisible: false,
      name: null,
      category: null,
      images: [],
      files: [],
      uploadURL: BASE_URL + "/file/upload"
    };
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
      console.log("handlePictureCardPreview");
      console.log("res.path", res.path);
      if (res.path) {
        this.files.push(res.path);
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
        files: this.files
      };

      let accessToken = localStorage.getItem("accessToken");
      console.log("accessToken", accessToken);
      let config = {
        headers: {
          accessToken: accessToken
        }
      };
      axios.post(BASE_URL + "/library/register", data, config).then(res => {
        if (accessToken == undefined) {
          return alert("로그인 후 사용해주세요.");
        }
        console.log("res", res);
        if (res.status == 200) {
          alert("정상적으로 등록 되었습니다.");
          this.$router.push({ name: "library" });
        }
      });
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
  background: url("../assets/images/home/select_arrow.png") no-repeat 100% 50%;
  border-radius: 5px;
  padding-left: 10px;
}

.btnWrap {
  text-align: right;
}
.btn {
  margin: 20px 0 10px 0;
}
</style>
