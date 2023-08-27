const { ipcRenderer } = require("electron");
const ipc = ipcRenderer;
// console.log(ipcRenderer);


// close App
// let closeBtn = document.getElementById("closeBtn");
// closeBtn.addEventListener("click", () => {
// 	ipc.send("closeApp");
// });

// minimize
let minimize : HTMLElement | null = document.getElementById("minimize");
minimize!.addEventListener("click", () => {
	ipc.send("minimizeApp");
});

// maximize
let maximize = document.getElementById("maximize");
maximize!.addEventListener("click", () => {
	ipc.send("maximizeApp");
});

// Change FavColor
let favColorList = document.getElementById("favColorsUL")!.querySelectorAll("li"),
	root = document.querySelector(":root") as HTMLElement;

let gradin = {
	"var(--sky)":
		"linear-gradient(90deg, #03947c 0%, #00bba2 35%, #64ecda 100%)",
	"var(--yellow)":
		"linear-gradient(90deg, #ff6600 0%, #e9912d 35%, #fdc063 100%)",
	"var(--green)":
		"linear-gradient(90deg, #37cf4c 0%, #22dd61 35%, #49c46e 100%)",
	"var(--pink)":
		"linear-gradient(90deg, #e00043 0%, #d1457f 35%, #fc7373 100%)",
	"var(--purple)":
		"linear-gradient(90deg, #9001ce 0%, #9a44cc 35%, #c16bf3 100%)",
	"var(--blue)":
		"linear-gradient(90deg, #125ce6 0%, #3a69c0 35%, #7c94ff 100%)",
};

for (let x = 0; x < favColorList.length; x++) {
	favColorList[x].addEventListener("click", () => {
		let favCo = favColorList[x].getAttribute("data-color") || "yellow";
		console.log(favCo);
		root.style.setProperty("--favColor", favCo);
		root.style.setProperty("--bgG", gradin[favCo]);
		for (let z = 0; z < favColorList.length; z++) {
			favColorList[z].classList.remove("scale-125", "mx-2");
		}
		favColorList[x].classList.add("scale-125", "mx-2");
	});
}

// Close Lists, Like list pages, list Notes
// let closeListPages = document.getElementById("closeListPages"),
// 	Pages = document.getElementById("Pages");
// closeListPages.addEventListener("click", () => {
// 	// Pages.classList.toggle("w-1/5");
// 	Pages.classList.toggle("");
// });




// closeOrResize
let closeOrResize = document.getElementById("closeOrResize"),
	notes = document.getElementById("notes"),
	isDown = false;


closeOrResize!.addEventListener("mousedown", function (event) {
	isDown = true;
	window.addEventListener( "mousemove", function (e) {
		e.preventDefault();
		if (isDown) {
			notes!.style.width = e.clientX + "px";
		}
	},true);
},true);

document.addEventListener("mouseup",function () {
		isDown = false;
},true);