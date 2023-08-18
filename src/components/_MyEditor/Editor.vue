<script lang="ts">
import EditorJS from "@editorjs/editorjs";
import { defineComponent, onMounted, reactive } from "vue";

export const PLUGINS = {
	header: import("@editorjs/header"),
	list: import("@editorjs/list"),
};

export default defineComponent({
	name: "vue-editor-js",
	props: {
		holder: {
			type: String,
			default: () => "vue-editor-js",
			require: true,
		},
		config: {
			type: Object,
			default: () => ({}),
			require: true,
		},
		initialized: {
			type: Function,
			defau
			lt: () => {},
		},
	},
	setup: (props, context) => {
		const state = reactive({ editor: null });

		function initEditor(props) {
			destroyEditor();
			state.editor = new EditorJS({
				holder: props.holder || "vue-editor-js",
				...props.config,
			});
			props.initialized(state.editor);
		}

		function destroyEditor() {
			if (state.editor) {
				state.editor.destroy();
				state.editor = null;
			}
		}

		onMounted((_) => initEditor(props));

		return { props, state };
	},
	methods: {
		useTools(props, config) {
			const pluginKeys = Object.keys(PLUGINS);
			const tools = { ...props.customTools };

			if (pluginKeys.every((p) => !props[p])) {
				pluginKeys.forEach(
					(key) => (tools[key] = { class: PLUGINS[key] })
				);
				Object.keys(config).forEach((key) => {
					if (tools[key] !== undefined && tools[key] !== null) {
						tools[key]["config"] = config[key];
					}
				});
				return tools;
			}

			pluginKeys.forEach((key) => {
				const prop = props[key];
				if (!prop) {
					return;
				}

				tools[key] = { class: PLUGINS[key] };

				if (typeof prop === "object") {
					const options = Object.assign({}, props[key]);
					delete options["class"];
					tools[key] = Object.assign(tools[key], options);
				}
			});

			Object.keys(config).forEach((key) => {
				if (tools[key] !== undefined && tools[key] !== null) {
					tools[key]["config"] = config[key];
				}
			});

			return tools;
		},
	},
});
</script>

<template>
	<div :id="holder" />
</template>
