let font;
let abstract, dancers;
let textA, textB, textC, textD, textE;

const audioPaths = [
    "assets/audio/episode-1-end-reverse.mp3",
    "assets/audio/part-b-collapsed.mp3",
    "assets/audio/storm.mp3",
    "assets/audio/part-d-skeletal.mp3",
    "assets/audio/bassdrum.mp3",
];
const videos = [];
const images = [];
// const audio = [];
function preload() {
    font = loadFont('assets/Raleway/Raleway-Light.ttf');
    textA = loadStrings('assets/textA.txt');
    textC = loadStrings('assets/textC.txt');
    textE = loadStrings('assets/textE.txt');
    abstract = loadImage("assets/image/video_1_3.gif");
    // dancers = loadImage("assets/image/video_1_1.gif");
    // audioPaths.forEach((path) => {
    //     audio.push(loadSound(path));
    // });
}

function setup() {
    const c = createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    imageMode(CENTER);
    ellipseMode(CENTER);
    textAlign(CENTER);
    textSize(14);
    textFont(font);
    const mgr = new SceneManager();
    mgr.coral = new Coral(textA.length);
    // mgr.coral.velocity(1);
    mgr.amount = textA.length;
    mgr.abstract = abstract;
    // mgr.dancers = dancers;
    mgr.textA = textA;
    mgr.textC = textC;
    mgr.textE = textE;
    // mgr.audio = audio;
    mgr.wire();
    const strokeColors = [];
    for (let i= 0; i < textA.length; i++) {
        strokeColors.push(color(random(0, 255)));
    }
    // mgr.showScene(E, strokeColors);
    mgr.showScene(A);

}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
