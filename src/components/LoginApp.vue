<script lang="ts">
import { ipcRenderer } from 'electron';
import { ref, Ref } from 'vue';
	export default {
		name: "LoginApp",
		data() {
			return {
				fullName: '',
				userName: '',
				passWord: '',
				FullNameValid: false,
				UsernameValid: false,
				PasswordValid: false,
				validUser: 0
			}
		},
		setup(){
			let UsersListRF = ref([]);
			let enteredValue: Ref = ref("");

			ipcRenderer.on("fetchUsers", (_event, args)=> {UsersListRF.value = args});

			function createUser(){
				console.log("Done");
				console.log(enteredValue.value);
				UsersListRF.value.push(enteredValue.value);
				ipcRenderer.send("createUser", enteredValue.value);
			}
			return {
				UsersListRF,
				enteredValue,
				createUser
			}
		},
		methods: {
			fullNameValidator(){
				let regex = /^[a-zA-Z]+\s[a-zA-Z]+$/g ;
				console.log(this.validUser);
				if(regex.test(this.fullName) ){
					this.validUser += 1
					this.FullNameValid = true;
				} else {
					this.FullNameValid = false;
					this.validUser -= 1
				}
			},
			userNameValidator(){
				console.log(this.validUser);
				let regex = /^(\w{5,})$/yg;
				if(regex.test(this.userName)){
					this.validUser += 1
					this.UsernameValid = true;
				} else {
					this.validUser -= 1
					this.UsernameValid = false;
				}
			},
			passWordValidator(){
				console.log(this.validUser);
				if (this.passWord.length > 3) {
					this.validUser += 1
					this.PasswordValid = true
				} else {
					this.validUser -= 1
					this.PasswordValid = false;
				}
			},
		}
	}
</script>
<template lang="pug">
//- Overlay
div(v-show="true" class="z-40 fixed w-screen h-full left-0 top-0 backdrop-blur")
//- Login Form
div(v-show="true" class="z-50 flex flex-col items-center justify-center fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-72 p-3 rounded-3xl dark:bg-[var(--dark400)] border-2 border-[var(--favColor)] shadow-lg")
	//- Avatar
	div(class="w-full flex flex-col items-center justify-center")
		div(class="")
			<svg class="w-20 fill-black dark:fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM6.02332 15.4163C7.49083 17.6069 9.69511 19 12.1597 19C14.6243 19 16.8286 17.6069 18.2961 15.4163C16.6885 13.9172 14.5312 13 12.1597 13C9.78821 13 7.63095 13.9172 6.02332 15.4163ZM12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z"/></svg>
		span(v-show="true" class="text-black dark:text-white") {{ fullName }}
	//- Input Fileds
	div(class="flex flex-col items-center justify-center gap-y-3 py-4")
		//- Full Name
		div(class="flex items-center gap-x-1 ")
			span(v-show="fullName !== ''" class="absolute right-10 w-3 h-3 rounded-full border border-gray-800" :class="FullNameValid ? 'bg-green-500':'bg-red-500'")
			input(class="outline-1 focus:outline-blue-500 rounded-xl" placeholder="Full Name" v-on:input="fullNameValidator" v-model="fullName" type="text")
		//- Username
		div(class="flex items-center gap-x-1 ")
			span(v-show="userName !== ''" class="absolute right-10 w-3 h-3 rounded-full border border-gray-800" :class="UsernameValid ? 'bg-green-500':'bg-red-500'")
			input(class="outline-1 focus:outline-blue-500 rounded-xl" placeholder="Username" v-on:input="userNameValidator" v-model="userName" type="text")
		//- Password
		div(class="flex items-center gap-x-1 ")
			span(v-show="passWord !== ''" class="absolute right-10 w-3 h-3 rounded-full border border-gray-800" :class="PasswordValid ? 'bg-green-500':'bg-red-500'")
			input(class="outline-1 focus:outline-blue-500 rounded-xl" placeholder="Password" v-on:input="passWordValidator" v-model="passWord" type="password")
	//- create account or Login
	div(class="flex flex-col items-center justify-center gap-y-2")
		div(class="flex items-center justify-center gap-x-2")
			//- Create Account
			button(type="button" :disabled="validUser" :class="validUser ? 'opacity-100 cursor-pointer':'opacity-50 cursor-not-allowed'" class="pt-2 pb-1 px-3 font-bold rounded-full border-2 border-green-600 text-green-600 bg-black dark:bg-white") Create Account
			//- Login
			button(type="button" v-show="false" class="opacity-60 pt-1 px-3 font-bold rounded-full border-2 border-green-600 text-green-600 bg-black dark:bg-white") Login
			//- Create New Account
			button(type="button" v-show="false" @click="createUser()" class="text-xs hover:opacity-50 pt-1 text-blue-500") Create New Account
		button(type="button" v-show="false" class="text-xs opacity-50 hover:opacity-100  text-red-500") Reset Password
</template>