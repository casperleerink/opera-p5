function A() {
    this.strokeColors = [];
    this.directions = [];
    this.currentLine = -1;
    this.currentSprite;
    this.introText = true;
    this.soundBegin;
    this.soundDrone;
    this.soundClimax;
    this.soundExerpts = [
        {t: 17, d: 3.5}, 
        {t: 20, d: 2}, 
        {t: 23, d: 3},
        {t: 37, d: 2},
        {t: 46, d: 3},
        {t: 50, d: 3},
        {t: 58, d: 3},
        {t: 61.5, d: 5},
        {t: 69, d: 3},
        {t: 86, d: 2},      
    ];
    this.textSprite;
    this.extraBright = 0;
    this.gradient;
    this.gradientPos = -0.2 * height;

    // this.preload = () => {
        
    // }
    //SETUP
    this.setup = () => {
        //coral
        // this.sceneManager.coral.velocity(1);
        for (let i = 0; i < this.sceneManager.amount; i++) {
            this.strokeColors.push(color(random(0, 30), random(0, 120),random(0, 170) ));
            const s = this.sceneManager.coral.coralTips.get(i);
            this.directions.push(s.velocity.x);
        }
        //sound
        this.soundBegin = loadSound('https://res.cloudinary.com/casperleerink/video/upload/v1592244805/once-she-dries/part-a-begin.mp3');
        this.soundBegin.playMode('restart');
        this.soundDrone = loadSound('https://res.cloudinary.com/casperleerink/video/upload/v1592244805/once-she-dries/part-a-begin.mp3', () => {
            this.soundDrone.loop(0, 1/3, 0.3, 10);
            this.soundDrone.setVolume(0);
            this.soundDrone.setVolume(1, 1.0);
        })
        this.soundClimax = loadSound('assets/audio/marvel-at-her-majesty.mp3');
        this.soundClimax.onended(() => {
            this.soundClimax.disconnect();
            this.sceneManager.showScene( B, this.strokeColors);
        });
        this.gradient = createGraphics(width, height * 0.4);
        setGradientCashe(0, 0, width, height * 0.4, color(170), color(0), 1, this.gradient);
        if (this.sceneArgs) {
            ramp(-0.2 * height, 0.2 * height, 6000, 33, (c) => {
                this.gradientPos = c;
            });
            this.introText = false;
        } else {
            this.gradientPos = 0.2 * height;
        }
        //text
        this.textSprite = new TextSprite(0, height*0.5, 0, 0);


        //button for test version
        nextBtn.mousePressed(() => {
            this.soundBegin.stop();
            this.soundBegin.disconnect();
            this.soundDrone.stop();
            this.soundDrone.disconnect();
            this.soundClimax.stop();
            this.soundClimax.disconnect();
            this.sceneManager.showScene(B, this.strokeColors);
        });
    }


    //DRAW
    this.draw = () => {
        //clear and draw background
        clear();
        background(0);
        image(this.gradient, width * 0.5, this.gradientPos);
        // setGradient(0, 0, width, height * 0.4, color(170), color(0), 1);

        //Intro text
        if (this.introText) {
            push();
            fill(255);
            textSize(16);
            textAlign(CENTER);
            text("Turn up your volume to experience the sounds of coral...", width * 0.5, height * 0.4);
            text("Click anywhere to begin!", width * 0.5, height * 0.4 + 30);
            pop();
        }
        //variables
        const coralTips = this.sceneManager.coral.coralTips;
        coralTips.forEach((s) => {
            if (abs(s.velocity.x) > 1.3) {
                s.velocity.x = s.velocity.x * 0.99;
            }
            if (abs(s.velocity.x) < 1.1) {
                s.velocity.x = s.velocity.x * 1.01 + 0.001;
            }
        });
        //set alpha for lines
        //gradually change color
        for (let i = 0; i < this.strokeColors.length; i++) {
            const c = this.strokeColors[i];
            const r = red(c) + random([-1, 1]);
            const g = green(c) + random([-1, 1]);
            const b = blue(c) + random([-1, 1]);
            this.strokeColors[i] = color(r, g, b);
        }
        const currentColors = this.strokeColors.map((c) => {
            const r = red(c) + this.extraBright;
            const g = green(c) + this.extraBright;
            const b = blue(c) + this.extraBright;
            return color(r, g, b);
        });
        //create lines (color, stroke weight)
        this.sceneManager.coral.createBezier(currentColors, 2);

        this.sceneManager.coral.onHover((s) => {
            if (s.velocity.x !== 0) {
                s.velocity.x = 0;
            }
        }, (s) => {
            if (s.velocity.x === 0) {
                s.velocity.x = this.directions[coralTips.indexOf(s)];
            }
        });
        bounceEdges(coralTips, (s) => {
            //change direction array on bounce
            this.directions[coralTips.indexOf(s)] = s.velocity.x;
        }, width * 0.2, width * 0.8); //bounce back when at the edge

        if (this.currentSprite) {
            this.textSprite.update(this.currentSprite.position.x, this.currentSprite.position.y);
        }
    }
    
    this.mousePress = () => {
        if (!this.currentSprite) {
            this.introText = false;
        }
        this.currentLine++; //go to next line
        if (this.currentLine >= this.sceneManager.textA.length) {
            if (this.currentSprite) {
                this.soundDrone.setVolume(0, 1.0);
                setTimeout(() => {
                    this.soundDrone.stop();
                }, 1000);
                this.soundClimax.play();
            }
            this.currentSprite = null;
        } else {
            this.textSprite.setDraw(this.sceneManager.textA[this.currentLine]); //draw new line in textSprite
            this.currentSprite = this.sceneManager.coral.coralTips.get(this.currentLine); //set currentSprite according to the line

            //add temporary brightness to coral
            ramp(60, 0, 2000, 10, (c) => {
                this.extraBright = c;
            });

            //Play sound
            const soundExerpt = random(this.soundExerpts);
            // const soundExerpt = this.soundExerpts[this.currentLine];
            this.soundBegin.play(0, 1, 0, soundExerpt.t, soundExerpt.d);
            this.soundBegin.setVolume(0);
            this.soundBegin.setVolume(0.3, 0.9);
            this.soundBegin.setVolume(0, 0.3, soundExerpt.d - 0.1);
        }
    }
    this.mousePressed = () => {this.mousePress()};
    this.touchStarted = () => {this.mousePress()};
}

