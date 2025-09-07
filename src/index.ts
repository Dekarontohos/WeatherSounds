import "./index.scss";

import sunIcon from "./assets/icons/sun.svg";
import rainIcon from "./assets/icons/cloud-rain.svg";
import snowIcon from "./assets/icons/cloud-snow.svg";
import pauseIcon from "./assets/icons/pause.svg";

import summerBg from "./assets/pictures/summer-bg.jpg";
import rainyBg from "./assets/pictures/rainy-bg.jpg";
import winterBg from "./assets/pictures/winter-bg.jpg";

import summerSound from "./assets/sounds/summer.mp3";
import rainSound from "./assets/sounds/rain.mp3";
import winterSound from "./assets/sounds/winter.mp3";

function setBackgroundImage(imageUrl: string): void {
	document.body.style.backgroundImage = `url('${imageUrl}')`;
}

function setDefault(): void {
	const sunIconElement = document.getElementById(
		"sunIcon"
	) as HTMLImageElement | null;
	const rainIconElement = document.getElementById(
		"rainIcon"
	) as HTMLImageElement | null;
	const winterIconElement = document.getElementById(
		"winterIcon"
	) as HTMLImageElement | null;

	if (sunIconElement) sunIconElement.src = sunIcon;
	if (rainIconElement) rainIconElement.src = rainIcon;
	if (winterIconElement) winterIconElement.src = snowIcon;
}

let currentAudio: HTMLAudioElement | null = null;

function buttonOnClick(buttonId: string): void {
	setDefault();

	let background: string;
	let audioId: string;
	let icon: string;
	let iconId: string;

	switch (buttonId) {
		case "sunButton":
			background = summerBg;
			audioId = "sunAudio";
			icon = sunIcon;
			iconId = "sunIcon";
			break;
		case "rainButton":
			background = rainyBg;
			audioId = "rainAudio";
			icon = rainIcon;
			iconId = "rainIcon";
			break;
		case "winterButton":
			background = winterBg;
			audioId = "winterAudio";
			icon = snowIcon;
			iconId = "winterIcon";
			break;
		default:
			return;
	}

	setBackgroundImage(background);

	const audioElement = document.getElementById(
		audioId
	) as HTMLAudioElement | null;
	const favicon = document.querySelector(
		"link[rel='shortcut icon']"
	) as HTMLLinkElement | null;
	const iconElement = document.getElementById(
		iconId
	) as HTMLImageElement | null;

	if (!audioElement || !favicon || !iconElement) {
		console.warn("One or more elements not found");
		return;
	}

	let audioSrc: string;
	switch (buttonId) {
		case "sunButton":
			audioSrc = summerSound;
			break;
		case "rainButton":
			audioSrc = rainSound;
			break;
		case "winterButton":
			audioSrc = winterSound;
			break;
		default:
			audioSrc = "";
	}

	if (audioElement.src !== audioSrc) {
		audioElement.src = audioSrc;
	}

	if (currentAudio === audioElement) {
		if (!audioElement.paused) {
			audioElement.pause();
			favicon.href = pauseIcon;
			iconElement.src = pauseIcon;
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

document.addEventListener("DOMContentLoaded", () => {
	const sunButton = document.getElementById("sunButton");
	const rainButton = document.getElementById("rainButton");
	const winterButton = document.getElementById("winterButton");

	if (sunButton) {
		sunButton.addEventListener("click", () => buttonOnClick("sunButton"));
	}
	if (rainButton) {
		rainButton.addEventListener("click", () => buttonOnClick("rainButton"));
	}
	if (winterButton) {
		winterButton.addEventListener("click", () =>
			buttonOnClick("winterButton")
		);
	}
});

const volumeSlider = document.getElementById(
	"volumeSlider"
) as HTMLInputElement | null;

if (volumeSlider) {
	volumeSlider.addEventListener("input", function () {
		const value = parseFloat(this.value);
		updateSliderBackground(value);
		if (currentAudio) {
			currentAudio.volume = value;
		}
	});

	function updateSliderBackground(value: number): void {
		if (volumeSlider !== null) {
			volumeSlider.style.background = `linear-gradient(to right, #3399ff ${
				value * 100
			}%, #ccc ${value * 100}%)`;
		}
	}

	updateSliderBackground(parseFloat(volumeSlider.value));
} else {
	console.warn("Volume slider element not found");
}
