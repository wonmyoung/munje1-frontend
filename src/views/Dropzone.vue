<template>
  <div>
    <input type="file" class="input-file" ref="file" @click="sendFile" />

    <vue-dropzone
      id="upload"
      :options="config"
      @vdropzone-complete="afterComplete"
    ></vue-dropzone>
    <!-- <div class="dropzone">
      <input type="file" class="input-file" ref="file" @click="sendFile" />
    </div>-->
    <!-- <form
      action="http://localhost:3001/file/upload"
      class="dropzone"
      id="my-awesome-dropzone"
    ></form>-->
  </div>
</template>
<script>
import axios from "axios";
import vueDropzone from "vue2-dropzone";

export default {
  components: { vueDropzone },
  data() {
    return {
      config: {
        url: "http://localhost:3001/file/upload",
        maxFilesize: 5, // MB
        maxFiles: 5,
        headers: { "My-Awesome-Header": "header value" },
        // chunking: true,
        // chunkSize: 400, // Bytes
        thumbnailWidth: 100, // px
        thumbnailHeight: 100
        // addRemoveLinks: true
      },
      index: null
    };
  },
  methods: {
    afterComplete(file) {
      console.log(file);
      this.index++;
      console.log("this.index", this.index);
    },
    async sendFile() {
      console.log("sendFile");
      const file = this.$refs.file.files[0];
      const formdata = new FormData();
      formdata.append("file", file);
      try {
        await axios.post("http://localhost:3001/file/upload", formdata);
      } catch {
        alert("err!!");
      }
    }
  }
};
</script>
<style scoped>
#upload {
  width: 100px;
  min-height: 100px;
  padding: 10px;
  outline: 2px dashed #ccc;
  position: relative;
}
.input-file {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
}
/* @import "./assets/vuedropzone.css"; */
</style>
