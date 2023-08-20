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
div(class="flex flex-col items-center w-4/6 h-[95%] mx-5")
	//- Tabs Header
	div(class="h-16 flex items-center w-full pl-7")
		//- Tabs
		ul(class="h-full flex items-center justify-center")
			//- active
			li(class="flex items-center h-full w-auto relative p-2 px-6 pr-10 border border-[var(--dark200)] border-solid border-b-[var(--dark300)] after:content-[''] after:absolute after:w-full after:h-2 after:bg-[var(--dark300)] after:bottom-[-3px] after:left-0 rounded-t-3xl mr-4 bg-[var(--dark300)]")
				span(class="text-[var(--favColor)] font-bold")
					| {{ 'myOpenedTabs[0].id'}} Defualt Note
				button(type="button" v-on:click="'closeTab()'" class="hover:scale-90 duration-150 flex items-center justify-center bg-[var(--dark300)] h-8 w-8 rounded-full absolute right-[-6px] top-[-6px]")
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="scale-125"><path fill="var(--pink)" d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Z"/><path fill="var(--pink)" d="M128.5,74a9.67,9.67,0,0,0-14,0L100,88.5l-14-14a9.9,9.9,0,0,0-14,14l14,14-14,14a9.9,9.9,0,0,0,14,14l14-14,14,14a9.9,9.9,0,0,0,14-14l-14-14,14-14A10.77,10.77,0,0,0,128.5,74Z"/></svg>
			//- unactive
			li(class="opacity-50 flex items-center h-full w-auto relative p-2 px-6 pr-10 border border-[var(--dark200)] border-solid border-b-[var(--dark300)] after:content-[''] after:absolute after:w-full after:h-2 after:hidden after:bg-[var(--dark300)] after:bottom-[-3px] after:left-0 rounded-t-3xl mr-4 bg-[var(--dark300)]")
				span(class="text-[var(--favColor)] font-bold")
					| Defualt Note
				button(type="button" class="flex items-center justify-center bg-[var(--dark300)] h-8 w-8 rounded-full absolute right-[-6px] top-[-6px]")
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="scale-125"><path fill="var(--pink)" d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Z"/><path fill="var(--pink)" d="M128.5,74a9.67,9.67,0,0,0-14,0L100,88.5l-14-14a9.9,9.9,0,0,0-14,14l14,14-14,14a9.9,9.9,0,0,0,14,14l14-14,14,14a9.9,9.9,0,0,0,14-14l-14-14,14-14A10.77,10.77,0,0,0,128.5,74Z"/></svg>
			//- Add New Page
			li(class="w-8 h-8 flex items-center justify-center")
				button(type="button" class="w-8 h-8 duration-150 hover:scale-90 bg-[var(--dark100)] rounded-full")
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path class="fill-[var(--favColor)]" d="M50.67,29.33h-16v-16a2.67,2.67,0,0,0-5.34,0v16h-16a2.67,2.67,0,0,0,0,5.34h16v16a2.67,2.67,0,0,0,5.34,0v-16h16a2.67,2.67,0,0,0,0-5.34Z"/></svg>

		//- Next & Prev
		//- div(class="")
		//-     button(class="") &lt;
		//-     button(class="") >

	//- Tab Content
	div(spellcheck="false" class="relative w-full h-full flex flex-col overflow-x-hidden items-center outline-none p-4 text-[var(--white)] border border-[var(--dark200)] border-solid rounded-3xl bg-[var(--dark300)]")
		//- TipEditor
		<tip-tap v-model="content"></tip-tap>
		div(class="content w-full p-4 bg-gray-800 mt-8")
			h3(class="mb-5") OutPut Content =>:
			pre(class="pl-10")
				code {{ content }}
</template>
