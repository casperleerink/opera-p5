import {clip} from './util.js'
class Tip {
    constructor(p, x, y, baseVel) {
        this._pos = {x, y};
        this._bezierDeviation = p.random(-0.03, 0.03);
        this._baseVel = baseVel;
        this._color = [p.random(0, 255), p.random(0, 255), p.random(0, 255)];
        this._boundaries = [0.0, 1.0]
    }
    get pos() {
        return this._pos;
    }
    set pos(o) {
        this._pos = o;
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
    set boundaries(arr) {
        this._boundaries = arr;
    }

    bounceBoundaries() {
        if (this._pos.x >= this._boundaries[1] || this._pos.x <= this._boundaries[0]) {
            this._baseVel *= -1.0;
        }
    }
    move() {
        this.bounceBoundaries()
        this._pos.x += this._baseVel;
        this._pos.x = clip(this._pos.x, 0.0, 1.0);
    }

    follow(p, pos, speed) {
        this._baseVel = 0;
        const d = p.dist(this._pos.x, this._pos.y, pos.x, pos.y);
        const angle = p.atan2(pos.y-this._pos.y, pos.x-this._pos.x);
        const magnitude = d * speed;
        this._pos.x += p.cos(angle) * magnitude;
        this._pos.y += p.sin(angle) * magnitude;
    }

    moveAway(p, pos, speed) {
        const d = p.dist(this._pos.x, this._pos.y, pos.x, pos.y);
        if (d < speed) {
            const angle = p.atan2(pos.y-this._pos.y, pos.x-this._pos.x);
            const magnitude = (0.002 * speed) / d;
            this._pos.x -= p.cos(angle) * magnitude;
            if (this._pos.y < 0.7) {
                this._pos.y += magnitude *0.2; //pop pop!
            }
        }
    }

    draw(p, base, extra) {
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