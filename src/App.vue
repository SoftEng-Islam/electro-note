<script setup lang="ts">
import Header from "./layout/Header.vue";
import Notes from "./layout/Notes.vue";
import Pages from "./layout/Pages.vue";
import OpendPage from "./layout/OpendPage.vue";
console.log(
	"[App.vue]",
	`Hello world from Electron ${process.versions.electron}!`
);
</script>

<template lang="pug">
Header
div(class="w-full h-full flex items-center overflow-hidden bg-[var(--dark400)]")
  Notes
  Pages
  OpendPage
</template>

<style></style>
