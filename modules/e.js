export default function E(p) {
  this.setup = () => {
    this.coral = this.sceneManager.coral;
    this.story = this.sceneManager.story;
    this.story.index = 0;
    this.story.pos = { x: -0.1, y: 0.5 };
    this.startTime = p.millis();

    //adjust boundaries
    this.coral.tips.forEach((tip) => {
      tip.boundaries = [0.25, 0.75];
    });

    //start playing the tune
    const sound = p.loadSound("assets/audio/soft-piano-tune.mp3", () => {
      sound.play();
    });
  };

  //DRAW
  this.draw = () => {
    //clear and draw background
    p.clear();
    p.background(0);
    const timeSinceStart = p.millis() - this.startTime;

    //DRAW CORAL
    if (timeSinceStart < 2000) {
      this.coral.tips.forEach((tip) => {
        tip.baseVel = (timeSinceStart / 2000) * 0.003 * (Math.random() * 0.1);
      });
    }
    this.coral.drawE(p);

    //STORY
    this.story.onceSheDries(p, 1);
  };
}
