<script setup lang="ts">
import { ref, computed } from "vue";
import { setTitle, getTitle } from "@/utils/native";

const msg = ref("Hello");
const count = ref(710);
const title = computed(() => {
  return getTitle();
});
setTitle("首页");
</script>

<template>
  <h2>{{ msg }}</h2>
  <h2>{{ count }}</h2>
  <p>{{ title }}</p>
</template>

<style scoped></style>
