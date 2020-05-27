function B() {
    this.strokeColors;
    this.directions = [];
    this.linesAmount = 0;
    this.currentLine = -1;
    this.currentSprite;
    this.mouseClickPos = {
        x: width/2,
        y: height/2,
    }
    this.videoFrame;
    //SETUP
    this.setup = () => {
        background(0);
        this.videoFrame = createElement("iframe");
        this.videoFrame.attribute("src","https://www.youtube.com/embed/kG9X9ZdRf0E?autoplay=1&controls=0&modestbranding=1");
        this.videoFrame.attribute("frameborder",0);
        // this.videoFrame.attribute("allow","accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
        this.videoFrame.position(0, windowHeight*0.25);
        this.videoFrame.size(560, 315);
        this.videoFrame.show();
        this.strokeColors = this.sceneArgs;
        for (let i = 0; i < this.sceneManager.amount; i++) {
            const s = this.sceneManager.coral.coralTips.get(i);
            this.directions.push(s.velocity.x);
            ramp(s.velocity.x, 0.4 * s.velocity.x, 5000, 10, (curr) => {
                s.velocity.x = curr;
            }, (curr) => {
                console.log("ramp finished!");
                
            });
        }
        
    }
    //DRAW
    this.draw = () => {
        //clear and draw background
        clear();
        background(0);

        //variables
        const coralTips = this.sceneManager.coral.coralTips;

        //set alpha for lines
        //gradually change color then change alpha when white
        for (let i = 0; i < this.strokeColors.length; i++) {
            const c = this.strokeColors[i];
            if (red(c) >= 255 && green(c) >= 255 && blue(c) >= 255) {
                c.setAlpha(20 + sin((frameCount + i*50)*0.03) * 128);
            } else {
                const r = red(c) + 1;
                const g = green(c) + 1;
                const b = blue(c) + 1;
                this.strokeColors[i] = color(r, g, b);
            }
        }
        //create lines (color, stroke weight)
        this.sceneManager.coral.createBezier(this.strokeColors, 2);

        this.sceneManager.coral.onHover((s) => {
            if (s.velocity.x !== 0) {
                s.velocity.x = 0;
            }
            s.addImage(this.sceneManager.abstract);
            s.scale = 0.08;
        }, (s) => {
            if (s.velocity.x === 0) {
                s.velocity.x = this.directions[coralTips.indexOf(s)];
                s.scale = 0.01;
            }
        });
        bounceEdges(coralTips, (s) => {
            //change direction array on bounce
            this.directions[coralTips.indexOf(s)] = s.velocity.x;
        }, width * 0.25, width * 0.75); //bounce back when at the edge
        drawSprites(coralTips);
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

    //when the mouse is pressed anywhere
    // this.mousePressed = () => {
    //     this.sceneManager.coral.setImg(this.sceneManager.abstract);
    // }
}