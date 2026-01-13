const tl = gsap
    .timeline()
    .from("ellipse", { scale: 0, transformOrigin: "50% 50%", stagger: 0.1 })
    .from("#text path", { scale: 0, transformOrigin: "50% 50%", stagger: 0.1 });

GSDevtools.create({ animation: tl });
