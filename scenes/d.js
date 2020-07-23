function D() {
    //coral vars
    this.strokeColors;
    this.bezierWeight = 2;
    this.yPos = [];
    this.pantheonColor = color(255);
    this.sound;
    this.gradientLeft;
    this.gradientRight;
    this.gradientPos = width * -0.2;
    this.setup = () => {
        //CANVAS setup
        // this.sceneManager.coral.velocity(0.7);
        this.gradientLeft = createGraphics(width * 0.4, height);
        this.gradientRight = createGraphics(width * 0.4, height);
        setGradientCashe(0, 0, width * 0.4, height, this.pantheonColor, color(0), 2, this.gradientLeft);
        setGradientCashe(0, 0, width * 0.4, height, color(0), this.pantheonColor, 2, this.gradientRight);
        this.strokeColors = this.sceneArgs;
        const coralTips = this.sceneManager.coral.coralTips;
        coralTips.forEach((s) => {
            this.yPos.push(random(height * 0.7, height * 0.97));
            s.velocity.x = random(0.8, 1.3) * random([-1, 1]);
        });

        this.sound = loadSound("assets/audio/part-d-skeletal.mp3", () => {
            ramp(width*-0.2, width*0.2, 10000, 33, (c) => {
                this.gradientPos = c;
            }, (c) => {
                this.sound.play();
            });
            this.sound.onended(() => {
                this.yPos = [];
                coralTips.forEach((s) => {
                    this.yPos.push(random(height * 0.2, height * 0.7));
                });
                ramp(width*0.2, width*-0.2, 4000, 33, (c) => {
                    this.gradientPos = c;
                }, () => {
                    this.sceneManager.showScene(E, this.strokeColors);
                });
            });
        }); //get sound
        
        ramp(2, 0.5, 8000, 50, (c) => {
            this.bezierWeight = c;
        });
    }

    //DRAW
    this.draw = () => {
        //clear and draw background
        clear();
        background(0);
        //gradient background (pantheon)
        image(this.gradientLeft, this.gradientPos, height*0.5);
        image(this.gradientRight, width - this.gradientPos, height*0.5);

        //variables
        const coralTips = this.sceneManager.coral.coralTips;
        //create lines (color, stroke weight)
        this.sceneManager.coral.createBezier(this.strokeColors, this.bezierWeight);

        //coral to yPos
        for (let i = 0; i < coralTips.length; i++) {
            const s = coralTips.get(i);
            s.velocity.y = (this.yPos[i] - s.position.y)/300;
        }
        //bounce edges
        bounceEdges(coralTips, (s) => {
            //change direction array on bounce
            // this.directions[coralTips.indexOf(s)] = s.velocity.x;
        }, this.gradientPos + width*0.15, (width * 0.85) - this.gradientPos);

        // drawSprites(coralTips);
    }
}

