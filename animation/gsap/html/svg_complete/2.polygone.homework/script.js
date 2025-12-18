const tl = gsap.timeline({
    defaults: {
        duration: 1,
        ease: "bounce.out",
    },
    repeat: -1,
    repeatDelay: 0.15,
});

tl.to(".line", {
    attr: { points: "100 200 200 200 300 200" },
});
tl.to(".line", {
    attr: { points: "100 200 200 350 300 200" },
});
tl.to(".line", {
    attr: { points: "200 200 200 90 200 200" },
    ease: "power2.out",
    duration: 0.1,
});

GSDevTools.create({ animation: tl });
