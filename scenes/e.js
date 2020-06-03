function E() {
    //coral vars
    this.strokeColors;
    this.bezierWeight = 0.5;
    this.sound;
    this.extraBright = 0;
    this.text;
    this.currentLine = 0;
    this.soundStarts = [
        {t: 31.5, d: 2}, 
        {t: 37, d: 2},
        {t: 42, d: 4},
        {t: 52, d: 2},
    ];
    this.soundEnded = false;
    this.setup = () => {
        //CANVAS setup
        console.log("E!");
        // this.sceneManager.coral.velocity(0.7);
        this.strokeColors = this.sceneArgs;
        const coralTips = this.sceneManager.coral.coralTips;
        coralTips.forEach((s) => {
            // s.velocity.x = random(0.8, 1.1) * random([-1, 1]);
            s.velocity.y = 0;
        });

        this.sound = this.sceneManager.audio[4]; //get sound
        this.sound.playMode('restart');
        // this.sound.play();
        // this.sound.addCue(10.11, this.changeBezierWeight);
        // this.sound.onended(() => {
        //     console.log("The end!");
        // });

        //TEXT
        this.text = this.sceneManager.textE;

        // this.sceneManager.coral.onPress(this.currentLine, () => {
        //     this.currentLine++;
        //     this.sceneManager.coral.draw(this.currentLine, this.textFn());
        // });
    }

    //DRAW
    this.draw = () => {
        //clear and draw background
        clear();
        background(0);

        //variables
        const coralTips = this.sceneManager.coral.coralTips;
        coralTips.forEach((s) => {
            s.velocity.x = s.velocity.x * 0.993;
        });

        const currentColors = this.strokeColors.map((c) => {
            const r = red(c) + this.extraBright * 0.2;
            const g = green(c) + this.extraBright * 0.9;
            const b = blue(c) + this.extraBright;
            return color(r, g, b);
        });
        //create lines (color, stroke weight)
        // console.log(currentColors, this.bezierWeight);
        
        this.sceneManager.coral.createBezier(currentColors, this.bezierWeight);

        //bounce edges
        bounceEdges(coralTips, (s) => {
            //change direction array on bounce
            // this.directions[coralTips.indexOf(s)] = s.velocity.x;
        }, width * 0.2, width * 0.8);

        if (this.currentLine < this.sceneManager.textE.length) {
            this.sceneManager.coral.draw(this.currentLine, this.textFn);
            drawSprite(coralTips.get(this.currentLine));
        }
    }
    this.mousePress = () => {
        //add temporary brightness to coral
        ramp(200, 0, 1000, 33, (c) => {
            this.extraBright = c;
        });
        ramp(0.8, 0.5, 1000, 33, (c) => {
            this.bezierWeight = c;
        });
        const coralTips = this.sceneManager.coral.coralTips;
        let enoughVel = true;
        coralTips.forEach((s) => {
            s.velocity.x = s.velocity.x * 2;
            if (abs(s.velocity.x) < 20) {
                enoughVel = false;
            }
            
        });
        if (this.currentLine >= this.sceneManager.textE.length && enoughVel) {
            console.log("Congrats!");
            // this.sound.stop();
            this.sceneManager.showScene(A, true);
            
        }
        if (this.currentLine < this.sceneManager.textE.length) {
            const soundExerpt = random(this.soundStarts);
            // const soundExerpt = this.soundStarts[3];
            this.sound.play(0, 1, 0, soundExerpt.t, soundExerpt.d);
            this.sound.setVolume(0);
            this.sound.setVolume(1, 0.1);
            this.sound.setVolume(0, 0.3, soundExerpt.d - 0.3);
            this.currentLine++;
        }
    }
    this.mousePressed = () => {this.mousePress()};
    this.touchStarted = () => {this.mousePress()};

    this.textFn = () => {
        fill(255);
        text(this.text[this.currentLine], 0, -5);
    }

    this.changeBezierWeight = () => {
        // ramp(0.5, width, 8000, 33, (c) => {
        //     this.bezierWeight = c;
        // });
        this.soundEnded = true;
        console.log("Sound ended!");
        
    }
}

