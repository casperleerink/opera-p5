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
    const sound = new Howl({
      src: ["assets/audio/soft-piano-tune.mp3"],
      html5: true,
      autoplay: true,
      loop: false,
      onend: () => {
        this.sound.unload();
        this.soundEnded = p.millis();
        gsap.to("#creditsPage", { opacity: 0, duration: 10 });
      },
    });
    // const sound = p.loadSound("assets/audio/soft-piano-tune.mp3", () => {
    //   sound.play();
    // });
    setTimeout(() => {
      document.getElementById("creditsPage").style.display = "block";
      const tl = gsap.timeline({ delay: 1, defaults: { duration: 4 } });
      tl.to("#credits1", { opacity: 1 }, ">5");
      tl.to("#credits2", { opacity: 1 }, ">5");
      tl.to("#credits3", { opacity: 1 }, ">5");
      tl.to("#credits4", { opacity: 1 }, ">5");
    }, 40000);
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
    if (timeSinceStart < 40000) {
      //show ending text
      this.story.drawDEnd(p, timeSinceStart);
      const thickness = (timeSinceStart / 40000) * 2 + 1;
      p.strokeWeight(thickness);
    }
    this.coral.drawE(p);

    //STORY
    if (timeSinceStart > 20000) {
      this.story.onceSheDries(p, timeSinceStart - 20000);
    }
  };
}
