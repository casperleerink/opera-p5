function B(p) {
    this.coral;
    this.gradient;
    this.cloud;
    this.startTime;
    this.songDuration;
    //SETUP
    this.setup = () => {
        this.coral = this.sceneManager.coral;
        this.gradient = this.sceneArgs.gradient;
        this.cloud = this.sceneManager.cloud;

        this.startTime = p.millis();
        //sound
        this.sound = p.loadSound("assets/audio/part-b-collapsed.mp3", () => {
            this.startTime = p.millis();
            this.sound.play();
            //make coral go to video one by one
            this.songDuration = this.sound.duration() * 1000;
            
        });
        this.sound.onended(() => {
            this.soundEnded = true;
        });
        
        


        // //button for test version
        // nextBtn.mousePressed(() => {
        //     this.sound.stop();
        //     this.sceneManager.showScene(C, this.strokeColors);
        // });
    }

    //DRAW
    this.draw = () => {
        //clear and draw background
        p.clear();
        p.background(0);
        //gradient image
        p.image(this.gradient, p.width * 0.5, p.height*0.2, p.width, p.height*0.4);
        
        const currentTime = p.millis();


        this.coral.drawB(p);


        //image related stuff
        const scale = 0.2;
        const img = this.sceneManager.cloud;
        const imgHeight = scale*img.height*p.width/img.width;
        if (this.imageFade < 255) {
            p.tint(255, this.imageFade);
        }
        p.image(img, 0.5*p.width, 20 + imgHeight/2, scale*p.width, imgHeight);
    }
}

export default B;