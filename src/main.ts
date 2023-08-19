import { createApp } from "vue";

import "./index.css";
import "./style.css";
import App from "./App.vue";
import "./samples/node-api";
import "animate.css";
import router from "./router/index";
import { ElContainer, ElHeader, ElMain, ElFooter, ElButton, } from "element-plus";
import ElementTiptap from "element-plus";

createApp(App)
	.use(ElContainer)
	.use(ElHeader)
	.use(ElMain)
	.use(ElFooter)
	.use(ElButton)
	.use(ElementTiptap)
	.use(router)
	.mount("#app")
	.$nextTick(() => {
		postMessage({ payload: "removeLoading" }, "*");
	});
