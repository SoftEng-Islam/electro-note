<script setup lang="ts">
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import CharacterCount from "@tiptap/extension-character-count";
import toggleUnderline from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import Paragraph from '@tiptap/extension-paragraph'
import { useEditor, EditorContent, Extension } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { ref, watch } from "vue";


const content = ref(`<h2> Hi there, </h2> <p> this is a basic <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists: </p> <ul> <li> That’s a bullet list with one … </li> <li> … or two list items. </li> </ul> <p> Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block: </p> <pre><code class="language-css">body { display: none; }</code></pre> <p> I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too. </p> <blockquote> Wow, that’s amazing. Good work, boy! 👏 <br /> — Mom </blockquote>`);




const CustomParagraph = Paragraph.extend({
	draggable: true,
	addAttributes() {
		return {
			color: {
				default: 'pink',
			}
		}
	}
})


const SetColorClass = Extension.create({
	name: "setColorClass",
})
const limit: number = 2000;

const editor = useEditor({
	content: content.value,
	extensions: [
		StarterKit,
		Subscript.configure({
			HTMLAttributes: {
				class: "my-custom-class",
			},
		}),
		Superscript,
		toggleUnderline,
		Color,
		Highlight,
		TextStyle,
		TableRow,
		TableHeader,
		TableCell.extend({
			addAttributes() {
				return {
					...this.parent?.(),
					backgroundColor: {
						default: null,
						parseHTML: (element) =>
							element.getAttribute("data-background-color"),
						renderHTML: (attributes) => {
							return {
								"data-background-color":
									attributes.backgroundColor,
								style: `background-color: ${attributes.backgroundColor}`,
							};
						},
					},
				};
			},
		}),
		CharacterCount.configure({
			limit: limit,
		}),
		Table.configure({
			resizable: true,
		}),
	],
	onUpdate: () => {
		emit("update:modelValue", editor.value?.getHTML());
	},
});

watch(() => content.value, (value) => {
	if (editor.value?.getHTML() === value) {return;}
	editor.value?.commands.setContent(value, false);
});

// Create Data Table
const showTableOptions = ref(false);
const showTable = ref(false);
const tableRows = 10;
const tableCols = 10;
let hoverdRows = ref();
let hoverdCols = ref();
function createtable(row: any, col: any) {
	return editor.value?.chain().focus().insertTable({ rows: row, cols: col, withHeaderRow: true }) .run();
}

// Add Color To Text
const showColors = ref(false);
const NameOfColors = ["gray","yellow","green","cyan","blue","purple","fuchsia","pink"];
const RangeOfColors = [100,200,300,400,500,600,700,800,900,950];
let hoverdColor = ref("");
function addColor(color: string) {
	return editor.value?.chain().focus().setColor('#fff').run();
}







</script>

