import A from './a.js';
import Coral from './coral.js'
import Story from './story.js'
const sketchContainer = document.getElementById('sketch-container');

//The Sketch!
export const sketch = (p) => {
    let cnv;
    let cloud;
    p.preload = () => {
        cloud = p.loadImage('assets/image/cloud.gif');
    }
    p.setup = () => {

        //create canvas with width and height of container
        const containerPos = sketchContainer.getBoundingClientRect();
        cnv = p.createCanvas(containerPos.width, containerPos.height); //the canvas!

        //set up canvas standards
        p.frameRate(30); //draw is called around 30 times/second
        p.textSize(p.width * 0.015);
        p.noFill();
        p.strokeWeight(1);
        p.rectMode(p.CENTER);
        p.imageMode(p.CENTER);
        p.textAlign(p.CENTER);

        const mgr = new SceneManager(p);
        mgr.wire();
        mgr.coral = new Coral(p, 17);
        mgr.story = new Story(p);
        mgr.cloud = cloud;
        mgr.cnv = cnv;
        mgr.showScene(A);
    }


    //resize canvas
    p.windowResized = () => {
        //when window changes (fullscreen etc..) resize the canvas again
        const containerPos = sketchContainer.getBoundingClientRect();
        p.resizeCanvas(containerPos.width, containerPos.height);
    }
};


// // const audio = [];
// function preload() {
//     abstract = loadImage("assets/image/video_1_3.gif");
//     // dancers = loadImage("assets/image/video_1_1.gif");
//     // audioPaths.forEach((path) => {
//     //     audio.push(loadSound(path));
//     // });
// }

// function setup() {
//     const c = createCanvas(windowWidth, windowHeight);
//     rectMode(CENTER);
//     imageMode(CENTER);
//     ellipseMode(CENTER);
//     textAlign(CENTER);
//     textSize(14);
//     textFont(font);
//     const mgr = new SceneManager();
//     mgr.coral = new Coral(textA.length);
//     // mgr.coral.velocity(1);
//     mgr.amount = textA.length;
//     mgr.abstract = abstract;
//     // mgr.dancers = dancers;
//     mgr.textA = textA;
//     mgr.textC = textC;
//     mgr.textE = textE;
//     // mgr.audio = audio;
//     mgr.wire();
//     const strokeColors = [];
//     for (let i= 0; i < textA.length; i++) {
//         strokeColors.push(color(random(0, 255)));
//     }

//     nextBtn = createButton("Next Scene ->");
//     nextBtn.style('cursor', "pointer");
//     nextBtn.position(10, 10);
//     // mgr.showScene(E, strokeColors);
//     mgr.showScene(A);
// }
// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight);
// }
