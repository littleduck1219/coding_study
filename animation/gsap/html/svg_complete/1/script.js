const t = gsap.to(".c1", {
    attr: {
        r: 250,
        cx: 600,
    },
    fill: "green",
    // scale: 3,
    duration: 3,
});

GSDevTools.create({ animation: t });
