<script lang="ts">
import { KeyboardInputEvent } from 'electron';
import { ipcRenderer } from 'electron';
import { Ref, ref } from 'vue'


export default {
	data() {
		return {
			// notes: <string[]>[],
			// enteredValue: <string>"",
			theResult: "",
			show: "hidden",
			isDown: true,
			notesStyle: <string | number | null> '',
			notePlaceholder: 'Create Note',
		};
	},
	setup() {
		let NotesListRF = ref([]);
		let enteredValue: Ref<[]> = ref([]);

		ipcRenderer.on("fetchNotes", (_event, args)=> {NotesListRF.value = args});
		// console.log(ipcRenderer.on("fetchNotes", (_event, args)=> {NotesListRF.value = args}));

		const createNote = () => {
			console.log("Done");
			console.log(enteredValue.value);
			NotesListRF.value.push(...enteredValue.value);
			ipcRenderer.send("createNote", enteredValue.value);
		};
		return {
			NotesListRF,
			enteredValue,
			createNote
		}
	},
	methods: {
		searchResults(event: any) {
			this.theResult = event.target.value
		},
		closeOrResizeD() {
			let thatIsDown = this.isDown;
			// this.notesStyle = window.addEventListener("mousemove", (event): string => thatIsDown ? (event.clientX + "px").toString() : '');
		},
		closeOrResizeU() {
			this.isDown = false;
		},
		enterNote(name: string) {
			console.log(name);
		},
		noteContextmenu(name: string){
			console.log(name);
		}

	},
};
</script>
<template lang="pug">
div(class="duration-200 z-10 relative h-full bg-[var(--dark400)]  p-3 w-1/5 border-r-2 border-solid border-[var(--favColor)]" id="notes")
	div(class="w-full h-full overflow-hidden flex flex-col items-center")
		//- Search
		div(class="relative w-6/7 p-3 mb-2 flex items-center justify-center")
			div(class="z-10 w-full pl-4 h-9 flex items-center justify-center rounded-xl bg-[var(--dark200)]")
				input(v-on:focusin="show = ''" v-on:focusout="show = 'hidden'" v-on:input="searchResults" class="h-7 w-4/5 outline-none text-white placeholder:text-white bg-transparent" type="text" placeholder="Search...")
				button(class="outline-none")
					<svg class="h-7 fill-white" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 128 128" width="64px" height="64px"><path d="M79.2,25.5L79.2,25.5c-14.8-14.8-38.9-14.8-53.7,0c-14.8,14.8-14.8,38.9,0,53.7c7.4,7.4,17.1,11.1,26.9,11.1s19.5-3.7,26.9-11.1C94,64.4,94,40.3,79.2,25.5z M75,75c-12.5,12.5-32.8,12.5-45.3,0c-12.5-12.5-12.5-32.8,0-45.3c6.2-6.2,14.4-9.4,22.6-9.4c8.2,0,16.4,3.1,22.6,9.4C87.4,42.2,87.4,62.5,75,75z"/><path d="M104.7,113.7c2.3,0,4.6-0.9,6.4-2.6l0,0c3.5-3.5,3.5-9.2,0-12.7L98.3,85.6c-1.7-1.7-4-2.6-6.4-2.6c-1.4,0-2.7,0.3-3.9,0.9l-2.5-2.5c-1.2-1.2-3.1-1.2-4.2,0c-1.2,1.2-1.2,3.1,0,4.2l2.5,2.5c-0.6,1.2-0.9,2.5-0.9,3.9c0,2.4,0.9,4.7,2.6,6.4L98.3,111C100.1,112.8,102.4,113.7,104.7,113.7z M88.9,91.9c0-0.8,0.3-1.6,0.9-2.1c0.6-0.6,1.3-0.9,2.1-0.9s1.6,0.3,2.1,0.9l12.7,12.7c1.2,1.2,1.2,3.1,0,4.2c-1.2,1.2-3.1,1.2-4.2,0L89.8,94.1C89.2,93.5,88.9,92.7,88.9,91.9z"/><path d="M52.3,26.3C45.4,26.3,38.9,29,34,34c-4.7,4.7-7.3,10.8-7.6,17.4c-0.1,1.7,1.2,3,2.9,3.1c0,0,0.1,0,0.1,0c1.6,0,2.9-1.3,3-2.9c0.2-5.1,2.3-9.8,5.8-13.4c3.8-3.8,8.8-5.9,14.1-5.9c1.7,0,3-1.3,3-3S54,26.3,52.3,26.3z"/><circle cx="35" cy="67" r="3"/></svg>
			//- Results
			div( :class="show" class="shadow-xl pt-14 px-3 absolute left-1/2 top-0 rounded-xl w-full min-h-[250px] border border-solid border-[var(--dark200)] bg-[var(--dark300)] translate-x-[-50%]")
				hr(class="mt-3 border-[var(--dark100)]")
				ul(class="w-full  p-4 flex flex-col justify-center")
					li(class="hover:scale-95 duration-150 cursor-pointer text-[var(--white)] w-full my-1 h-9 pl-4 flex items-center rounded-xl bg-[var(--dark100)]") {{ theResult }}
		//- Tools
		div(class="w-full")
			ul(class="w-5/6 mx-auto overflow-x-hidden px-2 py-1 flex items-center justify-center rounded-full text-gray-400 bg-[var(--dark400)]")
				li(class="mx-4 hover:text-white hover:cursor-pointer") Edit
				li(class="mx-4 hover:text-white hover:cursor-pointer") Sort
					ul(class="hidden")
						li(class="") New to Old
						li(class="") Modeified
						li(class="") Old to New
						li(class="") A-Z
						li(class="") Z-A
						li(class="") Custom
				li(class="mx-4 hover:text-white hover:cursor-pointer") Select
		//- Notes
		div(:style="{'width': notesStyle}" class="w-full pt-5 p-3 border-t border-solid border-[var(--dark100)]")
			ul(class="w-full")
				li(v-for="note in NotesListRF" @click="enterNote(note)" @contextmenu="noteContextmenu(note)" class="relative p-2 pl-5 my-5 duration-150 cursor-pointer rounded-lg text-[var(--favColor)] hover:bg-[var(--dark200)] bg-[var(--dark300)]") {{ note || "New Note" }}
					button(class="absolute left-0 top-0 h-full w-3 rounded-lg cursor-pointer hover:opacity-50 bg-[var(--favColor)]")
		//- Create Note
		div(class="mt-auto overflow-hidden flex gap-2 flex-row  items-center justify-center duration-300")
			input(v-model="enteredValue" v-on:keydown.enter="createNote" class="w-[85%] rounded-xl placeholder:text-gray-400 bg-[var(--dark200)] text-white" type="text" :placeholder="notePlaceholder" @focus="notePlaceholder = ''" @focusout="notePlaceholder = 'Create Note'")
			button(v-on:click="createNote" type="button" class="w-10 h-10 m-0 p-0 text-5xl flex items-center justify-center rounded-full select-none outline-none hover:scale-95 bg-green-500")
				<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-full fill-[var(--dark300)]"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z"/></svg>
	//- Close
	button(type="button" @mousedown="closeOrResizeD" @mouseup="closeOrResizeU" class="hover:shadow-lg hover:shadow-[var(--favColor)] hover:cursor-pointer w-8 h-8 rounded-full bg-[var(--dark300)] text-[var(--favColor)] border-2 border-solid border-[var(--favColor)] absolute top-1/2 right-[-1rem] translate-y-[-50%]")
		<svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
</template>
