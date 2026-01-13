const tl = gsap.timeline().from("polygon", {
    attr: { points: "50.206 450.155 50 450 250 450 450 450 450 450" },
    duration: 1,
    ease: "bounce",
});

GSDevtools.create({ animation: tl });
