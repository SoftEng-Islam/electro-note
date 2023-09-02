<script setup lang="ts">
import { ref } from "vue";


import TipTap from "../components/Tiptap.vue";
const content = ref(`<h2> Hi there, </h2> <p> this is a basic <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists: </p> <ul> <li> That’s a bullet list with one … </li> <li> … or two list items. </li> </ul> <p> Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block: </p> <pre><code class="language-css">body { display: none; }</code></pre> <p> I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too. </p> <blockquote> Wow, that’s amazing. Good work, boy! 👏 <br /> — Mom </blockquote>`);

// export default {
// 	components: { Tiptap, },
// 	data() { return { myOpenedTabs: [ { id: <number>0, }, ], }; },
// 	methods: { closeTab() { console.log(`Close Me Please.`); }, },
// };
</script>

<template lang="pug">
div(class="relative flex flex-col items-center w-4/6 h-[90%] mb-10 mx-5")
	//- Tabs Header
	div(class="h-16 flex items-center w-full pl-7")
		//- Tabs
		ul(class="h-full flex items-center justify-center")
			//- active
			li(class="flex items-center h-full w-auto relative p-2 px-6 pr-10 border border-[var(--dark200)] border-solid border-b-[var(--dark300)] after:content-[''] after:absolute after:w-full after:h-2 after:bg-[var(--dark300)] after:bottom-[-3px] after:left-0 rounded-t-3xl mr-4 bg-[var(--dark300)]")
				span(class="text-[var(--favColor)]")
					| {{ 'myOpenedTabs[0].id'}} Defualt Note
				button(type="button" v-on:click="'closeTab()'" class="hover:scale-90 duration-150 flex items-center justify-center bg-[var(--dark300)] h-8 w-8 rounded-full absolute right-[-6px] top-[-6px]")
					<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="scale-125"><path fill="var(--pink)" d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"/></svg>
			//- unactive
			li(class="opacity-50 flex items-center h-full w-auto relative p-2 px-6 pr-10 border border-[var(--dark200)] border-solid border-b-[var(--dark300)] after:content-[''] after:absolute after:w-full after:h-2 after:hidden after:bg-[var(--dark300)] after:bottom-[-3px] after:left-0 rounded-t-3xl mr-4 bg-[var(--dark300)]")
				span(class="text-[var(--favColor)]")
					| Defualt Note
				button(type="button" class="flex items-center justify-center bg-[var(--dark300)] h-8 w-8 rounded-full absolute right-[-6px] top-[-6px]")
					<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="scale-125"><path fill="var(--pink)" d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"/></svg>
			//- Add New Page
			//- li(class="mb-2 w-8 h-8 flex items-center justify-center")
			//- 	button(type="button" class="w-7 h-7 duration-150 hover:scale-90 bg-[var(--dark100)] rounded-full")
			//- 		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" class="w-full" ><path class="fill-[var(--favColor)]" d="M50.67,29.33h-16v-16a2.67,2.67,0,0,0-5.34,0v16h-16a2.67,2.67,0,0,0,0,5.34h16v16a2.67,2.67,0,0,0,5.34,0v-16h16a2.67,2.67,0,0,0,0-5.34Z"/></svg>

		//- Next & Prev
		//- div(class="")
		//-     button(class="") &lt;
		//-     button(class="") >

	//- Tab Content
	div(spellcheck="false" class="w-full h-full flex flex-col items-center outline-none p-4 text-[var(--white)] border border-[var(--dark200)] border-solid rounded-3xl bg-[var(--dark300)]")
		//- TipEditor
		<tip-tap v-model="content"></tip-tap>
		//- div(class="content w-full h-auto p-4 bg-gray-800 mt-8 ")
		//- 	h3(class="mb-5") OutPut Content =>:
		//- 	pre(class="pl-10")
		//- 		code(class="overflow-hidden" style="text-wrap: balance") {{ content }}
</template>
