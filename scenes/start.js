function A() {
    this.strokeColors = [];
    this.linesAmount = 0;

    //SETUP
    this.setup = () => {
        this.sceneManager.coral.velocity(1);
        for (let i = 0; i < this.sceneManager.amount; i++) {
            this.strokeColors.push(color(random(0, 30), random(0, 120),random(0, 170) ));
            const s = this.sceneManager.coral.coralTips.get(i);
            this.directions.push(s.velocity.x);
        }
        this.sound = this.sceneManager.audio[0];
        this.sound.onended(() => {
            if (this.currentLine >= this.sceneManager.textA.length-1) {
                this.sceneManager.showScene( B, this.strokeColors);
            }
        })
    }


    //DRAW
    this.draw = () => {
        //clear and draw background
        clear();
        background(0);

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
        //create lines (color, stroke weight)
        this.sceneManager.coral.createBezier(this.strokeColors, 2);

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
            push();
            noStroke();
            fill(255);
            textSize(16);
            textAlign(CENTER);
            text(this.sceneManager.textA[this.currentLine], this.currentSprite.position.x, this.currentSprite.position.y-10);
            pop();
        }
    }
}