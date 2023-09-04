import { defineStore } from 'pinia'
export const useTaskStore = defineStore('taskStore', {
	state: () => ({
		Users: [
			{ id: 1, title: "buy some milk", isFav: false },
			{ id: 1, title: "buy some milk", isFav: false },
		],
		Notes: [
			{ id: 1, title: "buy some milk", isFav: false },
			{ id: 2, title: "play gloomhaven", isFav: true }
		],
		name: 'Islam',
		modeToToggle: 'dark',
	}),
	getters: {
		favs() {
			// this refer to state Object
			// return this.tasks.filter(t => t.isFav);
		}
	},
	actions: {
		setmode(mode: string) {
			this.modeToToggle = mode;
		}
	}

});