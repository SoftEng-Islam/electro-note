<script lang="ts">
import { ipcRenderer } from 'electron';
import { ref } from 'vue';
export default {
	name: "LoginApp",
	setup() {

		let srcAvatar = ref<string>(""),
			fullName = ref<string>(""),
			userName = ref<string>(""),
			passWord = ref<string>("");

		let eyeOFF = ref<boolean>(true),
			eyeON = ref<boolean>(false),
			PassType = ref<string>('password');

		let
			FullNameValid = ref<boolean>(false),
			UsernameValid = ref<boolean>(false),
			PasswordValid = ref<boolean>(false),
			isAvatar = ref<boolean>(false),
			validUser = ref<boolean>(false);

		let UsersList = ref([]),
			NewUsersList = ref<[]>([]);

		// Get List OF User
		ipcRenderer.on("fetchUsers", (_event, args) => {
			UsersList.value = args
			console.log(args);
		});

		function checkForm() {
			FullNameValid.value && UsernameValid.value && PasswordValid.value === true ? validUser.value = true : validUser.value = false;
		};

		const fullNameValidator = () => {
			/^[a-zA-Z]+\s[a-zA-Z]+$/g.test(fullName.value) ? FullNameValid.value = true : FullNameValid.value = false;
			checkForm();
		};
		const userNameValidator = () => {
			/^(\w{5,})$/yg.test(userName.value) ? UsernameValid.value = true : UsernameValid.value = false;
			checkForm();
		};
		const passWordValidator = () => {
			passWord.value.length > 3 ? PasswordValid.value = true : PasswordValid.value = false;
			checkForm();
		};

		const showPass = () => {
			eyeOFF.value = !eyeOFF.value;
			eyeON.value = !eyeON.value;
			PassType.value === 'password' ? PassType.value = 'text' : PassType.value = 'password'
		}

		const createUser = () => {
			// UsersList.value.push(...NewUsersList.value);
			ipcRenderer.send("createUser", ...[fullName, userName, passWord]);
		}

		return {
			srcAvatar,
			fullName,
			userName,
			passWord,
			UsersList,
			NewUsersList,
			validUser,
			isAvatar,
			PassType,
			eyeOFF,
			eyeON,
			FullNameValid,
			UsernameValid,
			PasswordValid,
			fullNameValidator,
			userNameValidator,
			passWordValidator,
			showPass,
			createUser
		}
	},
}
</script>
<template lang="pug">
//- Overlay
div(v-show="true" class="z-40 fixed w-screen h-full left-0 top-0 backdrop-blur-sm")
//- Login Form
div(v-show="true" class="z-50 flex flex-col items-center justify-center fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-72 p-3 rounded-3xl shadow-lg" style="background: var(--bgG)")
	//- Avatar
	div(class="w-full flex flex-col items-center justify-center")
		div(v-show="isAvatar" class="w-24 h-24 overflow-hidden border-2 border-white backdrop-blur flex items-center justify-center rounded-full shadow-xl")
			img(:src="srcAvatar" class="w-full h-full")
		button(v-show="!isAvatar" type="button" class="hover:opacity-50 cursor-default relative w-24 h-24 p-2 border-2 border-white backdrop-blur flex items-center justify-center rounded-full shadow-xl")
			<svg class="w-full fill-black dark:fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM6.02332 15.4163C7.49083 17.6069 9.69511 19 12.1597 19C14.6243 19 16.8286 17.6069 18.2961 15.4163C16.6885 13.9172 14.5312 13 12.1597 13C9.78821 13 7.63095 13.9172 6.02332 15.4163ZM12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z"/></svg>
			<svg class="w-5 h-5 p-1 absolute right-1 bottom-1 fill-black bg-white rounded-full shadow-lg" viewBox="0 0 32 32" ><path d="M28,14H18V4c0-1.104-0.896-2-2-2s-2,0.896-2,2v10H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h10v10c0,1.104,0.896,2,2,2  s2-0.896,2-2V18h10c1.104,0,2-0.896,2-2S29.104,14,28,14z"/></svg>
			input(type="file" accept="image/png, image/jpeg" @change="console.log(`Input avatar`)" class="z-10 cursor-pointer w-full h-full absolute left-0 top-0 opacity-0")
		span(v-show="true" class="text-black dark:text-white") {{ fullName }}
	//- Input Fileds
	div(class="flex flex-col items-center justify-center gap-y-3 py-4")
		//- Full Name
		div(class="flex items-center gap-x-1 ")
			span(v-show="fullName !== ''" class="absolute right-7 w-3 h-3 rounded-full border border-gray-800" :class="FullNameValid  ? 'bg-green-500':'bg-red-500 animate__animated animate__heartBeat animate__faster animate__infinite infinite'")
			input(class="outline-1 focus:outline-gray-600 rounded-xl" placeholder="Full Name" v-on:input="fullNameValidator" v-model="fullName" type="text")
		//- Username
		div(class="flex items-center gap-x-1 ")
			span(v-show="userName !== ''" class="absolute right-7 w-3 h-3 rounded-full border border-gray-800" :class="UsernameValid ? 'bg-green-500':'bg-red-500 animate__animated animate__heartBeat animate__faster animate__infinite infinite'")
			input(class="outline-1 focus:outline-gray-600 rounded-xl" placeholder="Username" v-on:input="userNameValidator" v-model="userName" type="text")
		//- Password
		div(class="flex items-center gap-x-1 ")
			span(v-show="passWord !== ''" class="absolute right-7 w-3 h-3 rounded-full border border-gray-800" :class="PasswordValid ? 'bg-green-500':'bg-red-500 animate__animated animate__heartBeat animate__faster animate__infinite infinite'")
			input(class="outline-1 focus:outline-gray-600 rounded-xl" placeholder="Password" v-on:input="passWordValidator" v-model="passWord" :type="PassType")
			button(type="button" class="w-5 h-full absolute right-12 cursor-pointer" @click="showPass")
				<svg v-show="eyeON"  class="w-4 mx-auto" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12ZM12.0003 17C14.7617 17 17.0003 14.7614 17.0003 12C17.0003 9.23858 14.7617 7 12.0003 7C9.23884 7 7.00026 9.23858 7.00026 12C7.00026 14.7614 9.23884 17 12.0003 17ZM12.0003 15C10.3434 15 9.00026 13.6569 9.00026 12C9.00026 10.3431 10.3434 9 12.0003 9C13.6571 9 15.0003 10.3431 15.0003 12C15.0003 13.6569 13.6571 15 12.0003 15Z"/></svg>
				<svg v-show="eyeOFF" class="w-4 mx-auto" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62282 2.81932 7.5129 4.52047 5.93457ZM14.7577 16.1718L13.2937 14.7078C12.902 14.8952 12.4634 15.0002 12.0003 15.0002C10.3434 15.0002 9.00026 13.657 9.00026 12.0002C9.00026 11.537 9.10522 11.0984 9.29263 10.7067L7.82866 9.24277C7.30514 10.0332 7.00026 10.9811 7.00026 12.0002C7.00026 14.7616 9.23884 17.0002 12.0003 17.0002C13.0193 17.0002 13.9672 16.6953 14.7577 16.1718ZM7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87992 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925L16.947 12.7327C16.9821 12.4936 17.0003 12.249 17.0003 12.0002C17.0003 9.23873 14.7617 7.00016 12.0003 7.00016C11.7514 7.00016 11.5068 7.01833 11.2677 7.05343L7.97446 3.76015Z"/></svg>
	//- create account or Login
	div(class="flex flex-col items-center justify-center gap-y-2")
		div(class="flex items-center justify-center gap-x-2")
			//- Create Account
			button(type="button" :disabled="FullNameValid && UsernameValid && PasswordValid === false" :class="validUser ? 'opacity-100 cursor-pointer':'opacity-50 cursor-not-allowed'" class="py-2 px-3 font-bold rounded-full  text-gray-400 bg-black shadow-xl" @click="createUser") Create Account
			//- Login
			button(type="button" v-show="false" class="opacity-60 pt-1 px-3 font-bold rounded-full border-2 border-green-600 text-green-600 bg-black dark:bg-white") Login
		button(type="button" v-show="false" class="text-xs opacity-50 hover:opacity-100  text-red-500") Reset Password
</template>