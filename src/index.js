import "./index.scss";
console.log("Привет, мир!");

function setBackgroundImage(imageUrl) {
	document.body.style.backgroundImage = `url('${imageUrl}')`;
}

function setDefault() {
	document.getElementById("sunIcon").src = "temp/sun.svg";
	document.getElementById("rainIcon").src = "temp/cloud-rain.svg";
	document.getElementById("winterIcon").src = "temp/cloud-snow.svg";
}

let currentAudio = null;
function buttonOnClick(buttonId) {
	setDefault();
	let background;
	let audioId;
	let icon;
	let iconId;
	switch (buttonId) {
		case "sunButton":
			background = "temp/summer-bg.jpg";
			audioId = "sunAudio";
			icon = "temp/sun.svg";
			iconId = "sunIcon";
			break;
		case "rainButton":
			background = "temp/rainy-bg.jpg";
			audioId = "rainAudio";
			icon = "temp/cloud-rain.svg";
			iconId = "rainIcon";
			break;
		case "winterButton":
			background = "temp/winter-bg.jpg";
			audioId = "winterAudio";
			icon = "temp/cloud-snow.svg";
			iconId = "winterIcon";
			break;
		default:
			return;
	}

	setBackgroundImage(background);
	let audioElement = document.getElementById(audioId);
	let favicon = document.querySelector("link[rel='shortcut icon']");
	let iconElement = document.getElementById(iconId);

	if (currentAudio === audioElement) {
		if (!audioElement.paused) {
			audioElement.pause();
			favicon.href = "temp/pause.svg";
			iconElement.src = "temp/pause.svg";
		} else {
			audioElement.play();
			iconElement.src = icon;
			favicon.href = icon;
		}
	} else {
		if (currentAudio && !currentAudio.paused) {
			currentAudio.pause();
			currentAudio.currentTime = 0;
		}
		audioElement.play();
		iconElement.src = icon;
		favicon.href = icon;
		currentAudio = audioElement;
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
	const value = parseFloat(this.value);
	updateSliderBackground(value);
	if (currentAudio) {
		currentAudio.volume = value;
	}
});

function updateSliderBackground(value) {
	volumeSlider.style.background = `linear-gradient(to right, #3399ff ${
		value * 100
	}%, #ccc ${value * 100}%)`;
}

updateSliderBackground(parseFloat(volumeSlider.value));
