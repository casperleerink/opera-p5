class Coral {
    constructor(amount) {
        this.baseX = width * 0.5;
        this.baseY = height;
        this.coralTips = Group();
        for (let i = 0; i < amount; i++) {
            //randomly create x and y end points for lines
            // yEnds.push(height * random(0.2, 0.7));
            // xEnds.push(width * random(0.0, 1.0));
            // xSpeed.push(random([0.001, -0.001])* width);
            const s = createSprite(width * random(0.25, 0.75), height * random(0.2, 0.7), 6, 4);
            s.setCollider("circle", 0, 0, 12);
            s.shapeColor = 127;
            this.coralTips.add(s);
        }
        // this.beziers = [];
    }

    velocity(vel) {
        for (let i = 0; i < this.coralTips.length; i++) {
            const s = this.coralTips.get(i);
            s.velocity.x = vel * random([1, -1]);
        }
    }
    setImg(img) {
        for (let i = 0; i < this.coralTips.length; i++) {
            const s = this.coralTips.get(i);
            s.addImage(img);
            s.scale = 0.05;
            
        }
    }
    onPress(callback) {
        this.coralTips.forEach((s) => {
            s.onMousePressed = () => {
                callback(s);
            };
        });
    }
    onRelease(callback) {
        this.coralTips.forEach((s) => {
            s.onMouseReleased = () => {
                callback(s);
            };
        });
    }
    createBezier(colors, weight) {
        push();
        noFill();
        strokeWeight(weight);
        //add
        for (let i = 0; i < this.coralTips.length; i++) {
            const s = this.coralTips.get(i);
            const b = new Bezier(this.baseX, this.baseY, s.position.x, s.position.y, colors[i]);
            b.update();
        }
        //update(draw) or remove
        // for (let i = 0; i < this.beziers.length; i++) {
        //     const b = this.beziers[i];
        //     if (b.lifespan <= 0.0) {
        //         this.beziers.splice(i, 1);
        //     } else {
        //         b.update();
        //     }
        // }
        pop();
    }

    onHover(hoverAction, returnAction) {
        for (let i = 0; i < this.coralTips.length; i++) {
            const s = this.coralTips.get(i);
            //absolute x and y distance between mouse and endpoint
            const dist = {
                x: abs(mouseX - s.position.x),
                y: abs(mouseY - s.position.y),
            }
            //if within distance perform action called by scene
            if (dist.x < 10 && dist.y < 10) {
                hoverAction(s);
            } else {
                returnAction(s);
            }
        }
    }

}



class Bezier {
    constructor(x1, y1, x2, y2, c) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.c = c;
        this.color = c;
        this.lifespan = 255;
    }

    update() {
        // this.color.setAlpha(this.lifespan);
        stroke(this.color);
        bezier(
            this.x1, 
            this.y1, 
            width * 0.3 + (this.x2 * 0.3), 
            this.y2 * 1.5, 
            width * 0.4 + (this.x2 * 0.2), 
            this.y2 * 1.2, 
            this.x2, 
            this.y2
        );
        this.lifespan -= 5;
    }
}