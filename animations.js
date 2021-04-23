function title() {
  const tl = gsap.timeline({
    delay: 2,
  });

  tl.to("#title", { opacity: 1, duration: 5 });
  tl.to("#title", { opacity: 0, duration: 3 }, ">3");
  return tl;
}

function poem1() {
  const tl = gsap.timeline({ delay: 1, defaults: { duration: 2 } });
  tl.to("#div2p1", { opacity: 1 });
  tl.to("#div2p2", { opacity: 1 });
  tl.to("#div2p3", { opacity: 1 });
  tl.to("#div2p4", { opacity: 1 });

  tl.to("#div2p1", { opacity: 0 });
  tl.to("#div2p2", { opacity: 0 }, "<");
  tl.to("#div2p3", { opacity: 0 }, "<");
  tl.to("#div2p4", { opacity: 0 }, "<");
  return tl;
}

function poem2() {
  const tl = gsap.timeline({ delay: 1, defaults: { duration: 2 } });
  tl.to("#div3p1", { opacity: 1 });
  tl.to("#div3p2", { opacity: 1 });
  tl.to("#div3p3", { opacity: 1 });
  tl.to("#div3p4", { opacity: 1 });

  tl.to("#div3p1", { opacity: 0 });
  tl.to("#div3p2", { opacity: 0 }, "<");
  tl.to("#div3p3", { opacity: 0 }, "<");
  tl.to("#div3p4", { opacity: 0 }, "<");
  return tl;
}

function science() {
  const tl = gsap.timeline({ delay: 2, defaults: { duration: 2 } });
  tl.to("#div4p1", { opacity: 1 });
  tl.to("#div4p2", { opacity: 1 }, ">3");
  tl.to("#div4p3", { opacity: 1 }, ">8");
  tl.to("#div4p4", { opacity: 1 }, ">8");
  tl.to("#div4p5", { opacity: 1 }, ">7");

  tl.to("#div4p1", { opacity: 0 }, ">3");
  tl.to("#div4p2", { opacity: 0 }, "<");
  tl.to("#div4p3", { opacity: 0 }, "<");
  tl.to("#div4p4", { opacity: 0 }, "<");
  tl.to("#div4p5", { opacity: 0 }, "<");
  return tl;
}

function generalInfo() {
  const tl = gsap.timeline({
    delay: 2,
  });

  tl.to("#generalInfo", { opacity: 1, duration: 3 });
  tl.to("#generalInfo", { opacity: 0, duration: 3 }, ">25");
  return tl;
}

function showInstructions() {
  document.getElementById("instructions").style.display = "block";
  gsap.to("#instructions", { opacity: 1, duration: 2 });
}

var master = gsap.timeline({ onComplete: showInstructions });
master.add(title()).add(poem1()).add(poem2()).add(science()).add(generalInfo());
