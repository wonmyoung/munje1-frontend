<template>
  <div class="pad">
    <VueSignaturePad ref="signaturePad" />
    <div>
      <v-btn @click="save">저장</v-btn>
      <v-btn @click="undo">지우기</v-btn>
    </div>
  </div>
</template>
<script>
export default {
  name: "SignaturePad",
  methods: {
    undo() {
      this.$refs.signaturePad.undoSignature();
    },
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      console.log(isEmpty);
      console.log(data);
    }
  }
};
</script>

<style scoped>
.pad {
  width: 300px;
  height: 300px;
  border: 1px dashed #ccc;
  cursor: pointer;
}
</style>

