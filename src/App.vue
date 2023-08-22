<script setup lang="ts">
import Header from "./layout/Header.vue";
console.log( "[App.vue]", `Hello world from Electron ${process.versions.electron}!` );
</script>

<template lang="pug">
Header
div(class="w-screen h-full flex items-center overflow-hidden bg-[var(--dark400)]")
	<router-view />
</template>
