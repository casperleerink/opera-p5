export default function E(p) {
    this.coral;
    this.story;
    this.startTime;
    this.bassdrumSounds = [];
    this.soundEnded;
    this.textFollow;
    this.storyCompleted = false;

    this.basePositions = [];
    this.tipPositions = [];
    this.originalTipPositions = [];
    this.setup = () => {
        this.coral = this.sceneManager.coral;
        this.story = this.sceneManager.story;
        this.story.index = 0;
        this.story.pos = {x:-0.1, y:0.5};
        this.textFollow = p.random(this.coral.tips).pos;
        this.startTime = p.millis();
        
        //load all bassdrum sounds
        for (let i = 0; i < 12; i++) {
            const sound = p.loadSound(`assets/audio/bassdrum/${i+1}.mp3`);
            sound.playMode('restart');
            this.bassdrumSounds.push(sound);
        }
        //start playing the tune
        const sound = p.loadSound('assets/audio/soft-piano-tune.mp3', () => {
            sound.play();
        });


        //CORAL BASE
        this.coral.tips.forEach(t => {
            this.basePositions.push({
                x: p.random(0.2, 0.8),
                y: p.random(0.8, 1.0),
            });
            this.tipPositions.push({
                x: p.random(0.1, 0.9),
                y: p.random(0.1, 0.7)
            });
            this.originalTipPositions.push({...t.pos});
            t.baseVel = 0.001;
        });

        //CLICK
        this.sceneManager.cnv.mousePressed(() => {
            this.clickFunction(p.mouseX/p.width, p.mouseY/p.height);
        });
    }

    this.clickFunction = (x, y) => {
        this.story.onClick(p, x, y, () => {
            if (this.story.index < this.story.e.length-1) {
                this.story.index++;
                this.textFollow = p.random(this.sceneManager.coral.tips).pos;
                //play a sample excerpt
                const sound = p.random(this.bassdrumSounds);
                sound.play();
                this.coral.tips.forEach(t => {
                    t.color[2] += p.random(0, 5);
                })
            } else {
                if (!this.storyCompleted) {
                    this.bassdrumSounds.forEach(s => { s.disconnect() });
                    this.storyCompleted = p.millis();
                    document.body.style.cursor = "auto";
                }
            }
        });
    }

    //DRAW
    this.draw = () => {
        //clear and draw background
        p.clear();
        p.background(0);
        const timeSinceStart = p.millis() - this.startTime;
        this.coral.drawE(p, this.basePositions, this.tipPositions, this.originalTipPositions, timeSinceStart);

        //STORY TEXT
        if (!this.storyCompleted && timeSinceStart > 5000) {
            this.story.follow(p, this.textFollow, 0.02);
            this.story.drawE(p);
            this.story.onHover(p, p.mouseX/p.width, p.mouseY/p.height, () => {
                document.body.style.cursor = "pointer";
            }, () => {
                document.body.style.cursor = "auto";
            });
        }

        if (this.storyCompleted) {
            p.strokeWeight(p.map(p.millis() - this.storyCompleted, 0, 300000, 0.5, p.height*0.1, true));
        }
    }
}

