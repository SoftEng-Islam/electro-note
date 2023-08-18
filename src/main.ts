import { createApp } from "vue";

import "./index.css";
import "./style.css";
import App from "./App.vue";
import "./samples/node-api";
import "animate.css";

import {
	ElContainer,
	ElHeader,
	ElMain,
	ElFooter,
	ElButton,
} from "element-plus";
import ElementTiptap from "element-plus";

createApp(App)
	.use(ElContainer)
	.use(ElHeader)
	.use(ElMain)
	.use(ElFooter)
	.use(ElButton)
	.use(ElementTiptap)

	.mount("#app")
	.$nextTick(() => {
		postMessage({ payload: "removeLoading" }, "*");
	});
