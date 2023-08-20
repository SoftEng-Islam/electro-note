import { defineStore } from 'pinia'
export const useTaskStore = defineStore('taskStore', {
	state: () => ({
		tasks: [
			{ id: 1, title: "buy some milk", isFav: false },
			{ id: 2, title: "play gloomhaven", isFav: true }
		],
		name: 'Islam'
	}),
	getters: {
		favs() { // this refer to state Object
			return this.tasks.filter(t => t.isFav)
		}
	}
});

