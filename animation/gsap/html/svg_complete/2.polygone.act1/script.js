const tl = gsap.timeline({
    defaults: {
        duration: 1,
        ease: "power1.inOut",
    },
});

gsap.set(".line-2", { autoAlpha: 1 });

tl.to(".line-1", {
    attr: {
        x1: "50",
        y1: "200",
        x2: "350",
        y2: "200",
    },
    duration: 0.5,
});

tl.to(
    ".line-2",
    {
        attr: {
            x1: "50",
            y1: "200",
            x2: "350",
            y2: "200",
        },
        duration: 0.5,
    },

    "<"
);

tl.to(
    ".line-3",
    {
        attr: {
            x1: "50",
            y1: "200",
            x2: "350",
            y2: "200",
        },
        duration: 0.5,
    },
    "<"
);

tl.to(".line-1", {
    attr: {
        x1: "50.526",
        y1: "49.979",
        x2: "350.192",
        y2: "349.979",
    },
    ease: "bounce.out",
});

tl.set(".line-2", { autoAlpha: 0 }, "<");

tl.to(
    ".line-3",
    {
        attr: {
            x1: "50.192",
            y1: "349.979",
            x2: "350.192",
            y2: "49.979",
        },
        ease: "bounce.out",
    },
    "<"
);

GSDevTools.create({ animation: tl });
