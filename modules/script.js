import {sketch} from './sketch.js'
import fullScreenButton from './fullscreen.js'

//elements and stream
const sketchContainer = document.getElementById('sketch-container');
const welcomePage = document.getElementById('welcome-page');
const startButton = document.getElementById('startButton');

//add fullscreen support
fullScreenButton();

startButton.style.display = "block";
startButton.addEventListener('click', () => {
    welcomePage.style.display = "none";
    new p5(sketch, sketchContainer);
});