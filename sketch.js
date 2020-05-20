let index = 0;
let speed = 0.001;
let yEnds = [];
let xEnds = [];
let xSpeed = [];
let strokeColors = [0, 40, 80, 120, 160, 200, 240];

const overBoxes = [false, false, false, false, false, false, false];
const videoPaths = [
    "https://res.cloudinary.com/casperleerink/video/upload/v1589947340/breathingbass/video_1.mp4",
    "https://res.cloudinary.com/casperleerink/video/upload/v1589947340/breathingbass/video_1.mp4",
    "https://res.cloudinary.com/casperleerink/video/upload/v1589947340/breathingbass/video_1.mp4",
    "https://res.cloudinary.com/casperleerink/video/upload/v1589947340/breathingbass/video_1.mp4",
    "https://res.cloudinary.com/casperleerink/video/upload/v1589947384/breathingbass/Video_2.mp4",
    "https://res.cloudinary.com/casperleerink/video/upload/v1589947384/breathingbass/Video_2.mp4",
    "https://res.cloudinary.com/casperleerink/video/upload/v1589947384/breathingbass/Video_2.mp4"
];
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
    for (let i = 0; i < imagePaths.length; i++) {
        images.push(loadImage(imagePaths[i]));
        videos.push(createVideo(videoPaths[i]));
        videos[i].hideControls();
        videos[i].hide();
        videos[i].onended((vid) => {
            vid.hide();
        });
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    imageMode(CENTER);
    ellipseMode(CENTER);
    for (let i = 0; i < imagePaths.length; i++) {
        //randomly create x and y end points for lines
        yEnds.push(height * random(0.2, 0.7));
        xEnds.push(width * ((i+2) * 0.1));
        xSpeed.push(0.001* width);
    }

}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);
    strokeWeight(4);
    x=width * index;
    const start = {
        x: width * 0.5,
        y: height,
    }
    for (let i = 0; i < imagePaths.length; i++) {
        noFill();
        //end point for the current line
        const endPoint = {
            x: xEnds[i],
            y: yEnds[i],
        }
        //handle stroke brightness
        stroke(strokeColors[i]);
        strokeColors[i]++;
        if (strokeColors[i] > 255) {
            strokeColors[i] = 0;
        }

        //create the line
        bezier(
            start.x, 
            start.y, 
            width * 0.3 + (endPoint.x * 0.3), 
            endPoint.y * 1.5, 
            width * 0.4 + (endPoint.x * 0.2), 
            endPoint.y * 1.2, 
            endPoint.x, 
            endPoint.y
        );
        // fill(strokeColors[i]);
        // ellipse(endPoint.x, endPoint.y, 5, 5)

        //x and y distance between mouse and endpoint
        const dist = {
            x: abs(mouseX - endPoint.x),
            y: abs(mouseY - endPoint.y),
        }

        //if within distance, show image
        if (dist.x < 10 && dist.y < 10) {
            overBoxes[i] = true;
            image(images[i], endPoint.x, endPoint.y, width * 0.15, (width * 0.15) * (images[i].height / images[i].width));
        } else {
            //set 
            overBoxes[i] = false;
            //change x endpoint
            xEnds[i] += xSpeed[i];
            if (xEnds[i] > width) {
                xSpeed[i] = -0.001 * width;
            }
            if (xEnds[i] < 0) {
                xSpeed[i] = 0.001 * width;
            }
        }
    }

}

function mousePressed() {
    for (let i = 0; i < imagePaths.length; i++) {
        if (overBoxes[i]) {
            videos[i].show();
            videos[i].size(width * 0.5, AUTO);
            videos[i].position(width * 0.25, 10);
            videos[i].play();
        } else {
            videos[i].hide();
            videos[i].stop();
        }
    }
}