let index = 0;
let speed = 0.001;
let yEnds = [];
let xEnds = [];
let xSpeed = [];
let helpText = true;
let font;
let abstract, dancers;
let textA, textB, textC, textD, textE;

const overBoxes = [false, false, false, false, false, false, false];
// const videoPaths = [
//     "https://res.cloudinary.com/casperleerink/video/upload/v1589947340/breathingbass/video_1.mp4",
//     "https://res.cloudinary.com/casperleerink/video/upload/v1589947340/breathingbass/video_1.mp4",
//     "https://res.cloudinary.com/casperleerink/video/upload/v1589947340/breathingbass/video_1.mp4",
//     "https://res.cloudinary.com/casperleerink/video/upload/v1589947340/breathingbass/video_1.mp4",
//     "https://res.cloudinary.com/casperleerink/video/upload/v1589947384/breathingbass/Video_2.mp4",
//     "https://res.cloudinary.com/casperleerink/video/upload/v1589947384/breathingbass/Video_2.mp4",
//     "https://res.cloudinary.com/casperleerink/video/upload/v1589947384/breathingbass/Video_2.mp4"
// ];
const imagePaths = [
    "assets/image/coral-cloud-coralreef.jpg",
    "assets/image/coral-cloud-dancers.jpg",
    "assets/image/coral-cloud-performance-bassdrum.jpg",
    "assets/image/coral-cloud-performance.jpg",
    "assets/image/coral-cloud-vulcano.jpg",
    "assets/image/video_1_1.gif",
    "assets/image/video_1_3.gif",
];
const videos = [];
const images = [];

function preload() {
    font = loadFont('assets/Raleway/Raleway-Light.ttf');
    textA = loadStrings('assets/textA.txt');
    // for (let i = 0; i < imagePaths.length; i++) {
    //     images.push(loadImage(imagePaths[i]));
    // }
    abstract = loadImage("assets/image/video_1_3.gif");
    dancers = loadImage("assets/image/video_1_1.gif");
    
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    imageMode(CENTER);
    ellipseMode(CENTER);
    textFont(font);
    const mgr = new SceneManager();
    mgr.coral = new Coral(textA.length);
    mgr.amount = textA.length;
    // mgr.images = images;
    mgr.abstract = abstract;
    mgr.dancers = dancers;
    mgr.textA = textA;
    mgr.wire();
    mgr.showScene(A);
    // for (let i = 0; i < imagePaths.length; i++) {
    //     //randomly create x and y end points for lines
    //     yEnds.push(height * random(0.2, 0.7));
    //     xEnds.push(width * ((i+2) * 0.1));
    //     xSpeed.push(0.001* width);
    // }

}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}



// function draw() {
//     background(0);
//     x=width * index;
//     const start = {
//         x: width * 0.5,
//         y: height,
//     }
//     if (helpText) {
//         push()
//         noStroke();
//         fill(100 + sin((frameCount)*0.03) * 100)
//         textAlign(CENTER);
//         textSize(20);
//         text('Hover over an image and click to play...', width * 0.5, height * 0.1);
//         pop();
//     }
//     strokeWeight(4);
//     for (let i = 0; i < imagePaths.length; i++) {
//         noFill();
//         //end point for the current line
//         const endPoint = {
//             x: xEnds[i],
//             y: yEnds[i],
//         }
//         //handle stroke brightness
//         const color = 128 + sin((frameCount + i*50)*0.03) * 128;
//         stroke(color);

//         //create the line
//         bezier(
//             start.x, 
//             start.y, 
//             width * 0.3 + (endPoint.x * 0.3), 
//             endPoint.y * 1.5, 
//             width * 0.4 + (endPoint.x * 0.2), 
//             endPoint.y * 1.2, 
//             endPoint.x, 
//             endPoint.y
//         );
//         // fill(color);
//         // ellipse(endPoint.x, endPoint.y, 1, 3)

//         //absolute x and y distance between mouse and endpoint
//         const dist = {
//             x: abs(mouseX - endPoint.x),
//             y: abs(mouseY - endPoint.y),
//         }

//         //if within distance, show image
//         if (dist.x < 10 && dist.y < 10) {
//             overBoxes[i] = true;
//             image(images[i], endPoint.x, endPoint.y, width * 0.15, (width * 0.15) * (images[i].height / images[i].width));
//         } else {
//             //set mouse=near for clickevent
//             overBoxes[i] = false;
//             image(images[i], endPoint.x, endPoint.y, width * 0.008, (width * 0.008) * (images[i].height / images[i].width));
//             //change x endpoint
//             xEnds[i] += xSpeed[i];
//             if (xEnds[i] > width) {
//                 xSpeed[i] = -0.001 * width;
//             }
//             if (xEnds[i] < 0) {
//                 xSpeed[i] = 0.001 * width;
//             }
//         }
//         //move video with the line
//         // const size = videos[i].size();
//         // videos[i].position(xEnds[i] - size.width * 0.5, yEnds[i] - size.height * 0.5);
//     }

// }

// function mousePressed() {
//     for (let i = 0; i < imagePaths.length; i++) {
//         if (overBoxes[i]) {
//             helpText = false; //disable help text

//             videos[i].show();
//             videos[i].size(width * 0.15, AUTO);
//             const size = videos[i].size();
//             videos[i].position(xEnds[i] - size.width * 0.5, yEnds[i] - size.height * 0.5);
//             videos[i].play();
//         } else {
//             videos[i].hide();
//             videos[i].stop();
//         }
//     }
// }