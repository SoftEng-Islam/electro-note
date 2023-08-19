import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import Options from "../views/Options.vue";

const routes = [
	{
		path: "/",
		name: "HomePage",
		component: HomePage
	},
	{
		path: "/options",
		name: "Options",
		component: Options
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
