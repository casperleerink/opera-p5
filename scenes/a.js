function A() {
    this.strokeColors = [];
    this.directions = [];
    this.currentLine = -1;
    this.currentSprite;
    this.introText = true;
    this.sound;
    this.textSprite;
    this.extraBright = 0;
    //SETUP
    this.setup = () => {
        //coral
        this.sceneManager.coral.velocity(1);
        for (let i = 0; i < this.sceneManager.amount; i++) {
            this.strokeColors.push(color(random(0, 30), random(0, 120),random(0, 170) ));
            const s = this.sceneManager.coral.coralTips.get(i);
            this.directions.push(s.velocity.x);
        }
        //sound
        this.sound = this.sceneManager.audio[0];
        this.sound.onended(() => {
            if (this.currentLine >= this.sceneManager.textA.length-1) {
                this.sceneManager.showScene( B, this.strokeColors);
            }
        })

        //text
        this.textSprite = new TextSprite(0, height*0.5, 0, 0);
    }


    //DRAW
    this.draw = () => {
        //clear and draw background
        clear();
        background(0);


        //Intro text
        if (this.introText) {
            push();
            fill(255);
            textSize(16);
            textAlign(CENTER);
            text("Turn up your volume to experience the sounds of coral...", width * 0.5, 50);
            text("Click anywhere to begin!", width * 0.5, 100);
            pop();
        }
        //variables
        const coralTips = this.sceneManager.coral.coralTips;

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
            // drawGradient(s.position.x, s.position.y, color(255, 255, 255, 0), color(255, 200, 100, 200), 50);
        }, (s) => {
            if (s.velocity.x === 0) {
                s.velocity.x = this.directions[coralTips.indexOf(s)];
            }
        });
        bounceEdges(coralTips, (s) => {
            //change direction array on bounce
            this.directions[coralTips.indexOf(s)] = s.velocity.x;
        }, width * 0.2, width * 0.8); //bounce back when at the edge
        // drawSprites(coralTips);
        if (this.currentSprite) {
            // push();
            // noStroke();
            // fill(255);
            // textSize(16);
            // textAlign(CENTER);
            // text(this.sceneManager.textA[this.currentLine], this.currentSprite.position.x, this.currentSprite.position.y-10);
            // pop();
            this.textSprite.update(this.currentSprite.position.x, this.currentSprite.position.y);
        }
    }
    
    this.mousePress = () => {
        if (!this.currentSprite) {
            this.introText = false;
            // this.sound.play();
        }

        if (this.currentLine >= this.sceneManager.textA.length-1) {
            if (!this.sound.isPlaying()) {
                this.sceneManager.showScene( B, this.strokeColors);
            }
        } else {
            this.currentLine++; //go to next line
            this.textSprite.setDraw(this.sceneManager.textA[this.currentLine]); //draw new line in textSprite
            this.currentSprite = this.sceneManager.coral.coralTips.get(this.currentLine); //set currentSprite according to the line

            //add temporary brightness to coral
            ramp(60, 0, 2000, 10, (c) => {
                this.extraBright = c;
                
            }, (c) => {
                //do nothing
            });
        }
    }
    this.mousePressed = () => {this.mousePress()};
    this.touchStarted = () => {this.mousePress()};
}




class TextSprite {
    constructor(x, y, velX, velY) {
        this.s = createSprite(x, y, 1, 1);
        this.s.velocity.x = velX;
        this.s.velocity.y = velY;
    }

    setDraw(t) {
        this.s.draw = () => {
            push();
            fill(255);
            textSize(16);
            textAlign(CENTER);
            text(t, 0, -10);
            pop();
        }
        // this.s.debug = true;
    }
    update(x, y) {
        this.s.velocity.x = (x - this.s.position.x)/200;
        this.s.velocity.y = (y - this.s.position.y)/200;
        drawSprite(this.s);
    }
}