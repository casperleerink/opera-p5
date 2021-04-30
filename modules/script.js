import { sketch } from "./sketch.js";
import fullScreenButton from "./fullscreen.js";

//elements and stream
const sketchContainer = document.getElementById("sketch-container");
const welcomePage = document.getElementById("welcome-page");
const startButton = document.getElementById("startButton");

//add fullscreen support
fullScreenButton();

//skip website beginning text
const nextBtn = document.getElementById("nextBtn");
nextBtn.addEventListener("click", () => {
  nextBtn.removeEventListener("click", this);
  welcomePage.style.display = "none";
  new p5(sketch, sketchContainer);
});

startButton.style.display = "block";
startButton.addEventListener("click", () => {
  welcomePage.style.display = "none";
  new p5(sketch, sketchContainer);
});
