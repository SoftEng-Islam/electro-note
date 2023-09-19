<script lang="ts">
	export default {
		name: "LoginApp",
		data() {
			return {

			}
		}
	}
</script>
<template lang="pug">
div(class="z-40 fixed w-screen h-full left-0 top-0 backdrop-blur")
div(class="z-50 flex flex-col items-center justify-center fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-72 p-3 rounded-2xl dark:bg-[var(--dark400)] shadow-lg")
	//- Avatar
	div(class="w-full flex flex-col items-center justify-center")
		div(class="")
			<svg class="w-20 fill-black dark:fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM6.02332 15.4163C7.49083 17.6069 9.69511 19 12.1597 19C14.6243 19 16.8286 17.6069 18.2961 15.4163C16.6885 13.9172 14.5312 13 12.1597 13C9.78821 13 7.63095 13.9172 6.02332 15.4163ZM12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z"/></svg>
		span(class="text-black dark:text-white") Islam Ahmed
	//- Input Fileds
	div(class="flex flex-col items-center justify-center gap-y-3 py-4")
		input(class="rounded-xl" placeholder="Username" value="" type="text")
		input(class="rounded-xl" placeholder="Password" value="" type="password")
	//- create account or Login
	div(class="flex flex-col items-center justify-center gap-y-2")
		div(class="flex items-center justify-center gap-x-2")
			button(type="button" class="opacity-60 pt-1 px-3 font-bold rounded-full border-2 border-green-600 text-green-600 bg-black dark:bg-white") Login
			button(type="button" class="text-xs hover:opacity-50 pt-1 text-blue-500") Create New Account
		button(type="button" class="text-xs opacity-50 hover:opacity-100  text-red-500") Reset Password
</template>