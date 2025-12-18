const tl = gsap.timeline().to(".polygon", {
    attr: {
        points: "31 115 207 10 381 115 201 400",
    },
});

GSDevTools.create({ animation: tl });
