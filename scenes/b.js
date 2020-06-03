function B() {
    this.strokeColors;
    this.cloudPositions = [];
    this.linesAmount = 0;
    this.currentLine = -1;
    this.currentSprite;
    this.sound;
    this.imageFade = 0;
    this.gradient;
    this.gradientPos = height * 0.2;
    //SETUP
    this.setup = () => {
        background(0);
        this.gradient = createGraphics(width, height * 0.4);
        setGradientCashe(0, 0, width, height * 0.4, color(170), color(0), 1, this.gradient);
        this.strokeColors = this.sceneArgs;
        for (let i = 0; i < this.sceneManager.amount; i++) {
            const s = this.sceneManager.coral.coralTips.get(i);
            this.cloudPositions.push(random(-0.5, 0.5));
            ramp(s.velocity.x, 0.4 * s.velocity.x, 2000, 10, (curr) => {
                s.velocity.x = curr;
            });
        }

        //sound
        this.sound = this.sceneManager.audio[1]; //get sound
        this.sound.onended(() => {
            ramp(height * 0.2, height * -0.2, 2000, 50, (c) => {
                this.gradientPos = c;
            }, () => {
                this.sceneManager.showScene( C, this.strokeColors);
            });
        });
        const duration = this.sound.duration() * 1000;
        //fade in gif then play sound
        ramp(-255, 255, 10000, 10, (c) => {
            this.imageFade = c;
        }, (c) => {
            this.sound.play();
        });

        //make coral go to video one by one
        ramp(
            0, 
            this.sceneManager.amount, 
            duration, 
            500, 
            (c) => {
                //set the coral to move to the video
                this.currentSprite = this.sceneManager.coral.coralTips.get(Math.floor(c));
            }
        );
    }

    //DRAW
    this.draw = () => {
        //clear and draw background
        clear();
        background(0);
        image(this.gradient, width * 0.5, this.gradientPos);
        
        //variables
        const coralTips = this.sceneManager.coral.coralTips;

        //set alpha for lines
        //gradually change color then change alpha when white
        for (let i = 0; i < this.strokeColors.length; i++) {
            const c = this.strokeColors[i];
            if (Math.round(red(c)) === Math.round(green(c)) && Math.round(green(c)) === Math.round(blue(c))) {
                //colors are set, just edit alpha
                // c.setAlpha(128 + sin((frameCount + i*50)*0.01) * 128);
            } else {
                //on each draw turn the colors more towards greyscale
                const avg = (red(c) + green(c) + blue(c)) / 3;
                const r = red(c) - (red(c) - avg)/100;
                const g = green(c) - (green(c) - avg)/100;
                const b = blue(c) - (blue(c) - avg)/100;

                this.strokeColors[i] = color(r, g, b);
            }
        }
        //create lines (color, stroke weight)
        this.sceneManager.coral.createBezier(this.strokeColors, 2);

        //bounce edges
        bounceEdges(coralTips, (s) => {
            //change direction array on bounce
            this.directions[coralTips.indexOf(s)] = s.velocity.x;
        }, width * 0.2, width * 0.8);

        // drawSprites(coralTips);

        //image related stuff
        const scale = 0.2;
        const img = this.sceneManager.abstract;
        // img.filter(BLUR, 3);
        const imgHeight = scale*img.height*width/img.width;
        if (this.imageFade < 255) {
            tint(255, this.imageFade);
        }
        const imag = image(img, 0.5*width, 50 + imgHeight/2, scale*width, imgHeight);
        if (this.currentSprite) {
            this.currentSprite.velocity.x = (((width*0.5) + width*scale*this.cloudPositions[coralTips.indexOf(this.currentSprite)]) - this.currentSprite.position.x)/80;
            this.currentSprite.velocity.y = ((50 + imgHeight) - this.currentSprite.position.y)/60;
        }
    }
}