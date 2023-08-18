<script lang="ts">
export default {
	name: "TipTable",
	props: {},
	data() {

	}
}
</script>
<template lang="pug">
button( class="" @click="editor.chain().focus().insertTable({ rows: createtable.rows, cols: createtable.cols, withHeaderRow: true }).run()")

</template>