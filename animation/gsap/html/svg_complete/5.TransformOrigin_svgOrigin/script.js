const tween = gsap.to(".box", {
    rotation: 360,
    transformOrigin: "50% 50%",
    svgOrigin: "250px 250px",
    duration: 1,
});

GSDevTools.create({ animation: tween });
