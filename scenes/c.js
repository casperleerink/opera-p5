function C() {
    //coral vars
    this.strokeColors;
    this.speedDenominator = [];
    this.randomDeviation = [];
    this.mousePosition = {
        x: random(0, width * 0.5),
        y: random(0, height * 0.5),
    }
    //vars
    this.sound;
    this.currentCue = 0;
    this.lightning = false;
    this.lightningStrength = 0;
    this.textGroup = new Group();
    this.currentLine = -1;
    //video vars
    this.videoWidth = width * 0.2;
    this.videoHeight;
    this.iframe;
    this.div = createDiv();
    this.setup = () => {
        //CANVAS setup
        background(0);
        this.strokeColors = this.sceneArgs;
        for (let i = 0; i < this.sceneManager.amount; i++) {
            this.speedDenominator.push(random(10, 70));
            this.randomDeviation.push(random(-30, 30));
        }
        //sound setup
        this.sound = this.sceneManager.audio[2]; //get sound
        for (let i = 1; i < this.sound.duration(); i += random(4, 10)) {        
            this.sound.addCue(i, this.cueCallback, i); //add random ques that trigger video displacement, text, lightning
        }
        this.sound.play();
        this.sound.onended(() => {
            this.sceneManager.showScene( D, this.strokeColors);
        });

        //VIDEO setup
        this.div.id("player");
        // this.div.size(width * 0.1, height * 0.1);
        this.div.style('opacity', 0.0);
        this.div.hide();
        this.iframe = new Vimeo.Player('player', {
            id: "423811183",
            width: this.videoWidth,
            controls: "false",
            loop: true,
        });
        Promise.all([this.iframe.getVideoWidth(), this.iframe.getVideoHeight()]).then((dimensions) => {
            this.videoHeight = this.videoWidth * (dimensions[1]/dimensions[0]);
            this.div.size(this.videoWidth, this.videoHeight);
            this.div.position(this.mousePosition.x - this.videoWidth/2,this.mousePosition.y - this.videoHeight/2);
        });
        //Play video
        this.iframe.play().then(() => {
            // The video is playing
            this.div.show();
            ramp(0, 1, 2000, 10, (c) => {
                this.div.style('opacity', c);
            });
        });
        
    }
    //DRAW
    this.draw = () => {
        //clear and draw background
        clear();
        //To do: set lightning strength to increase with song progress
        this.lightning ? background(random(0, this.lightningStrength)) : background(0);
        // background(random(0, 20));

        //variables
        const coralTips = this.sceneManager.coral.coralTips;
        coralTips.forEach((s, i) => {
            s.velocity.x = ((this.mousePosition.x + random(-this.lightningStrength*1.5, this.lightningStrength*1.5))- s.position.x)/this.speedDenominator[i];
            s.velocity.y = ((this.mousePosition.y + random(-this.lightningStrength*1.5, this.lightningStrength*1.5)) - s.position.y)/this.speedDenominator[i];
        });
        //create lines (color, stroke weight)
        this.sceneManager.coral.createBezier(this.strokeColors, 2);

        //bounce edges
        bounceEdges(coralTips, (s) => {
            //change direction array on bounce
        }, 0, width);
        drawSprites(this.textGroup);
    }


    //Handle Mouse/Touch event
    this.cueCallback = (cue) => {
        if (this.currentCue != cue) {
            this.currentCue = cue;

            //make text appear on former video position
            this.currentLine++;
            this.textGroup.removeSprites();
            if (this.currentLine < this.sceneManager.textC.length) {
                const s = new TextSprite(this.mousePosition.x, this.mousePosition.y, 0, 0);
                s.setDraw(this.sceneManager.textC[this.currentLine]);
                s.setGroup(this.textGroup);
            }

            //see mousepress (mouse pos, panning, lightning)
            this.mousePress(random(width * 0.2, width* 0.8), random(10, height * 0.9));
            this.lightningStrength = (cue/this.sound.duration()) * 60;
        }
    }
    this.mousePress = (x, y) => {

        //update mouse position for div
        this.mousePosition.x = x;
        this.mousePosition.y = y;
        this.div.position(x - this.videoWidth/2, y - this.videoHeight/2);

        //sound panning
        const panning = map(x, 0., width,-1.0, 1.0);
        ramp(this.sound.getPan(), panning, 300, 5, (c) => {
            this.sound.pan(c);
        });
        //lightning background!
        this.lightning = true;
        setTimeout(() => { this.lightning = false }, 1000);
    }
    this.mousePressed = () => {this.mousePress(mouseX, mouseY)};
    this.touchStarted = () => {this.mousePress(mouseX, mouseY)};
}

