<template>
  <Register-Image :is-edit="true" />
</template>

<script>
import RegisterImage from "@/views/library/RegisterImage";

export default {
  name: "EditLibrary",
  components: { RegisterImage }
};
</script>
