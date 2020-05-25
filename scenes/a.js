function A() {
    this.draw = () => {
        //all sprites bounce at the screen side edges (only x needed)
        for(let i=0; i<allSprites.length; i++) {
            const s = allSprites[i];
            if(s.position.x<0) {
            s.position.x = 1;
            s.velocity.x = abs(s.velocity.x);
            }
    
            if(s.position.x>width) {
            s.position.x = width-1;
            s.velocity.x = -abs(s.velocity.x);
            }
        }
        drawSprites(points);
    }
}