<script lang="ts">
export default {
	name: "Header",
	data() {
		return {
			LogoLink: "Https://www.google.com",
		};
	},
	methods: {
		closeBtn(){
			console.log("ok");
			window.Electron.ipcRenderer.send('closeApp'); // Working
		}
	}
};
</script>
<template lang="pug">
header(class="border-[var(--dark200)] border-b w-full flex items-center p-2 select-none h-[var(--HeaderHeight)] bg-[var(--dark300)]" style="-webkit-app-region: drag;")
	//- Logo
	RouterLink(to="/" tag="a" class="p-1 text-white" style="-webkit-app-region: no-drag") home
	a(class="ml-4 text-xl outline-none text-[var(--favColor)]" :href="LogoLink" style="-webkit-app-region: no-drag") ElectroNote #[span(class="text-xs opacity-70") v1.0]

	//- Search
	div(class="flex items-center justify-center h-8 rounded-lg p-10 pt-0 pr-0 pb-0 m-auto bg-[var(--dark200)]" style="-webkit-app-region: no-drag" id="searchInHeader")
		button(class="outline-none")
			<svg class="h-7 fill-white" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 128 128" width="64px" height="64px"><path d="M79.2,25.5L79.2,25.5c-14.8-14.8-38.9-14.8-53.7,0c-14.8,14.8-14.8,38.9,0,53.7c7.4,7.4,17.1,11.1,26.9,11.1s19.5-3.7,26.9-11.1C94,64.4,94,40.3,79.2,25.5z M75,75c-12.5,12.5-32.8,12.5-45.3,0c-12.5-12.5-12.5-32.8,0-45.3c6.2-6.2,14.4-9.4,22.6-9.4c8.2,0,16.4,3.1,22.6,9.4C87.4,42.2,87.4,62.5,75,75z"/><path d="M104.7,113.7c2.3,0,4.6-0.9,6.4-2.6l0,0c3.5-3.5,3.5-9.2,0-12.7L98.3,85.6c-1.7-1.7-4-2.6-6.4-2.6c-1.4,0-2.7,0.3-3.9,0.9l-2.5-2.5c-1.2-1.2-3.1-1.2-4.2,0c-1.2,1.2-1.2,3.1,0,4.2l2.5,2.5c-0.6,1.2-0.9,2.5-0.9,3.9c0,2.4,0.9,4.7,2.6,6.4L98.3,111C100.1,112.8,102.4,113.7,104.7,113.7z M88.9,91.9c0-0.8,0.3-1.6,0.9-2.1c0.6-0.6,1.3-0.9,2.1-0.9s1.6,0.3,2.1,0.9l12.7,12.7c1.2,1.2,1.2,3.1,0,4.2c-1.2,1.2-3.1,1.2-4.2,0L89.8,94.1C89.2,93.5,88.9,92.7,88.9,91.9z"/><path d="M52.3,26.3C45.4,26.3,38.9,29,34,34c-4.7,4.7-7.3,10.8-7.6,17.4c-0.1,1.7,1.2,3,2.9,3.1c0,0,0.1,0,0.1,0c1.6,0,2.9-1.3,3-2.9c0.2-5.1,2.3-9.8,5.8-13.4c3.8-3.8,8.8-5.9,14.1-5.9c1.7,0,3-1.3,3-3S54,26.3,52.3,26.3z"/><circle cx="35" cy="67" r="3"/></svg>
		input(class="h-full bg-transparent outline-none placeholder:focus:opacity-40 text-white" type="text" placeholder="Type To Search...")

	//- User Section
	div(class="flex items-center justify-center" style="-webkit-app-region: no-drag")
		div(class="mx-2 h-10 w-10 rounded-lg border-2 border-solid bg-white border-[var(--favColor)]" id="avatar")
			img(src="")
		RouterLink(to="/options" tag="button" class="p-1")
			div(class="flex" id="settings")
				<svg class="h-9" enable-background="new 0 0 32 32" id="Editable-line" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><circle cx="16" cy="16" fill="none" id="XMLID_224_" r="4" stroke="var(--favColor)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/><path d="  M27.758,10.366l-1-1.732c-0.552-0.957-1.775-1.284-2.732-0.732L23.5,8.206C21.5,9.36,19,7.917,19,5.608V5c0-1.105-0.895-2-2-2h-2  c-1.105,0-2,0.895-2,2v0.608c0,2.309-2.5,3.753-4.5,2.598L7.974,7.902C7.017,7.35,5.794,7.677,5.242,8.634l-1,1.732  c-0.552,0.957-0.225,2.18,0.732,2.732L5.5,13.402c2,1.155,2,4.041,0,5.196l-0.526,0.304c-0.957,0.552-1.284,1.775-0.732,2.732  l1,1.732c0.552,0.957,1.775,1.284,2.732,0.732L8.5,23.794c2-1.155,4.5,0.289,4.5,2.598V27c0,1.105,0.895,2,2,2h2  c1.105,0,2-0.895,2-2v-0.608c0-2.309,2.5-3.753,4.5-2.598l0.526,0.304c0.957,0.552,2.18,0.225,2.732-0.732l1-1.732  c0.552-0.957,0.225-2.18-0.732-2.732L26.5,18.598c-2-1.155-2-4.041,0-5.196l0.526-0.304C27.983,12.546,28.311,11.323,27.758,10.366z " fill="none" id="XMLID_242_" stroke="var(--favColor)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/></svg>

		ul(class="ml-2 h-9 p-1 rounded-full flex items-center justify-center bg-[var(--dark200)] border-[var(--favColor)]" id="favColorsUL")
			li(data-color="var(--blue)"   class="duration-200 hover:scale-95 cursor-pointer h-6 w-6 rounded-full m-1 border-2 border-solid border-white bg-[var(--blue)]")
			li(data-color="var(--sky)"    class="duration-200 hover:scale-95 cursor-pointer h-6 w-6 rounded-full m-1 border-2 border-solid border-white bg-[var(--sky)]")
			li(data-color="var(--purple)" class="duration-200 hover:scale-95 cursor-pointer h-6 w-6 rounded-full m-1 border-2 border-solid border-white bg-[var(--purple)]")
			li(data-color="var(--green)"  class="duration-200 hover:scale-95 cursor-pointer h-6 w-6 rounded-full m-1 border-2 border-solid border-white bg-[var(--green)]")
			li(data-color="var(--yellow)" class="duration-200 hover:scale-95 scale-125 mx-2 cursor-pointer h-6 w-6 rounded-full m-1 border-2 border-solid border-white bg-[var(--yellow)]")
			li(data-color="var(--pink)"   class="duration-200 hover:scale-95 cursor-pointer h-6 w-6 rounded-full m-1 border-2 border-solid border-white bg-[var(--pink)]")
	//- Main App Fram
	div(class="h-7 ml-5 flex items-center justify-center" style="-webkit-app-region: no-drag")
		button(class="duration-150 hover:opacity-50 w-7 rounded-md h-7 mx-1 bg-yellow-400" id="minimize" )
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
		button(class="duration-150 hover:opacity-50 w-7 rounded-md h-7 mx-1 bg-green-400" id="maximize")
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
		button(class="duration-150 hover:opacity-50 w-7 rounded-md h-7 mx-1 bg-red-400" id="closeBtn" @click="closeBtn")
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" height="29" width="29"><path fill="#000" d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z"/></svg>
</template>
