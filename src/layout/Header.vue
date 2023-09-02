<script lang="ts">
import { ipcRenderer } from 'electron';
import { IndexType } from 'typescript';

export default {
	name: "Header",
	data() {
		return {
			LogoLink: "https://www.google.com",
			rootElement: document.querySelector(":root") as HTMLElement,
			gradin: {
				"var(--sky)": "linear-gradient(90deg, #03947c 0%, #00bba2 35%, #64ecda 100%)",
				"var(--yellow)": "linear-gradient(90deg, #ff6600 0%, #e9912d 35%, #fdc063 100%)",
				"var(--green)": "linear-gradient(90deg, #37cf4c 0%, #22dd61 35%, #49c46e 100%)",
				"var(--pink)": "linear-gradient(90deg, #e00043 0%, #d1457f 35%, #fc7373 100%)",
				"var(--purple)": "linear-gradient(90deg, #9001ce 0%, #9a44cc 35%, #c16bf3 100%)",
				"var(--blue)": "linear-gradient(90deg, #125ce6 0%, #3a69c0 35%, #7c94ff 100%)",
			},
			LiColorActive: "var(--yellow)",
		};
	},
	methods: {
		changeAppColor(color: any) {
			this.LiColorActive = color;
			this.rootElement.style.setProperty("--favColor", color);
			// Error Typescript Element implicitly has an 'any' type because expression of type 'any' can't be used to index type
			this.rootElement.style.setProperty("--bgG", this.gradin[color]);
		},
		closeBtn(){
			ipcRenderer.send("closeApp")
		},
		minimizeApp(){
			ipcRenderer.send("minimizeApp");
		},
		maximizeApp() {
			ipcRenderer.send("maximizeApp");
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

	//- App Colors Theme
	ul(class="ml-2 h-9 p-1 rounded-full flex items-center justify-center bg-[var(--dark200)] border-[var(--favColor)]" style="app-region: no-drag;")
		li( @click="changeAppColor('var(--blue)')" 		:class="LiColorActive === 'var(--blue)' ? 'scale-125 mx-2': ''" class="cursor-pointer duration-200 hover:scale-95 h-6 w-6 rounded-full m-1 border-2 border-solid border-white bg-[var(--blue)]")
		li( @click="changeAppColor('var(--sky)')" 		:class="LiColorActive === 'var(--sky)' ? 'scale-125 mx-2': ''" class="cursor-pointer duration-200 hover:scale-95 h-6 w-6 rounded-full m-1 border-2 border-solid border-white bg-[var(--sky)]")
		li( @click="changeAppColor('var(--purple)')" 	:class="LiColorActive === 'var(--purple)' ? 'scale-125 mx-2': ''" class="cursor-pointer duration-200 hover:scale-95 h-6 w-6 rounded-full m-1 border-2 border-solid border-white bg-[var(--purple)]")
		li( @click="changeAppColor('var(--green)')" 	:class="LiColorActive === 'var(--green)' ? 'scale-125 mx-2': ''" class="cursor-pointer duration-200 hover:scale-95 h-6 w-6 rounded-full m-1 border-2 border-solid border-white bg-[var(--green)]")
		li( @click="changeAppColor('var(--yellow)')" 	:class="LiColorActive === 'var(--yellow)' ? 'scale-125 mx-2': ''" class="cursor-pointer duration-200 hover:scale-95 h-6 w-6 rounded-full m-1 border-2 border-solid border-white bg-[var(--yellow)]")
		li( @click="changeAppColor('var(--pink)')" 		:class="LiColorActive === 'var(--pink)' ? 'scale-125 mx-2': ''" class="cursor-pointer duration-200 hover:scale-95 h-6 w-6 rounded-full m-1 border-2 border-solid border-white bg-[var(--pink)]")

	//- Dark / Light Button
	dev(class="toggleMode")
		input(type="checkbox" id="darkmode-toggle")
		label(for="darkmode-toggle")
			<svg version="1.1" class="sun" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 496 496" style="enable-background:new 0 0 496 496;" xml:space="preserve"><rect x="152.994" y="58.921" transform="matrix(0.3827 0.9239 -0.9239 0.3827 168.6176 -118.5145)" width="40.001" height="16" /><rect x="46.9" y="164.979" transform="matrix(0.9239 0.3827 -0.3827 0.9239 71.29 -12.4346)" width="40.001" height="16" /><rect x="46.947" y="315.048" transform="matrix(0.9239 -0.3827 0.3827 0.9239 -118.531 50.2116)" width="40.001" height="16" /><rect x="164.966" y="409.112" transform="matrix(-0.9238 -0.3828 0.3828 -0.9238 168.4872 891.7491)" width="16" height="39.999" /><rect x="303.031" y="421.036" transform="matrix(-0.3827 -0.9239 0.9239 -0.3827 50.2758 891.6655)" width="40.001" height="16"/><rect x="409.088" y="315.018" transform="matrix(-0.9239 -0.3827 0.3827 -0.9239 701.898 785.6559)" width="40.001" height="16" /><rect x="409.054" y="165.011" transform="matrix(-0.9239 0.3827 -0.3827 -0.9239 891.6585 168.6574)" width="40.001" height="16" /><rect x="315.001" y="46.895" transform="matrix(0.9238 0.3828 -0.3828 0.9238 50.212 -118.5529)" width="16" height="39.999" /> <path d="M248,88c-88.224,0-160,71.776-160,160s71.776,160,160,160s160-71.776,160-160S336.224,88,248,88z M248,392 c-79.4,0-144-64.6-144-144s64.6-144,144-144s144,64.6,144,144S327.4,392,248,392z" /> <rect x="240" width="16" height="72" /> <rect x="62.097" y="90.096" transform="matrix(0.7071 0.7071 -0.7071 0.7071 98.0963 -40.6334)" width="71.999" height="16" /><rect y="240" width="72" height="16" /><rect x="90.091" y="361.915" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 -113.9157 748.643)" width="16" height="71.999" /><rect x="240" y="424" width="16" height="72" /> <rect x="361.881" y="389.915" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 397.8562 960.6281)" width="71.999" height="16" /><rect x="424" y="240" width="72" height="16" /><rect x="389.911" y="62.091" transform="matrix(0.7071 0.7071 -0.7071 0.7071 185.9067 -252.6357)" width="16" height="71.999"/></svg>
			<svg version="1.1" class="moon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 49.739 49.739" style="enable-background:new 0 0 49.739 49.739;" xml:space="preserve"> <path d="M25.068,48.889c-9.173,0-18.017-5.06-22.396-13.804C-3.373,23.008,1.164,8.467,13.003,1.979l2.061-1.129l-0.615,2.268 c-1.479,5.459-0.899,11.25,1.633,16.306c2.75,5.493,7.476,9.587,13.305,11.526c5.831,1.939,12.065,1.492,17.559-1.258v0 c0.25-0.125,0.492-0.258,0.734-0.391l2.061-1.13l-0.585,2.252c-1.863,6.873-6.577,12.639-12.933,15.822 C32.639,48.039,28.825,48.888,25.068,48.889z M12.002,4.936c-9.413,6.428-12.756,18.837-7.54,29.253 c5.678,11.34,19.522,15.945,30.864,10.268c5.154-2.582,9.136-7.012,11.181-12.357c-5.632,2.427-11.882,2.702-17.752,0.748 c-6.337-2.108-11.473-6.557-14.463-12.528C11.899,15.541,11.11,10.16,12.002,4.936z"/></svg>

	//- User Section
	div(class="flex items-center justify-center" style="-webkit-app-region: no-drag")
		RouterLink(to="/options" tag="button" class="p-1")
			div(class="flex" id="settings")
				<svg class="h-9" enable-background="new 0 0 32 32" id="Editable-line" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><circle cx="16" cy="16" fill="none" id="XMLID_224_" r="4" stroke="var(--favColor)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/><path d="  M27.758,10.366l-1-1.732c-0.552-0.957-1.775-1.284-2.732-0.732L23.5,8.206C21.5,9.36,19,7.917,19,5.608V5c0-1.105-0.895-2-2-2h-2  c-1.105,0-2,0.895-2,2v0.608c0,2.309-2.5,3.753-4.5,2.598L7.974,7.902C7.017,7.35,5.794,7.677,5.242,8.634l-1,1.732  c-0.552,0.957-0.225,2.18,0.732,2.732L5.5,13.402c2,1.155,2,4.041,0,5.196l-0.526,0.304c-0.957,0.552-1.284,1.775-0.732,2.732  l1,1.732c0.552,0.957,1.775,1.284,2.732,0.732L8.5,23.794c2-1.155,4.5,0.289,4.5,2.598V27c0,1.105,0.895,2,2,2h2  c1.105,0,2-0.895,2-2v-0.608c0-2.309,2.5-3.753,4.5-2.598l0.526,0.304c0.957,0.552,2.18,0.225,2.732-0.732l1-1.732  c0.552-0.957,0.225-2.18-0.732-2.732L26.5,18.598c-2-1.155-2-4.041,0-5.196l0.526-0.304C27.983,12.546,28.311,11.323,27.758,10.366z " fill="none" id="XMLID_242_" stroke="var(--favColor)" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/></svg>
		div(class="mx-2 h-9 w-9 rounded-full border-2 border-solid bg-[var(--dark100)] border-[var(--favColor)]" id="avatar")
			img(src="")

	//- Main App Fram
	div(class="h-7 ml-5 flex items-center justify-center" style="-webkit-app-region: no-drag")
		button(class="duration-150 hover:opacity-50 w-7 rounded-md h-7 mx-1 bg-yellow-400" @click="minimizeApp")
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
		button(class="duration-150 hover:opacity-50 w-7 rounded-md h-7 mx-1 bg-green-400" @click="maximizeApp")
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
		button(class="duration-150 hover:opacity-50 w-7 rounded-md h-7 mx-1 bg-red-400" @click="closeBtn")
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" height="29" width="29"><path fill="#000" d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z"/></svg>
</template>
<style scoped lang="scss">
div.toggleMode{
	height: 36px;
	padding: 2px;
	margin: 0 5px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	label {
		width: 60px;
		height: 35px;
		position: relative;
		display: block;
		background: #ebebeb;
		border-radius: 25px;
		box-shadow: inset 0px 5px 15px rgba(0, 0, 0, 0.4),
			inset 0px -5px 15px rgba(255, 255, 255, 0.4);
		cursor: pointer;
		transition: 0.3s;
		&:after {
			content: "";
			width: 25px;
			height: 25px;
			position: absolute;
			top: 10px;
			left: 10px;
			background: linear-gradient(180deg, #ffcc89, #d8860b);
			border-radius: 100%;
			box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
			transition: 0.3s;
		}
		svg {
			position: absolute;
			width: 25px;
			top: 10px;
			z-index: 100;
			&.sun {
				left: 40px;
				fill: #fff;
				transition: 0.3s;
			}
			&.moon {
				left: 340px;
				fill: #7e7e7e;
				transition: 0.3s;
			}
		}
	}

	input {
		width: 0;
		height: 0;
		visibility: hidden;
		&:checked + label {
			background: #242424;
			&:after {
				left: 490px;
				transform: translateX(-100%);
				background: linear-gradient(180deg, #777, #3a3a3a);
			}
			svg {
				&.sun {
					fill: #7e7e7e;
				}
				&.moon {
					fill: #fff;
				}
			}
			+ .background {
				background: #242424;
			}
		}
		&:active:after {
			width: 260px;
		}
	}
}
</style>