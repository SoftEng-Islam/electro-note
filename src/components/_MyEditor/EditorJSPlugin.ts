import { App, Plugin } from "vue";
import Editor from "./Editor.vue";

export const EditorJSPlugin: Plugin = {
	install(app: App) {
		app.component("Editor", Editor);
	},
};

