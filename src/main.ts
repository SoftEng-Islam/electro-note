import { createPinia } from "pinia"
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";

import "./style.css";
import "./samples/node-api";
import "animate.css";

import PerfectScrollbar from "vue3-perfect-scrollbar";
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';


import { ElContainer, ElHeader, ElMain, ElFooter, ElButton } from "element-plus";
import ElementTiptap from "element-plus";


createApp(App)
	.use(createPinia())
	.use(ElContainer)
	.use(ElHeader)
	.use(ElMain)
	.use(ElFooter)
	.use(ElButton)
	.use(ElementTiptap)
	.use(router)
	.use(PerfectScrollbar)
	.mount("#app")
	.$nextTick(() => {
		postMessage({ payload: "removeLoading" }, "*");
	});
