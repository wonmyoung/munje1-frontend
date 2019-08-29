<template>
  <div class="container">
    <div class="contentWrap">
      <h1>라이브러리 등록</h1>
      <el-form>
        <el-form-item label="이미지명">
          <el-input v-model="title"></el-input>
        </el-form-item>
        <el-form-item label="카테고리">
          <el-input v-model="category"></el-input>
        </el-form-item>
        <el-form-item label="작성자">
          <el-input :value="userInfo.username"></el-input>
        </el-form-item>
      </el-form>
      <el-upload
        :action="uploadURL"
        list-type="picture-card"
        :on-remove="handleRemove"
        :on-success="handleAvatarSuccess"
      >
        <i class="el-icon-plus"></i>
      </el-upload>

      <!-- <el-upload
        id="outline"
        action="http://127.0.0.1:3001/file/upload"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleAvatarSuccess"
        drag
        ref="file"
      >
        <i class="el-icon-plus"></i>
      </el-upload>-->
      <!-- <div v-if="dialogVisible">
        <img style="width: 100px;height:100px;" :src="dialogImageUrl" />
      </div>-->
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
#outline {
  padding: 100px;
}
.inputBox {
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 70%;
  height: 40px;
  padding: 2px 5px 2px 5px;
}
.preview {
  position: absolute;
  margin: 0;
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-repeat: no-repeat;
  background-size: cover;
}
.btnWrap {
  text-align: right;
}
.btn {
  margin: 20px 0 10px 0;
}
</style>
