const tl = gsap.timeline({
    defaults: {
        duration: 1,
        // elastic은 목표값을 "넘어서" 튕기는(overshoot) 특성이 있음
        // 농구공처럼 목표 지점에 닿고 그 안에서 튕기려면 bounce가 자연스러움
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
    ease: "power2.out", // 마지막은 튕김 없이
});

GSDevTools.create({ animation: tl });
