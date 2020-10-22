import Storm from './storm.js'
import D from './d.js'

export default function C(p) {
    this.story;
    this.sound;
    this.storm;
    this.currentCue = 0;
    this.lightning = false;
    this.lightningStrength = 150;

    this.textFollow;

    this.setup = () => {
        this.story = this.sceneManager.story;
        this.story.index = 0;
        this.story.pos = {x:0.5, y:0.5};

        //sound setup
        this.sound = p.loadSound("assets/audio/storm.mp3", () => {
            this.sound.play();
            this.sound.onended(() => {
                this.sound.disconnect();
                this.storm.pause();
                this.storm.destroy();
                this.sceneManager.showScene(D);
            });
        });

        //video setup
        this.storm = new Storm(p, document.getElementById('stream-container'), "423811183");
        this.storm.play();


        //start coral moving again
        this.sceneManager.coral.tips.forEach(t => {
            t.baseVel = 0.001;
        });
        this.textFollow = p.random(this.sceneManager.coral.tips).pos;

        this.sceneManager.cnv.mousePressed(() => {
            this.clickFunction(p.mouseX/p.width, p.mouseY/p.height);
        });

        const nextBtn = document.getElementById('nextBtn')
        nextBtn.addEventListener('click', () => {
            nextBtn.removeEventListener('click', this);
            this.sound.disconnect();
            this.storm.pause();
            this.storm.destroy();
            this.sceneManager.showScene(D);
        });
    }
    //MOUSEPRESS FUNCTION
    this.clickFunction = (x, y) => {
        this.story.onClick(p, x, y, () => {
            this.story.index++;
            this.textFollow = p.random(this.sceneManager.coral.tips).pos;
            this.lightning = {x ,y};
            setTimeout(() => {
                this.lightning = undefined;
            }, 1000);
        });
    }
    //DRAW
    this.draw = () => {
        //clear and draw background
        p.clear();
        this.lightning ? p.background(0, 255-this.lightningStrength) : p.background(0, 255);

        
        this.sceneManager.coral.drawC(p, this.lightning);
        this.story.follow(p, this.textFollow, 0.02);
        
        this.story.drawC(p);
        this.story.onHover(p, p.mouseX/p.width, p.mouseY/p.height, () => {
            document.body.style.cursor = "pointer";
        }, () => {
            document.body.style.cursor = "auto";
        });
    }


    // this.cueCallback = (cue) => {
    //     if (this.currentCue != cue) {
    //         this.currentCue = cue;

    //         //make text appear on former video position
    //         this.currentLine++;
    //         this.textGroup.removeSprites();
    //         if (this.currentLine < this.sceneManager.textC.length) {
    //             const s = new TextSprite(this.mousePosition.x, this.mousePosition.y, 0, 0);
    //             s.setDraw(this.sceneManager.textC[this.currentLine]);
    //             s.setGroup(this.textGroup);
    //         }
    //         const newMousePos = {
    //             x: random(width * 0.2, width * 0.8),
    //             y: random(30, height * 0.9),
    //         }
    //         while (abs(newMousePos.y - this.mousePosition.y) < this.videoHeight) {
    //             newMousePos.y = random(30, height * 0.9);
    //         }
    //         //see mousepress (mouse pos, panning, lightning)
    //         this.mousePress(newMousePos.x, newMousePos.y);
    //         this.lightningStrength = (cue/this.sound.duration()) * 60;
    //     }
    // }
}

