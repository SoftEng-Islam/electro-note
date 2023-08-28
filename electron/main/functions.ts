// const { ipcRenderer } = require("electron");
// const ipc = ipcRenderer;








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