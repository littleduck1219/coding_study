const tl = gsap.timeline({
    defaults: {
        duration: 1,
    },
});

tl.to("path", {
    attr: {
        d: "M 81.304 115.423 C 122.566 72.291 152.243 168.201 205.11 115.334 C 247.471 72.973 287.921 158.588 329.198 115.334",
    },
});

GSDevTools.create({ animation: tl });
