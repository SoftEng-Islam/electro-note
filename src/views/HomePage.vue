<script lang="ts">
import Notes from "../layout/Notes.vue";
import Pages from "../layout/Pages.vue";
import OpendPage from "../layout/OpendPage.vue";
export default {
	name: "HomePage",
	components: {
		Notes,
		Pages,
		OpendPage,
	},
	data(){
		return {

		}
	}
}
</script>
<template lang="pug">
Notes()
Pages()
OpendPage()
</template>