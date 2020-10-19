class Tip {
    constructor(p, x, y, baseVel) {
        this._pos = {x, y};
        this._bezierDeviation = p.random(-0.03, 0.03);
        this._baseVel = baseVel;
        this._color = [p.random(0, 255), p.random(0, 255), p.random(0, 255)];
        this._boundaries = {
            x: [0.0, 1.0],
            y: [0.0, 1.0]
        }
    }
    get pos() {
        return this._pos;
    }
    get baseVel() {
        return this._baseVel;
    }
    set baseVel(f) {
        this._baseVel = f;
    }

    get color() {
        return this._color;
    }
    set color(c) {
        this._color = c;
    }
    get boundaries() {
        return this._boundaries;
    }

    bounceBoundaries() {
        if (this._pos.x > 1.0 || this._pos.x < 0.0) {
            this._baseVel *= -1.0;
        }
    }
    move() {
        this.bounceBoundaries()
        this._pos.x += this._baseVel;
    }

    draw(p, base, extra) {
        this.move();
        if (extra > 1) {
            const color = [...this._color];
            color[0] += extra;
            color[1] += extra;
            color[2] += extra;
            p.stroke(color);
        } else {
            p.stroke(this._color);
        }
        p.bezier(
            base.x * p.width,
            base.y * p.height,
            (((this._pos.x - base.x) * 0.1 + base.x) + this._bezierDeviation) * p.width,
            ((base.y - this._pos.y) * 0.9 + this._pos.y) * p.height, 
            (((this._pos.x - base.x) * 0.6 + base.x) + this._bezierDeviation) * p.width,
            ((base.y - this._pos.y) * 0.15 + this._pos.y) * p.height, 
            this._pos.x * p.width, 
            this._pos.y * p.height,
        );
    }
}

export default Tip;