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
            const s = createSprite(width * random(0.0, 1.0), height * random(0.2, 0.7), 6, 4);
            this.coralTips.add(s);
        }
    }

    
}