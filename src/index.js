import "./index.scss";
console.log("Привет, мир!");

function setBackgroundImage(imageUrl) {
	document.body.style.backgroundImage = `url('${imageUrl}')`;
	document.body.style.backgroundSize = "cover";
	document.body.style.backgroundPosition = "center";
	document.body.style.backgroundRepeat = "no-repeat";
}

let currentAudio = null;
let favicon = document.querySelector("link[rel='shortcut icon']");
function buttonOnClick(buttonId) {
	let audio;
	switch (buttonId) {
		case "sunButton":
			setBackgroundImage("temp/summer-bg.jpg");
			audio = document.getElementById("sunAudio");
			favicon.href = "temp/sun.svg";
			break;
		case "rainButton":
			setBackgroundImage("temp/rainy-bg.jpg");
			audio = document.getElementById("rainAudio");
			favicon.href = "temp/cloud-rain.svg";
			break;
		case "winterButton":
			setBackgroundImage("temp/winter-bg.jpg");
			audio = document.getElementById("winterAudio");
			favicon.href = "temp/cloud-snow.svg";
			break;
		default:
			return;
	}

	if (currentAudio === audio) {
		if (!audio.paused) {
			audio.pause();
			favicon.href = "temp/pause.svg";
		} else {
			audio.play();
		}
	} else {
		if (currentAudio && !currentAudio.paused) {
			currentAudio.pause();
			currentAudio.currentTime = 0;
		}
		audio.play();
		currentAudio = audio;
	}
}

document.addEventListener("DOMContentLoaded", function () {
	let button = document.getElementById("sunButton");
	button.addEventListener("click", function () {
		buttonOnClick("sunButton");
	});

	button = document.getElementById("rainButton");
	button.addEventListener("click", function () {
		buttonOnClick("rainButton");
	});

	button = document.getElementById("winterButton");
	button.addEventListener("click", function () {
		buttonOnClick("winterButton");
	});
});

const volumeSlider = document.getElementById("volumeSlider");
volumeSlider.addEventListener("input", function () {
	if (currentAudio) {
		currentAudio.volume = parseFloat(this.value);
	}
});
