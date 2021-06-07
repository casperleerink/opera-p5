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
    const endingPageTimeline = () => {
      document.getElementById("creditsPage").style.display = "block";
      const tl = gsap.timeline({ delay: 1, defaults: { duration: 4 } });
      tl.to("#ending-text1", { opacity: 1 }, ">1");
      tl.to("#ending-text2", { opacity: 1 }, ">1");
      tl.to("#ending-text3", { opacity: 1 }, ">1");
      tl.to("#ending-text4", { opacity: 1 }, ">1");
      tl.to("#ending-text1", { opacity: 0 }, ">8");
      tl.to("#ending-text2", { opacity: 0 }, "<");
      tl.to("#ending-text3", { opacity: 0 }, "<");
      tl.to("#ending-text4", { opacity: 0 }, "<");
      tl.to("#ending-text5", { opacity: 1, duration: 5 }, "<");
      tl.to("#ending-text5", { opacity: 0, duration: 50 }, ">20");
    };
    endingPageTimeline();
    setTimeout(() => {
      const tl = gsap.timeline({ delay: 1, defaults: { duration: 4 } });
      tl.to("#credits1", { opacity: 1 }, ">10");
      tl.to("#credits2", { opacity: 1 }, ">10");
      tl.to("#credits3", { opacity: 1 }, ">10");
      tl.to("#credits4", { opacity: 1 }, ">10");
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
    this.coral.drawE(p);
  };
}