<template lang="pug">
div(class="relative flex flex-col items-center w-4/6 h-[90%] mb-10 mx-5")

	div(class="bg-[var(--dark400)] border border-[var(--dark200)] p-2 rounded-lg mb-5 flex flex-row flex-wrap gap-3 [&_button]:rounded-md [&>button>svg]:w-5 [&>button>svg]:fill-white " v-if="editor")
		button(@click="editor.chain().focus().toggleBold().run()" :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }")
			<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 11H12.5C13.8807 11 15 9.88071 15 8.5C15 7.11929 13.8807 6 12.5 6H8V11ZM18 15.5C18 17.9853 15.9853 20 13.5 20H6V4H12.5C14.9853 4 17 6.01472 17 8.5C17 9.70431 16.5269 10.7981 15.7564 11.6058C17.0979 12.3847 18 13.837 18 15.5ZM8 13V18H13.5C14.8807 18 16 16.8807 16 15.5C16 14.1193 14.8807 13 13.5 13H8Z"/></svg>
		button(@click="editor.chain().focus().toggleItalic().run()" :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }")
			<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15 20H7V18H9.92661L12.0425 6H9V4H17V6H14.0734L11.9575 18H15V20Z"/></svg>
		button(@click="editor.chain().focus().toggleUnderline().run()" :class="{ 'is-active': editor.isActive('underline') }")
			<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 3V12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12V3H18V12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12V3H8ZM4 20H20V22H4V20Z"/></svg>
		button(@click="editor.chain().focus().toggleSubscript().run()" :class="{ 'is-active': editor.isActive('subscript') }")
			<svg class="icon w-6 h-6 text-gray-200" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z"></path> <path d="M5.596 4L10.5 9.928 15.404 4H18l-6.202 7.497L18 18.994V19h-2.59l-4.91-5.934L5.59 19H3v-.006l6.202-7.497L3 4h2.596zM21.55 16.58a.8.8 0 1 0-1.32-.36l-1.155.33A2.001 2.001 0 0 1 21 14a2 2 0 0 1 1.373 3.454L20.744 19H23v1h-4v-1l2.55-2.42z"></path></g></svg>
		button(@click="editor.chain().focus().toggleSuperscript().run()" :class="{ 'is-active': editor.isActive('superscript') }")
			<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5.59567 5L10.5 10.9283L15.4043 5H18L11.7978 12.4971L18 19.9943V20H15.4091L10.5 14.0659L5.59092 20H3V19.9943L9.20216 12.4971L3 5H5.59567ZM21.5507 6.5803C21.7042 6.43453 21.8 6.22845 21.8 6C21.8 5.55817 21.4418 5.2 21 5.2C20.5582 5.2 20.2 5.55817 20.2 6C20.2 6.07624 20.2107 6.14999 20.2306 6.21983L19.0765 6.54958C19.0267 6.37497 19 6.1906 19 6C19 4.89543 19.8954 4 21 4C22.1046 4 23 4.89543 23 6C23 6.57273 22.7593 7.08923 22.3735 7.45384L20.7441 9H23V10H19V9L21.5507 6.5803V6.5803Z"/></svg>

		button(:class="{ 'is-active': editor.isActive('strike') }" :disabled="!editor.can().chain().focus().toggleStrike().run()" @click="editor.chain().focus().toggleStrike().run()")
			<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.1538 14C17.3846 14.5161 17.5 15.0893 17.5 15.7196C17.5 17.0625 16.9762 18.1116 15.9286 18.867C14.8809 19.6223 13.4335 20 11.5862 20C9.94674 20 8.32335 19.6185 6.71592 18.8555V16.6009C8.23538 17.4783 9.7908 17.917 11.3822 17.917C13.9333 17.917 15.2128 17.1846 15.2208 15.7196C15.2208 15.0939 15.0049 14.5598 14.5731 14.1173C14.5339 14.0772 14.4939 14.0381 14.4531 14H3V12H21V14H17.1538ZM13.076 11H7.62908C7.4566 10.8433 7.29616 10.6692 7.14776 10.4778C6.71592 9.92084 6.5 9.24559 6.5 8.45207C6.5 7.21602 6.96583 6.165 7.89749 5.299C8.82916 4.43299 10.2706 4 12.2219 4C13.6934 4 15.1009 4.32808 16.4444 4.98426V7.13591C15.2448 6.44921 13.9293 6.10587 12.4978 6.10587C10.0187 6.10587 8.77917 6.88793 8.77917 8.45207C8.77917 8.87172 8.99709 9.23796 9.43293 9.55079C9.86878 9.86362 10.4066 10.1135 11.0463 10.3004C11.6665 10.4816 12.3431 10.7148 13.076 11H13.076Z"/></svg>
		button(:class="{ 'is-active': editor.isActive('code') }" :disabled="!editor.can().chain().focus().toggleCode().run()" @click="editor.chain().focus().toggleCode().run()")
			<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.95 8.46451L18.3642 7.05029L23.3139 12L18.3642 16.9498L16.95 15.5356L20.4855 12L16.95 8.46451ZM7.05048 8.46451L3.51495 12L7.05048 15.5356L5.63627 16.9498L0.686523 12L5.63627 7.05029L7.05048 8.46451Z"/></svg>
		button( :class="{ 'is-active': editor.isActive('paragraph') }" @click="editor.chain().focus().setParagraph().run()" )
			<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 6V21H10V16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4H20V6H17V21H15V6H12ZM10 6C7.79086 6 6 7.79086 6 10C6 12.2091 7.79086 14 10 14V6Z"/></svg>
		button( :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()")
			<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13 20H11V13H4V20H2V4H4V11H11V4H13V20ZM21.0005 8V20H19.0005L19 10.204L17 10.74V8.67L19.5005 8H21.0005Z"/></svg>
		button( :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()")
			<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 4V11H11V4H13V20H11V13H4V20H2V4H4ZM18.5 8C20.5711 8 22.25 9.67893 22.25 11.75C22.25 12.6074 21.9623 13.3976 21.4781 14.0292L21.3302 14.2102L18.0343 18H22V20H15L14.9993 18.444L19.8207 12.8981C20.0881 12.5908 20.25 12.1893 20.25 11.75C20.25 10.7835 19.4665 10 18.5 10C17.5818 10 16.8288 10.7071 16.7558 11.6065L16.75 11.75H14.75C14.75 9.67893 16.4289 8 18.5 8Z"/></svg>
		button( :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()")
			<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 8L21.9984 10L19.4934 12.883C21.0823 13.3184 22.25 14.7728 22.25 16.5C22.25 18.5711 20.5711 20.25 18.5 20.25C16.674 20.25 15.1528 18.9449 14.8184 17.2166L16.7821 16.8352C16.9384 17.6413 17.6481 18.25 18.5 18.25C19.4665 18.25 20.25 17.4665 20.25 16.5C20.25 15.5335 19.4665 14.75 18.5 14.75C18.214 14.75 17.944 14.8186 17.7056 14.9403L16.3992 13.3932L19.3484 10H15V8H22ZM4 4V11H11V4H13V20H11V13H4V20H2V4H4Z"/></svg>
		button( :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()")
			<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13 20H11V13H4V20H2V4H4V11H11V4H13V20ZM22 8V16H23.5V18H22V20H20V18H14.5V16.66L19.5 8H22ZM20 11.133L17.19 16H20V11.133Z"/></svg>
		button( :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()")
			<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 8V10H17.6769L17.2126 12.6358C17.5435 12.5472 17.8912 12.5 18.25 12.5C20.4591 12.5 22.25 14.2909 22.25 16.5C22.25 18.7091 20.4591 20.5 18.25 20.5C16.4233 20.5 14.8827 19.2756 14.4039 17.6027L16.3271 17.0519C16.5667 17.8881 17.3369 18.5 18.25 18.5C19.3546 18.5 20.25 17.6046 20.25 16.5C20.25 15.3954 19.3546 14.5 18.25 14.5C17.6194 14.5 17.057 14.7918 16.6904 15.2478L14.8803 14.3439L16 8H22ZM4 4V11H11V4H13V20H11V13H4V20H2V4H4Z"/></svg>
		button( :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }" @click="editor.chain().focus().toggleHeading({ level: 6 }).run()")
			<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.097 8L18.499 12.5C20.7091 12.5 22.5 14.2909 22.5 16.5C22.5 18.7091 20.7091 20.5 18.5 20.5C16.2909 20.5 14.5 18.7091 14.5 16.5C14.5 15.7636 14.699 15.0737 15.0461 14.4811L18.788 8H21.097ZM4 4V11H11V4H13V20H11V13H4V20H2V4H4ZM18.5 14.5C17.3954 14.5 16.5 15.3954 16.5 16.5C16.5 17.6046 17.3954 18.5 18.5 18.5C19.6046 18.5 20.5 17.6046 20.5 16.5C20.5 15.3954 19.6046 14.5 18.5 14.5Z"/></svg>
		button( :class="{ 'is-active': editor.isActive('bulletList') }" @click="editor.chain().focus().toggleBulletList().run()")
			<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 4H21V6H8V4ZM4.5 6.5C3.67157 6.5 3 5.82843 3 5C3 4.17157 3.67157 3.5 4.5 3.5C5.32843 3.5 6 4.17157 6 5C6 5.82843 5.32843 6.5 4.5 6.5ZM4.5 13.5C3.67157 13.5 3 12.8284 3 12C3 11.1716 3.67157 10.5 4.5 10.5C5.32843 10.5 6 11.1716 6 12C6 12.8284 5.32843 13.5 4.5 13.5ZM4.5 20.4C3.67157 20.4 3 19.7284 3 18.9C3 18.0716 3.67157 17.4 4.5 17.4C5.32843 17.4 6 18.0716 6 18.9C6 19.7284 5.32843 20.4 4.5 20.4ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z"/></svg>
		button( :class="{ 'is-active': editor.isActive('orderedList') }" @click="editor.chain().focus().toggleOrderedList().run()")
			<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 4H21V6H8V4ZM5 3V6H6V7H3V6H4V4H3V3H5ZM3 14V11.5H5V11H3V10H6V12.5H4V13H6V14H3ZM5 19.5H3V18.5H5V18H3V17H6V21H3V20H5V19.5ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z"/></svg>
		button( :class="{ 'is-active': editor.isActive('codeBlock') }" @click="editor.chain().focus().toggleCodeBlock().run()" )
			<svg class="icon w-6 h-6 text-gray-200" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h16V5H4zm8 10h6v2h-6v-2zm-3.333-3L5.838 9.172l1.415-1.415L11.495 12l-4.242 4.243-1.415-1.415L8.667 12z"></path></g></svg>
		button( :class="{ 'is-active': editor.isActive('blockquote') }" @click="editor.chain().focus().toggleBlockquote().run()")
			<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.58341 17.3211C3.55316 16.2275 3 15 3 13.0104C3 9.51092 5.45651 6.37372 9.03059 4.82324L9.92328 6.20085C6.58804 8.00545 5.93618 10.3461 5.67564 11.8221C6.21263 11.5444 6.91558 11.4467 7.60471 11.5106C9.40908 11.6778 10.8312 13.1591 10.8312 15C10.8312 16.933 9.26416 18.5 7.33116 18.5C6.2581 18.5 5.23196 18.0096 4.58341 17.3211ZM14.5834 17.3211C13.5532 16.2275 13 15 13 13.0104C13 9.51092 15.4565 6.37372 19.0306 4.82324L19.9233 6.20085C16.588 8.00545 15.9362 10.3461 15.6756 11.8221C16.2126 11.5444 16.9156 11.4467 17.6047 11.5106C19.4091 11.6778 20.8312 13.1591 20.8312 15C20.8312 16.933 19.2642 18.5 17.3312 18.5C16.2581 18.5 15.232 18.0096 14.5834 17.3211Z"/></svg>
		button( @click="editor.chain().focus().setHorizontalRule().run()")
			<svg class="icon w-6 h-6 text-gray-200" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M2 11h2v2H2v-2zm4 0h12v2H6v-2zm14 0h2v2h-2v-2z"></path></g></svg>
		button( :disabled="!editor.can().chain().focus().undo().run()" @click="editor.chain().focus().undo().run()")
			<svg aria-hidden="true" width="16" height="16" viewBox="0 0 512 512" focusable="false" class="fa-icon"><g><path d="M212.3 224.3h-200.3c-6.6 0-12-5.4-12-12v-200.3c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12v78.1c45.8-50.8 112.3-82.6 186.2-82.1 136.9 1 246.4 111.6 246.2 248.5-0.3 136.7-111.2 247.5-248 247.5-64.1 0-122.5-24.3-166.5-64.2-5.1-4.6-5.3-12.6-0.5-17.4l34-34c4.5-4.5 11.7-4.7 16.4-0.5 31 27.5 71.9 44.1 116.6 44.1 97.3 0 176-78.7 176-176 0-97.3-78.7-176-176-176-58.5 0-110.3 28.5-142.3 72.3h98.3c6.6 0 12 5.4 12 12v48c0 6.6-5.4 12-12 12z"></path></g></svg>
		button( :disabled="!editor.can().chain().focus().redo().run()" @click="editor.chain().focus().redo().run()")
			<svg aria-hidden="true" width="16" height="16" viewBox="0 0 512 512" focusable="false" class="fa-icon"><g><path d="M500.3 0c6.6 0 12 5.4 12 12v200.3c0 6.6-5.4 12-12 12h-200.3c-6.6 0-12-5.4-12-12v-47.4 0c0-6.6 5.4-12 12-12 0.2 0 0.4 0 0.6 0l101.5 4.9c-28.9-43-94.3-77.8-146.1-77.8-97.2 0-176 78.8-176 176 0 97.2 78.8 176 176 176 36.7 0 88.7-19.7 116.3-43.9 1.9-1.6 5.4-3 7.9-3 2.7 0 6.5 1.6 8.5 3.5l34 34c1.9 1.9 3.5 5.7 3.5 8.5 0 3-1.8 7-4 8.9-39 35.3-113.3 63.9-165.8 63.9h-0.3c-136.9 0-247.9-110.9-248-247.8-0.1-136.7 111.3-248.2 248-248.2h0.3c63.2 0 147.7 39.1 188.6 87.3l-4-82.8c0-0.2 0-0.4 0-0.6 0-6.6 5.4-12 12-12h0 47.4z"></path></g></svg>



		//- Color
		input(
			type="color"
			@input="editor.chain().focus().setColor(event.target.value).run()"
			@value="editor.getAttributes('textStyle').color"
			@data-testid="setColor"
		)
		button(@mouseenter.prevent="showColors = true" @mouseleave.prevent="showColors = false" :class="{ 'is-active': editor.isActive('textStyle', { color: '#958DF1' })}" )
			<svg aria-hidden="true" width="11" height="16" viewBox="0 0 352 512" focusable="false" class="fa-icon"><g><path d="M205.2 22.1c47 158.5 146.8 200.1 146.8 311.8 0 98.4-78.7 178.1-176 178.1s-176-79.7-176-178.1c0-111.2 100-154.1 146.8-311.8 9-30.1 50.5-28.8 58.4 0zM176 448c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.1 0-80-35.9-80-80 0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.8 50.3 112 112 112z"></path></g></svg>
			table(v-show="showColors" class="absolute z-20 right-0 top-5 w-[240px] bg-[var(--dark100)] rounded-xl shadow-lg shadow-[var(--dark300)]")
					tbody(class="w-full flex flex-col items-center justify-center pb-3")
						thead(class="w-full flex justify-center items-center gap-x-2 py-2")
							th(class="darkth text-sm text-center py-1 px-2 rounded-md duration-200 bg-[var(--dark400)]" :class="`text-${hoverdColor}`") {{ hoverdColor || 'Text' }}
							th(class="lighth text-sm text-center py-1 px-2 rounded-md duration-200 bg-white" :class="`text-${hoverdColor}`") {{ hoverdColor || 'Text' }}
						tr(
							v-for="rowColor in NameOfColors"
							:data-row="rowColor"
							class="bg-[var(--dark400)]"
						)
							td(
								class="w-5 h-5 overflow-hidden border-4 border-transparent rounded-lg duration-200 ease-in-out bg-[var(--favColor)] hover:scale-125"
								v-for="color in RangeOfColors"
								:class="`bg-${rowColor}-${color}`"
								@mouseover="hoverdColor = `${rowColor}-${color}`"
								@click="addColor(`text-${rowColor}-${color}`)"
							)

		//- Highlight
		button(class="bg-gray-500" :class="{ 'is-active': editor.isActive('highlight', { color: '#ffc078' })}" @click="editor.chain().focus().toggleHighlight({ color: '#ffc078' }).run()")
			<svg aria-hidden="true" width="16" height="15.058823529411764" viewBox="0 0 544 512" focusable="false" class="fa-icon"><g><path d="M0 480l68.3-70.5 67 67-35.5 35.5zM124.6 240l41.5-35.4 173.3 173.3-35.5 41.6c-9.5 10.8-24.4 15-38.2 10.8l-42.7-13.1-50.9 50.9-96.2-96.2 50.9-50.9-13-42.8c-0.9-2.9-1.6-7.7-1.6-10.7 0-9.1 5.5-21.4 12.4-27.4zM527.9 79.3c20.5 20.5 21.5 53.4 2.3 75.1l-169.9 199.1-169.8-169.8 199.1-170c21.7-19.2 54.6-18.1 75.1 2.4z"></path></g></svg>
		button(@click="editor.chain().focus().unsetAllMarks().clearNodes().run()")
			<svg aria-hidden="true" width="16" height="12.8" viewBox="0 0 640 512" focusable="false" class="fa-icon"><g><path d="M336 416c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16h-128c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16h32.5l26.5-79.6 67.1 51.8-9.3 27.8h11.2zM633.8 458.1c3.4 2.7 6.2 8.3 6.2 12.6 0 3-1.5 7.4-3.4 9.8l-19.6 25.3c-2.7 3.4-8.3 6.2-12.6 6.2-3 0-7.4-1.5-9.8-3.4l-588.4-454.7c-3.4-2.7-6.2-8.3-6.2-12.6 0-3 1.5-7.4 3.4-9.8l19.6-25.3c2.7-3.4 8.3-6.2 12.6-6.2 3 0 7.4 1.5 9.8 3.4l114.5 88.5v-43.9c0-8.8 7.2-16 16-16h416c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-32h-117.8l-49.2 147.6zM309.9 207.8l31.9-95.8h-117.8v29.4z"></path></g></svg>
		button(@click="editor.chain().focus().setHardBreak().run()")
			<svg class="icon w-6 h-6 text-gray-200" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z"></path> <path d="M15 18h1.5a2.5 2.5 0 1 0 0-5H3v-2h13.5a4.5 4.5 0 1 1 0 9H15v2l-4-3 4-3v2zM3 4h18v2H3V4zm6 14v2H3v-2h6z"></path> </g> </svg>


		//- Tables
		div(class="flex")
			button( @mouseenter.prevent="showTable = true" @mouseleave.prevent="showTable = false" type="button" class="relative flex" )
				<svg class="icon w-6 h-6 fill-white" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path fill="none" d="M0 0h24v24H0z"></path> <path d="M4 8h16V5H4v3zm10 11v-9h-4v9h4zm2 0h4v-9h-4v9zm-8 0v-9H4v9h4zM3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"></path></g></svg>
				table(v-show="showTable" class="absolute z-20 right-0 top-5 w-[240px] bg-[var(--dark100)] rounded-xl shadow-lg shadow-[var(--dark300)]")
					tbody(class="w-full flex flex-col items-center justify-center pb-3")
						thead(class="w-full flex justify-center items-center py-2")
							th(class="text-center bg-[var(--favColor)] px-2 rounded-md text-black duration-200") {{ hoverdRows || 0 }} x {{ hoverdCols || 0 }}
						tr(
							v-for="row in tableRows"
							data-row="row"
							class="bg-[var(--dark400)]"
						)
							td(
								class="w-5 h-5 overflow-hidden border-4 border-transparent rounded-lg duration-200 ease-in-out bg-[var(--favColor)]"
								v-for="col in tableCols"
								:class="col <= hoverdCols && row <= hoverdRows ? 'opacity-100' : 'opacity-25'"
								:data-cell-col="col"
								:data-cell-row="row"
								@mouseover="hoverdRows = row; hoverdCols = col;"
								@click="createtable(row,col)"
							)

			button(type="button" class="relative" @mouseenter.prevent.self="showTableOptions = true" @mouseleave.prevent.self="showTableOptions = false")
				<svg  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon w-6 h-6 fill-[var(--favColor)]"><path d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z"/></svg>
				div( v-show="showTableOptions" class="p-4 bg-[var(--dark200)] rounded-xl overflow-hidden absolute z-20 right-0 top-5 w-[250px] flex flex-col items-center justify-center [&_button]:mx-2")
					button( class="text-start w-full hover:opacity-60" type="button" :disabled="!editor.can().addColumnBefore()" @click="editor.chain().focus().addColumnBefore().run()") addColumnBefore
					button( class="text-start w-full hover:opacity-60" type="button" :disabled="!editor.can().addColumnAfter()" @click="editor.chain().focus().addColumnAfter().run()") addColumnAfter
					button( class="text-start w-full hover:opacity-60" type="button" :disabled="!editor.can().deleteColumn()" @click="editor.chain().focus().deleteColumn().run()") deleteColumn
					button( class="text-start w-full hover:opacity-60" type="button" :disabled="!editor.can().addRowBefore()" @click="editor.chain().focus().addRowBefore().run()") addRowBefore
					button( class="text-start w-full hover:opacity-60" type="button" :disabled="!editor.can().addRowAfter()" @click="editor.chain().focus().addRowAfter().run()") addRowAfter
					button( class="text-start w-full hover:opacity-60" type="button" :disabled="!editor.can().deleteRow()" @click="editor.chain().focus().deleteRow().run()") deleteRow
					button( class="text-start w-full hover:opacity-60" type="button" :disabled="!editor.can().deleteTable()" @click="editor.chain().focus().deleteTable().run()") deleteTable
					button( class="text-start w-full hover:opacity-60" type="button" :disabled="!editor.can().mergeCells()" @click="editor.chain().focus().mergeCells().run()") mergeCells
					button( class="text-start w-full hover:opacity-60" type="button" :disabled="!editor.can().splitCell()" @click="editor.chain().focus().splitCell().run()") splitCell
					button( class="text-start w-full hover:opacity-60" type="button" :disabled="!editor.can().toggleHeaderColumn()" @click="editor.chain().focus().toggleHeaderColumn().run()") toggleHeaderColumn
					button( class="text-start w-full hover:opacity-60" type="button" :disabled="!editor.can().toggleHeaderRow()" @click="editor.chain().focus().toggleHeaderRow().run()") toggleHeaderRow
					button( class="text-start w-full hover:opacity-60" type="button" :disabled="!editor.can().toggleHeaderCell()" @click="editor.chain().focus().toggleHeaderCell().run()") toggleHeaderCell
					button( class="text-start w-full hover:opacity-60" type="button" :disabled="!editor.can().mergeOrSplit()" @click="editor.chain().focus().mergeOrSplit().run()") mergeOrSplit
					button( class="text-start w-full hover:opacity-60" type="button" :disabled="!editor.can().setCellAttribute('backgroundColor', '#FAF594')" @click="editor.chain().focus().setCellAttribute('backgroundColor', '#FAF594').run()" ) setCellAttribute
					button( class="text-start w-full hover:opacity-60" type="button" :disabled="!editor.can().fixTables()" @click="editor.chain().focus().fixTables().run()") fixTables
					button( class="text-start w-full hover:opacity-60" type="button" :disabled="!editor.can().goToNextCell()" @click="editor.chain().focus().goToNextCell().run()" ) goToNextCell
					button( class="text-start w-full hover:opacity-60" type="button" :disabled="!editor.can().goToPreviousCell()" @click="editor.chain().focus().goToPreviousCell().run()" ) goToPreviousCell




	//- Tabs Header
	div(class="h-16 flex items-center w-full pl-7")
		//- Tabs
		ul(class="h-full flex items-center justify-center")
			//- active
			li(class="flex items-center h-full w-auto relative p-2 px-6 pr-10 border border-[var(--dark200)] border-solid border-b-[var(--dark300)] after:content-[''] after:absolute after:w-full after:h-2 after:bg-[var(--dark300)] after:bottom-[-3px] after:left-0 rounded-t-3xl mr-4 bg-[var(--dark300)]")
				span(class="text-[var(--favColor)]")
					| {{ 'myOpenedTabs[0].id'}} Defualt Note
				button(type="button" v-on:click="'closeTab()'" class="hover:scale-90 duration-150 flex items-center justify-center bg-[var(--dark300)] h-8 w-8 rounded-full absolute right-[-6px] top-[-6px]")
					<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="scale-125"><path fill="var(--pink)" d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"/></svg>
			//- unactive
			li(class="opacity-50 flex items-center h-full w-auto relative p-2 px-6 pr-10 border border-[var(--dark200)] border-solid border-b-[var(--dark300)] after:content-[''] after:absolute after:w-full after:h-2 after:hidden after:bg-[var(--dark300)] after:bottom-[-3px] after:left-0 rounded-t-3xl mr-4 bg-[var(--dark300)]")
				span(class="text-[var(--favColor)]")
					| Defualt Note
				button(type="button" class="flex items-center justify-center bg-[var(--dark300)] h-8 w-8 rounded-full absolute right-[-6px] top-[-6px]")
					<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="scale-125"><path fill="var(--pink)" d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"/></svg>
			//- Add New Page
			//- li(class="mb-2 w-8 h-8 flex items-center justify-center")
			//- 	button(type="button" class="w-7 h-7 duration-150 hover:scale-90 bg-[var(--dark100)] rounded-full")
			//- 		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" class="w-full" ><path class="fill-[var(--favColor)]" d="M50.67,29.33h-16v-16a2.67,2.67,0,0,0-5.34,0v16h-16a2.67,2.67,0,0,0,0,5.34h16v16a2.67,2.67,0,0,0,5.34,0v-16h16a2.67,2.67,0,0,0,0-5.34Z"/></svg>

		//- Next & Prev
		//- div(class="")
		//-     button(class="") &lt;
		//-     button(class="") >

	//- Tab Content
	div(spellcheck="false" class="w-full h-full flex flex-col items-center outline-none p-4 text-[var(--white)] border border-[var(--dark200)] border-solid rounded-3xl bg-[var(--dark300)]")
		//- TipEditor
		//- <tip-tap v-model="content"></tip-tap>

		perfect-scrollbar
			div(class="bg-[var(--dark400)] flex flex-wrap w-full text-start rounded-lg")
				<editor-content class="w-full p-4" :editor="editor" />
			div( class="character-count mt-10" v-if="editor") words {{ editor.storage.characterCount.words() }} <br> characters {{ editor.storage.characterCount.characters() }}/{{ limit }}


		//- div(class="content w-full h-auto p-4 bg-gray-800 mt-8 ")
		//- 	h3(class="mb-5") OutPut Content =>:
		//- 	pre(class="pl-10")
		//- 		code(class="overflow-hidden" style="text-wrap: balance") {{ content }}
</template>


<style lang="scss">
.ProseMirror {
	margin: 1rem 0;
	outline: none;
	padding: 5px;

	> * + * {
		margin-top: 0.75em;
	}

	ul,
	ol {
		padding: 0 1rem;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		line-height: 1.1;
	}

	code {
		background-color: rgba(#616161, 0.1);
		color: #616161;
	}

	pre {
		background: #0d0d0d;
		color: #fff;
		font-family: "JetBrainsMono", monospace;
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;

		code {
			color: inherit;
			padding: 0;
			background: none;
			font-size: 0.8rem;
		}
	}

	img {
		max-width: 100%;
		height: auto;
	}

	blockquote {
		padding-left: 1rem;
		border-left: 2px solid rgba(#0d0d0d, 0.1);
	}

	hr {
		border: none;
		border-top: 2px solid rgba(#0d0d0d, 0.1);
		margin: 2rem 0;
	}

	table {
		border-collapse: collapse;
		table-layout: fixed;
		width: 100%;
		margin: 0;
		overflow: hidden;

		td,
		th {
			min-width: 1em;
			border: 2px solid var(--dark200);
			padding: 3px 5px;
			vertical-align: top;
			box-sizing: border-box;
			position: relative;

			> * {
				margin-bottom: 0;
			}
		}

		th {
			font-weight: bold;
			text-align: left;
			background-color: var(--dark100);
			// background-color: #f1f3f5;
			p {
				background-color: var(--dark100);
			}
		}

		.selectedCell:after {
			z-index: 2;
			position: absolute;
			content: "";
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			background: rgba(200, 200, 255, 0.4);
			pointer-events: none;
		}

		.column-resize-handle {
			position: absolute;
			right: -2px;
			top: 0;
			bottom: -2px;
			width: 4px;
			background-color: #adf;
			pointer-events: none;
		}

		p {
			margin: 0;
		}
	}
}

.tableWrapper {
	overflow-x: auto;
}

.resize-cursor {
	cursor: ew-resize;
	cursor: col-resize;
}
</style>
