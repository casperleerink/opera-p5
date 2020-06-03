class Coral {
    constructor(amount) {
        this.baseX = width * 0.5;
        this.baseY = height;
        this.coralTips = Group();
        this.bezierDeviations = [];
        for (let i = 0; i < amount; i++) {
            //randomly create x and y end points for lines
            // yEnds.push(height * random(0.2, 0.7));
            // xEnds.push(width * random(0.0, 1.0));
            // xSpeed.push(random([0.001, -0.001])* width);
            const s = createSprite(width * random(0.25, 0.75), height * random(0.2, 0.7), 6, 4);
            s.setCollider("circle", 0, 0, 12);
            s.shapeColor = 127;
            this.coralTips.add(s);
            this.bezierDeviations.push(random(-20, 20));
        }
        // this.beziers = [];
    }

    velocity(vel) {
        for (let i = 0; i < this.coralTips.length; i++) {
            const s = this.coralTips.get(i);
            s.velocity.x = vel * random([1, -1]);
            s.velocity.y = 0;
        }
    }
    setImg(img) {
        for (let i = 0; i < this.coralTips.length; i++) {
            const s = this.coralTips.get(i);
            s.addImage(img);
            s.scale = 0.05;
            
        }
    }
    onPress(i, callback) {
        const s = this.coralTips.get(i);
        s.onMousePressed = () => {
            typeof callback === "function" && callback(s);
        };
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
            const b = new Bezier(this.baseX, this.baseY, s.position.x, s.position.y, colors[i], this.bezierDeviations[i]);
            b.update();
        }
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

    draw(i, callback) {
        const s = this.coralTips.get(i);
        s.draw = () => {
            typeof callback === "function" && callback(s);
        }
    }

}



class Bezier {
    constructor(x1, y1, x2, y2, c, deviation) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.c = c;
        this.color = c;
        this.lifespan = 255;
        this.deviation = deviation;
    }

    update(mult) {
        // this.color.setAlpha(this.lifespan);
        const m = mult ? mult : 0.6;
        stroke(this.color);
        bezier(
            this.x1, 
            this.y1,
            ((this.x2 - this.x1) * 0.1 + this.x1) + this.deviation,
            (this.y1 - this.y2) * 0.9 + this.y2, 
            ((this.x2 - this.x1) * m + this.x1) + this.deviation,
            (this.y1 - this.y2) * 0.15 + this.y2, 
            this.x2, 
            this.y2
        );
        this.lifespan -= 5;
    }
}

class TextSprite {
    constructor(x, y, velX, velY) {
        this.s = createSprite(x, y, 1, 1);
        this.s.velocity.x = velX;
        this.s.velocity.y = velY;
    }

    setGroup(g) {
        g.add(this.s);
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