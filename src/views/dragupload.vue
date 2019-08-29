<template>
  <div class="container">
    <div class="contentWrap">
      <h1>이미지 등록</h1>
      <el-form ref="form" label-width="120px">
        <el-form-item label="Activity name">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="Activity zone">
          <el-select v-model="category" placeholder="please select your zone">
            <el-option label="Zone one" value="shanghai"></el-option>
            <el-option label="Zone two" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <div
          class="uploader"
          @dragenter="OnDragEnter"
          @dragleave="OnDragLeave"
          @dragover.prevent
          @drop="OnDrop"
        >
          <p>Drag and Drop upload</p>
          <div class="imageBox" v-show="images.length">
            <ul v-for="(image, index) in images" :key="image">
              <li class="preview">
                <div v-text="files[index].name"></div>
                <div v-text="index"></div>
                <img :src="image" class="image" />
              </li>
            </ul>
          </div>
          <input
            type="file"
            class="input-file"
            ref="file"
            @change="sendFile"
            multiple
          />
        </div>
      </el-form>
      <button class="primary1" @click="submit">전송</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      isDragging: false,
      count: null,
      files: [],
      images: [],
      name: null,
      category: null
    };
  },
  methods: {
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
    async OnDrop(e) {
      console.log("onDrop!!!");
      e.preventDefault();
      e.stopPropagation();
      let file = e.dataTransfer.files[0];
      console.log("file!!!", file);

      const formdata = new FormData();
      formdata.append("file", file);
      try {
        let result = await axios.post(
          "http://localhost:3001/file/upload",
          formdata
        );
        console.log("result", result);
        this.addImage(file);
        // let files = e.dataTransfer.files;
        // Array.from(files).forEach(file => this.addImage(file));
      } catch {
        alert("err!!");
      }
    },
    async sendFile() {
      const file = this.$refs.file.files[0];
      const formdata = new FormData();

      formdata.append("file", file);
      try {
        await axios.post("http://localhost:3001/file/upload", formdata);
      } catch {
        alert("err!!");
      }
      const files = this.$refs.file.files;
      Array.from(files).forEach(file => this.addImage(file));
    },
    addImage(file) {
      this.files.push(file);
      const image = new Image();
      const reader = new FileReader();
      reader.onload = e => this.images.push(e.target.result);
      reader.readAsDataURL(file);
    },
    submit() {}
  },
  computed: {}
};
</script>
<style scoped>
.container {
  width: 100%;
  height: auto;
}
.contentWrap {
  text-align: left;
  margin: 100px auto;
  width: 80%;
  padding: 1em;
  border: 1px solid #ccc;
  box-shadow: 0 5px 7px 0 rgba(105, 105, 105, 0.1);
}
.uploader {
  position: relative;
  left: calc(50% - 150px);
  width: 300px;
  height: 200px;
  outline: 2px dashed #ccc;
  margin: 10px 0 10px 0;
}
.uploader:hover {
  outline: 2px dashed blue;
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
/* .imageBox {
  width: 700px;
  min-height: 300px;
  display: flex;
  outline: 1px solid red;
} */
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
</style>
