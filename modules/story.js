class Story {
    constructor(p) {
        this._index = 0;
        this._pos = {x:0.5, y:0.5}
        this._a = p.loadStrings('assets/textA.txt');
        this._c = p.loadStrings('assets/textC.txt');
        this._e = p.loadStrings('assets/textE.txt');
        this._brightness = 180;
    }
    get index() {
        return this._index;
    }
    set index(i) {
        this._index = i;
    }
    get pos() {
        return this._pos;
    }
    set pos(o) {
        this._pos = o;
    }
    get brightness() {
        return this._brightness;
    }
    set brightness(i) {
        this._brightness = i;
    }
    get a() {
        return this._a;
    }
    get c() {
        return this._c;
    }
    get e() {
        return this._e;
    }


    follow(p, pos, speed) {
        const d = p.dist(this._pos.x, this._pos.y, pos.x, pos.y);
        const angle = p.atan2(pos.y-this._pos.y, pos.x-this._pos.x);
        const magnitude = d * speed;
        this._pos.x += p.cos(angle) * magnitude;
        this._pos.y += p.sin(angle) * magnitude;
    }

    drawA(p) {
        if (this._a.length > 0) {
            p.push();
            p.noStroke();
            p.fill(255, this._brightness);
            p.textSize(p.width * 0.015);
            p.text(this._a[this._index], this._pos.x * p.width, this._pos.y * p.height);
            p.pop();
        }
    }

    withinDist(p, x, y) {
        const distX = Math.abs(x - this._pos.x) * p.width;
        const distY = Math.abs(y - this._pos.y);
        const textWidth = p.textWidth(this._a[this.index]);
        if (distX < textWidth*0.5 && distY < 0.02) {
            return true;
        } else {
            return false;
        }
    }

    onClick(p, x, y, callback) {
        if (this.withinDist(p, x, y)) {
            typeof callback === "function" && callback();
        }
    }
    onHover(p, x, y, on, off) {
        if (this.withinDist(p, x, y)) {
            this._brightness = 255;
            typeof on === "function" && on();
        } else {
            this._brightness = 180;
            typeof off === "function" && off();
        }
    }
}

export default Story;