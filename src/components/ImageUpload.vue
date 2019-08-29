<template>
  <div>
    <h4>Upload Image File</h4>
    <div class="input-group">
      <input
        type="text"
        class="form-control input"
        placeholder="이미지를 드래그 해주세요"
        v-model="filename"
        @dragover.prevent
        @dragenter.prevent
        @drop.prevent="onDrop"
      />
      <div class="input-group-append">
        <button @click="onClickFile">이미지 업로드</button>
        <button @click="onClickUpload">확인</button>
        <button @click="handleRemove">삭제</button>
      </div>
      <input type="file" class="file-input" accept="image/*" ref="fileInput" @change="onFileChange" />이미지 변경
      <div v-show="imageSrc" class="upload-image">
        <img :src="imageSrc" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageUpload",
  data() {
    return {
      filename: null,
      imageSrc: null
    };
  },
  watch: {
    log() {
      this.filename;
      console.log("filename", this.filename);
    }
  },
  methods: {
    onDrop(event) {
      this.inputImageFile(event.dataTransfer.files);
    },
    onClickFile() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      this.inputImageFile(event.target.files);
    },
    inputImageFile(files) {
      if (files.length) {
        let file = files[0];
        if (!/^image\//.test(file.type)) {
          alert("이미지 파일만 등록이 가능합니다");
          return false;
        }
        this.filename = file.name;
        this.preview(file);
      }
    },
    onClickUpload() {
      if (!this.filename) {
        return alert("이미지를 업로드 해주세요.");
      }
      this.preview(this.filename);
      this.filename = null;
      this.imageSrc = null;
    },
    preview(file) {
      if (typeof file === "string") {
        this.imageSrc = file;
      } else {
        let vm = this;
        let reader = new FileReader();
        reader.onload = () => {
          vm.imageSrc = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },
    handleRemove() {
      this.filename = null;
      this.imageSrc = null;
    }
  }
};
</script>

<style scoped>
.input-group {
  position: relative;
  width: 300px;
  height: 300px;
}
.input {
  width: 300px;
  height: 300px;
  border: 1px solid #ccc;
}

.file-input {
  display: none;
}
.upload-image {
  position: absolute;
  top: 10px;
  left: 20px;
  padding-top: 1rem;
  width: 200px;
  height: 200px;
}
.upload-image img {
  width: 100%;
  height: 100%;
}
</style>
