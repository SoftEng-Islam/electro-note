<script lang="ts">
import { ipcRenderer } from 'electron';
import { IndexType } from 'typescript';
export default {
	name: "Header",
	data() {
		return {
			darkModeChecked: true,
			LogoLink: "https://www.google.com",
			rootElement: document.querySelector(":root") as HTMLElement,
			gradin: {
				"var(--linearGradient)": "linear-gradient(-45deg, #20b173 0%, #13a868 25%, #faae28 25%, #f78723 50%, #f67e9b 50%, #f33a6c 75%, #c237c0 75%, #d43c7d 100%)",
				"var(--sky)": "linear-gradient(90deg, #03947c 0%, #00bba2 35%, #64ecda 100%)",
				"var(--yellow)": "linear-gradient(90deg, #ff6600 0%, #e9912d 35%, #fdc063 100%)",
				"var(--green)": "linear-gradient(90deg, #37cf4c 0%, #22dd61 35%, #49c46e 100%)",
				"var(--pink)": "linear-gradient(90deg, #e00043 0%, #d1457f 35%, #fc7373 100%)",
				"var(--purple)": "linear-gradient(90deg, #9001ce 0%, #9a44cc 35%, #c16bf3 100%)",
				"var(--blue)": "linear-gradient(90deg, #125ce6 0%, #3a69c0 35%, #7c94ff 100%)",
			},
			LiColorActive: "var(--linearGradient)",
		}
	},
	methods: {
		changeAppColor(color: any) {
			this.LiColorActive = color;
			this.rootElement.style.setProperty("--favColor", color);
			// Error Typescript Element implicitly has an 'any' type because expression of type 'any' can't be used to index type
			this.rootElement.style.setProperty("--bgG", this.gradin[color]);
		},
		closeBtn(){
			ipcRenderer.send("closeApp");
		},
		minimizeApp(){
			ipcRenderer.send("minimizeApp");
		},
		maximizeApp() {
			ipcRenderer.send("maximizeApp");
		},
		MT_toggleMode() {
			if(this.darkModeChecked === true) {
				// dark
				document.documentElement.classList.add('dark');
				console.log("dark");
			} else {
				// light
				document.documentElement.classList.remove('dark');
				console.log("light");
			}
		},
	}
}
</script>
<template lang="pug">
header(class="w-full p-2 h-[var(--HeaderHeight)] flex items-center select-none border-[var(--dark200)] border-b bg-white dark:bg-[var(--dark300)]" style="-webkit-app-region: drag;")
	//- RouterLink(to="/" tag="a" class="p-1 text-white" style="-webkit-app-region: no-drag") home
	//- Logo
	a(class="ml-4 text-lg outline-none text-[var(--favColor)]" :href="LogoLink" style="-webkit-app-region: no-drag") ElectroNote #[span(class="text-xs opacity-70") v1.0]

	//- Search
	div(class="h-7 p-1 pr-3 mx-auto rounded-lg flex items-center border border-gray-500 bg-[var(--dark200)]" style="-webkit-app-region: no-drag" id="searchInHeader")
		input(class="h-full text-sm bg-transparent outline-none placeholder:focus:opacity-40 placeholder:text-gray-200 text-white" type="text" placeholder="Search...")
		button(class="outline-none")
			<svg class="h-6 w-6 fill-white" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 128 128" width="64px" height="64px"><path d="M79.2,25.5L79.2,25.5c-14.8-14.8-38.9-14.8-53.7,0c-14.8,14.8-14.8,38.9,0,53.7c7.4,7.4,17.1,11.1,26.9,11.1s19.5-3.7,26.9-11.1C94,64.4,94,40.3,79.2,25.5z M75,75c-12.5,12.5-32.8,12.5-45.3,0c-12.5-12.5-12.5-32.8,0-45.3c6.2-6.2,14.4-9.4,22.6-9.4c8.2,0,16.4,3.1,22.6,9.4C87.4,42.2,87.4,62.5,75,75z"/><path d="M104.7,113.7c2.3,0,4.6-0.9,6.4-2.6l0,0c3.5-3.5,3.5-9.2,0-12.7L98.3,85.6c-1.7-1.7-4-2.6-6.4-2.6c-1.4,0-2.7,0.3-3.9,0.9l-2.5-2.5c-1.2-1.2-3.1-1.2-4.2,0c-1.2,1.2-1.2,3.1,0,4.2l2.5,2.5c-0.6,1.2-0.9,2.5-0.9,3.9c0,2.4,0.9,4.7,2.6,6.4L98.3,111C100.1,112.8,102.4,113.7,104.7,113.7z M88.9,91.9c0-0.8,0.3-1.6,0.9-2.1c0.6-0.6,1.3-0.9,2.1-0.9s1.6,0.3,2.1,0.9l12.7,12.7c1.2,1.2,1.2,3.1,0,4.2c-1.2,1.2-3.1,1.2-4.2,0L89.8,94.1C89.2,93.5,88.9,92.7,88.9,91.9z"/><path d="M52.3,26.3C45.4,26.3,38.9,29,34,34c-4.7,4.7-7.3,10.8-7.6,17.4c-0.1,1.7,1.2,3,2.9,3.1c0,0,0.1,0,0.1,0c1.6,0,2.9-1.3,3-2.9c0.2-5.1,2.3-9.8,5.8-13.4c3.8-3.8,8.8-5.9,14.1-5.9c1.7,0,3-1.3,3-3S54,26.3,52.3,26.3z"/><circle cx="35" cy="67" r="3"/></svg>

	//- App Colors Theme
	ul(class="h-7 p-1 rounded-full flex items-center justify-center bg-[var(--dark200)] border-[var(--favColor)]" style="app-region: no-drag;")
		li( @click="changeAppColor('var(--blue)')" 		:class="LiColorActive === 'var(--blue)' ? 'scale-125 mx-2': ''" 	class="cursor-pointer duration-200 hover:scale-95 h-5 w-5 rounded-full m-1 border-2 border-solid border-white bg-[var(--blue)]")
		li( @click="changeAppColor('var(--sky)')" 		:class="LiColorActive === 'var(--sky)' ? 'scale-125 mx-2': ''" 		class="cursor-pointer duration-200 hover:scale-95 h-5 w-5 rounded-full m-1 border-2 border-solid border-white bg-[var(--sky)]")
		li( @click="changeAppColor('var(--purple)')" 	:class="LiColorActive === 'var(--purple)' ? 'scale-125 mx-2': ''" 	class="cursor-pointer duration-200 hover:scale-95 h-5 w-5 rounded-full m-1 border-2 border-solid border-white bg-[var(--purple)]")
		li( @click="changeAppColor('var(--linearGradient)')" 	:class="LiColorActive === 'var(--linearGradient)' ? 'scale-125 mx-2': ''" 	class="cursor-pointer duration-200 hover:scale-95 h-5 w-5 rounded-full m-1 border-2 border-solid border-white" style="background: var(--linearGradient)")
		li( @click="changeAppColor('var(--green)')" 	:class="LiColorActive === 'var(--green)' ? 'scale-125 mx-2': ''" 	class="cursor-pointer duration-200 hover:scale-95 h-5 w-5 rounded-full m-1 border-2 border-solid border-white bg-[var(--green)]")
		li( @click="changeAppColor('var(--yellow)')" 	:class="LiColorActive === 'var(--yellow)' ? 'scale-125 mx-2': ''" 	class="cursor-pointer duration-200 hover:scale-95 h-5 w-5 rounded-full m-1 border-2 border-solid border-white bg-[var(--yellow)]")
		li( @click="changeAppColor('var(--pink)')" 		:class="LiColorActive === 'var(--pink)' ? 'scale-125 mx-2': ''" 	class="cursor-pointer duration-200 hover:scale-95 h-5 w-5 rounded-full m-1 border-2 border-solid border-white bg-[var(--pink)]")




	//- Dark / Light Button
	div(class="toggleMode h-7 w-16 mx-3 flex flex-row items-center justify-center rounded-full bg-[var(--dark100)]" style="-webkit-app-region: no-drag"  @click="darkModeChecked = !darkModeChecked; MT_toggleMode();")
		input(type="checkbox" :checked="darkModeChecked")
		label(for="darkmode-toggle")
			<svg viewBox="0 0 24 24" class="sun" xmlns="http://www.w3.org/2000/svg"><path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"/></svg>
			<svg viewBox="0 0 24 24" class="moon" xmlns="http://www.w3.org/2000/svg"><path d="M10 7C10 10.866 13.134 14 17 14C18.9584 14 20.729 13.1957 21.9995 11.8995C22 11.933 22 11.9665 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.0335 2 12.067 2 12.1005 2.00049C10.8043 3.27098 10 5.04157 10 7ZM4 12C4 16.4183 7.58172 20 12 20C15.0583 20 17.7158 18.2839 19.062 15.7621C18.3945 15.9187 17.7035 16 17 16C12.0294 16 8 11.9706 8 7C8 6.29648 8.08133 5.60547 8.2379 4.938C5.71611 6.28423 4 8.9417 4 12Z"/></svg>

	//- User Section
	div(class="h-7 flex items-center justify-center" style="-webkit-app-region: no-drag")
		RouterLink(to="/options" tag="button" class="p-1")
			div(class="flex" id="settings")
				<svg class="h-7" enable-background="new 0 0 32 32" id="Editable-line" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><circle cx="16" cy="16" fill="none" id="XMLID_224_" r="4" stroke="var(--favColor)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/><path d="  M27.758,10.366l-1-1.732c-0.552-0.957-1.775-1.284-2.732-0.732L23.5,8.206C21.5,9.36,19,7.917,19,5.608V5c0-1.105-0.895-2-2-2h-2  c-1.105,0-2,0.895-2,2v0.608c0,2.309-2.5,3.753-4.5,2.598L7.974,7.902C7.017,7.35,5.794,7.677,5.242,8.634l-1,1.732  c-0.552,0.957-0.225,2.18,0.732,2.732L5.5,13.402c2,1.155,2,4.041,0,5.196l-0.526,0.304c-0.957,0.552-1.284,1.775-0.732,2.732  l1,1.732c0.552,0.957,1.775,1.284,2.732,0.732L8.5,23.794c2-1.155,4.5,0.289,4.5,2.598V27c0,1.105,0.895,2,2,2h2  c1.105,0,2-0.895,2-2v-0.608c0-2.309,2.5-3.753,4.5-2.598l0.526,0.304c0.957,0.552,2.18,0.225,2.732-0.732l1-1.732  c0.552-0.957,0.225-2.18-0.732-2.732L26.5,18.598c-2-1.155-2-4.041,0-5.196l0.526-0.304C27.983,12.546,28.311,11.323,27.758,10.366z " fill="none" id="XMLID_242_" stroke="var(--favColor)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/></svg>
		div(class="mx-2 h-8 w-8 rounded-full border-2 border-solid bg-[var(--dark100)] border-[var(--favColor)]" id="avatar")
			img(src="")

	//- Main App Fram
	div(class="h-6 ml-5 flex items-center justify-center" style="-webkit-app-region: no-drag")
		button(class="flex items-center justify-center duration-150 hover:opacity-50 w-6 h-6 rounded-md mx-1 bg-yellow-400" @click="minimizeApp")
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
		button(class="flex items-center justify-center duration-150 hover:opacity-50 w-6 h-6 rounded-md mx-1 bg-green-400" @click="maximizeApp")
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
		button(class="flex items-center justify-center duration-150 hover:opacity-50 w-6 h-6 rounded-md mx-1 bg-red-400" @click="closeBtn")
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" height="29" width="29"><path fill="#000" d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z"/></svg>
</template>
<style scoped lang="scss">
.toggleMode {
	input {
		@apply w-0 h-0;
		visibility: hidden;
		&:checked + label {
			@apply bg-[var(--dark100)];
		}
		&:checked + label:after {
			@apply left-full;
			transform: translateX(-100%);
			background: linear-gradient(180deg,#777,#000000);
		}
		&:checked + label svg.sun {
			@apply fill-[#7e7e7e]
		}
		&:checked + label svg.moon {
			@apply fill-white;
		}
	}

	label {
		@apply w-full h-full relative flex flex-row items-center justify-center rounded-full cursor-pointer duration-300;
		&:after {
			content: "";
			@apply w-8 h-8 absolute left-0 rounded-full duration-300;
			background: linear-gradient(180deg,#ffcc89,#c3790c);
			box-shadow: 0px 5px 10px rgba(0,0,0,0.2);
		}
		& svg {
			@apply absolute w-7 z-10;
		}
		& svg.sun {
			@apply left-0 fill-white duration-300;
		}
		& svg.moon {
			@apply  right-0 fill-[#7e7e7e] duration-300;
		}
		&:active:after{
			@apply w-10;
		}
	}
}
</style>
