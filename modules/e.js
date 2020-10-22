export default function E(p) {
    this.coral;
    this.story;
    this.startTime;
    this.sound;
    this.soundStarts = [
        {t: 31.5, d: 2}, 
        {t: 37, d: 2},
        {t: 42, d: 4},
        {t: 52, d: 2},
    ];
    this.soundEnded;

    this.basePositions = [];
    this.tipPositions = [];
    this.originalTipPositions = [];
    this.setup = () => {
        console.log("E!");
        this.coral = this.sceneManager.coral;
        this.story = this.sceneManager.story;
        this.startTime = p.millis();
        

        this.sound = p.loadSound('assets/audio/bassdrum.mp3'); //get sound
        this.sound.playMode('restart');


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
        })

    }

    //DRAW
    this.draw = () => {
        //clear and draw background
        p.clear();
        p.background(0);
        const timeSinceStart = p.millis() - this.startTime;
        this.coral.drawE(p, this.basePositions, this.tipPositions, this.originalTipPositions, timeSinceStart);

        if (timeSinceStart > 50000) {
            p.strokeWeight(p.map(timeSinceStart, 50000, 100000, 0.5, p.height, true));
        }
        //COLOR CORAL BLUE
    }

    this.clickFunction = () => {

        //add temporary brightness to coral
        
        //increase velocity


        //play a sample excerpt
        if (this.currentLine < this.sceneManager.textE.length && this.sound) {
            const soundExerpt = random(this.soundStarts);
            this.sound.play(0, 1, 0, soundExerpt.t, soundExerpt.d);
            this.sound.setVolume(0);
            this.sound.setVolume(1, 0.1);
            this.sound.setVolume(0, 0.3, soundExerpt.d - 0.3);
        }
    }
}

