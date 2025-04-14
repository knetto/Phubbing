// Register the ScrollTrigger plugin with GSAP.
gsap.registerPlugin(ScrollTrigger);

/* Header Animation (on load) */
// A more subtle entrance for the header text
gsap.from("header h1", {
  duration: 0.8,
  y: -30,
  opacity: 0,
  ease: "power2.out"
});
gsap.from("header p", {
  duration: 0.8,
  y: 30,
  opacity: 0,
  ease: "power2.out",
  delay: 0.3
});

/* Intro Section Animations (trigger on scroll) */
// Animate the intro text heading
gsap.from(".intro-text h2", {
  scrollTrigger: {
    trigger: ".intro-text",
    start: "top 80%"
  },
  duration: 0.8,
  x: -50,
  opacity: 0,
  ease: "power2.out"
});
// Animate paragraphs in intro text with a slight stagger effect
gsap.from(".intro-text p", {
  scrollTrigger: {
    trigger: ".intro-text",
    start: "top 80%"
  },
  duration: 0.8,
  x: 50,
  opacity: 0,
  ease: "power2.out",
  stagger: 0.15
});

// Animate each image individually so that if both are visible they animate at the same time,
// but if one is offscreen it will animate upon scrolling into view.
document.querySelectorAll('.intro-images img').forEach(img => {
  gsap.from(img, {
    scrollTrigger: {
      trigger: img,
      start: "top 80%"
    },
    duration: 1,
    scale: 0.7,
    opacity: 0,
    ease: "back.out(1.7)"
  });
});

/* Nadelen Section Animations (trigger on scroll) */
// Animate the section heading for the "Nadelen" part
gsap.from("#nadelen h2", {
  scrollTrigger: {
    trigger: "#nadelen h2",
    start: "top 80%"
  },
  duration: 0.8,
  y: 30,
  opacity: 0,
  ease: "power2.out"
});

// Animate each list item separately when coming into view
gsap.utils.toArray("#nadelen li").forEach((item, index) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: "top 80%"
    },
    duration: 0.8,
    y: 30,
    opacity: 0,
    ease: "power2.out",
    delay: index * 0.2
  });
});
