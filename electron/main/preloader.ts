// alert("preloader.ts :- It Worked!");

function domReady(
	condition: DocumentReadyState[] = ["complete", "interactive"]
) {
	return new Promise((resolve) => {
		if (condition.includes(document.readyState)) {
			resolve(true);
		} else {
			document.addEventListener("readystatechange", () => {
				if (condition.includes(document.readyState)) {
					resolve(true);
				}
			});
		}
	});
}

const safeDOM = {
	append(parent: HTMLElement, child: HTMLElement) {
		if (!Array.from(parent.children).find((e) => e === child)) {
			return parent.appendChild(child);
		}
	},
	remove(parent: HTMLElement, child: HTMLElement) {
		if (Array.from(parent.children).find((e) => e === child)) {
			return parent.removeChild(child);
		}
	},
};

function useLoading() {
	const styleContent = `
		#preloader {
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			background-color: #222;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 100;
		}
		#loader {
			display: block;
			position: relative;
			width: 150px;
			height: 150px;
			margin: -75px 0 0 -75px;
			border-radius: 50%;
			border: 3px solid transparent;
			border-top-color: #9370DB;
			-webkit-animation: spin 2s linear infinite;
			animation: spin 2s linear infinite;
		}
		#loader:before {
			content: "";
			position: absolute;
			top: 5px;
			left: 5px;
			right: 5px;
			bottom: 5px;
			border-radius: 50%;
			border: 3px solid transparent;
			border-top-color: #BA55D3;
			-webkit-animation: spin 3s linear infinite;
			animation: spin 3s linear infinite;
		}
		#loader:after {
			content: "";
			position: absolute;
			top: 15px;
			left: 15px;
			right: 15px;
			bottom: 15px;
			border-radius: 50%;
			border: 3px solid transparent;
			border-top-color: #FF00FF;
			-webkit-animation: spin 1.5s linear infinite;
			animation: spin 1.5s linear infinite;
		}
		@-webkit-keyframes spin {
			0%   {
				-webkit-transform: rotate(0deg);
				-ms-transform: rotate(0deg);
				transform: rotate(0deg);
			}
			100% {
				-webkit-transform: rotate(360deg);
				-ms-transform: rotate(360deg);
				transform: rotate(360deg);
			}
		}
		@keyframes spin {
			0%   {
				-webkit-transform: rotate(0deg);
				-ms-transform: rotate(0deg);
				transform: rotate(0deg);
			}
			100% {
				-webkit-transform: rotate(360deg);
				-ms-transform: rotate(360deg);
				transform: rotate(360deg);
			}
		}
    `;
	const oStyle = document.createElement("style");
	const oDiv = document.createElement("div");

	oStyle.id = "app-loading-style";
	oStyle.innerHTML = styleContent;
	oDiv.id = "preloader";
	oDiv.innerHTML = `<div id="loader"></div>`;

	return {
		appendLoading() {
			safeDOM.append(document.head, oStyle);
			safeDOM.append(document.body, oDiv);
		},
		removeLoading() {
			safeDOM.remove(document.head, oStyle);
			safeDOM.remove(document.body, oDiv);
		},
	};
}

// ----------------------------------------------------------------------

const { appendLoading, removeLoading } = useLoading();
domReady().then(appendLoading);

window.onmessage = (ev) => {
	ev.data.payload === "removeLoading" && removeLoading();
};

setTimeout(removeLoading, 4999);

window.addEventListener("DOMContentLoaded", () => {
	const replaceText = (Selector, Text) => {
		const element = document.getElementById(Selector);
		if (element) element.innerText = Text;
	};
	for (const type of ["chrome", "node", "electron"]) {
		replaceText(`${type}-version`, process.versions[type]);
	}
});
