function End() {
    this.strokeColors = [];
    this.directions = [];
    this.currentSprite;
    this.demoText = true;
    this.textSprite;
    this.extraBright = 0;

    //SETUP
    this.setup = () => {
        //coral
        // this.sceneManager.coral.velocity(1);
        for (let i = 0; i < this.sceneManager.amount; i++) {
            const s = this.sceneManager.coral.coralTips.get(i);
            this.directions.push(s.velocity.x);
        }
        this.strokeColors = this.sceneArgs;
        //text
        this.textSprite = new TextSprite(0, height*0.5, 0, 0);
    }


    //DRAW
    this.draw = () => {
        //clear and draw background
        clear();
        background(0);

        //Text
        if (this.demoText) {
            push();
            fill(255);
            textSize(20);
            textAlign(CENTER);
            text("Once She Dries", width * 0.5, height * 0.4);
            textSize(16);
            text("Thank you for watching", width * 0.5, height * 0.4 + 30);
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
        //create lines (color, stroke weight)
        this.sceneManager.coral.createBezier(this.strokeColors, 2);

        bounceEdges(coralTips, (s) => {
            //change direction array on bounce
        }, width * 0.2, width * 0.8); //bounce back when at the edge

        if (this.currentSprite) {
            this.textSprite.update(this.currentSprite.position.x, this.currentSprite.position.y);
        }
    }
}

