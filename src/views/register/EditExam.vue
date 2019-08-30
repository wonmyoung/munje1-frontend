<template>
  <Register :is-edit="true" />
</template>

<script>
import Register from "@/views/register/Register";

export default {
  name: "EditExam",
  components: { Register }
};
</script>
