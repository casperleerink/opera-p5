import {setGradientCashe, clip} from './util.js';
import E from './e.js';
export default function D(p) {
    this.startTime;
    this.sound;
    this.soundEnded;
    this.gradientLeft;
    this.gradientRight;
    this.gradientPos = [-0.2, 1.2];
    this.coral;
    this.yPos = [];

    this.setup = () => {
        //TIME
        this.startTime = p.millis();
        //GRADIENT (PANTHEON)
        this.gradientLeft = p.createGraphics(p.width * 0.4, p.height);
        this.gradientRight = p.createGraphics(p.width * 0.4, p.height);
        setGradientCashe(
            p, 
            "VERTICAL",
            p.width * 0.4, 
            p.height, 
            p.color(170), 
            p.color(0), 
            this.gradientLeft
        );
        setGradientCashe(
            p, 
            "VERTICAL",
            p.width * 0.4, 
            p.height, 
            p.color(0), 
            p.color(170), 
            this.gradientRight
        );

        //CORAL
        this.coral = this.sceneManager.coral;
        this.coral.tips.forEach((t) => {
            this.yPos.push(p.random(0.7, 0.97));
            t.baseVel *= 0.7;
            // t.pos = {
            //     x: clip(t.pos.x, 0.2, 0.8),
            //     y: clip(t.pos.y, 0.2, 0.8),
            // }
            // t.boundaries = [0.2, 0.8];
        });


        //SOUND
        this.sound = p.loadSound("assets/audio/part-d-skeletal.mp3", () => {
            this.sound.play();
            this.sound.onended(() => {
                this.soundEnded = p.millis();
                this.yPos.length = 0;
                this.coral.tips.forEach(t => {
                    this.yPos.push(p.random(0.2, 0.7));
                });
            });
        });

        const nextBtn = document.getElementById('nextBtn')
        nextBtn.addEventListener('click', () => {
            nextBtn.removeEventListener('click', this);
            this.sound.disconnect();
            this.sceneManager.showScene(E);
        });
    }

    //DRAW
    this.draw = () => {
        //clear and draw background
        p.clear();
        p.background(0);
        const currentTime = p.millis();

        //gradient background (pantheon)
        const deltaStartTime = currentTime - this.startTime;
        if (deltaStartTime < 10000) {
            this.gradientPos[0] = p.map(deltaStartTime, 0, 10000, -0.2, 0.2);
            this.gradientPos[1] = p.map(deltaStartTime, 0, 10000, 1.2, 0.8);
            p.strokeWeight(p.map(deltaStartTime, 0, 10000, 1.0, 0.5));
        }
        if (this.soundEnded) {
            const delta = currentTime - this.soundEnded;
            if (delta < 4000) {
                this.gradientPos[0] = p.map(delta, 0, 4000, 0.2, -0.2);
                this.gradientPos[1] = p.map(delta, 0, 4000, 0.8, 1.2);
            } else {
                this.sceneManager.showScene(E);
            }
        }
        p.image(this.gradientLeft, this.gradientPos[0] * p.width, p.height*0.5, p.width*0.4, p.height);
        p.image(this.gradientRight, this.gradientPos[1] * p.width, p.height*0.5, p.width*0.4, p.height);

        //coral to yPos
        this.coral.drawD(p, this.yPos, deltaStartTime);
    }
}
