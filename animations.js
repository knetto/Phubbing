// animations.js

// 1) Registreren van GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // Hulp‑functies voor animaties
  const showCard = (card, delayIndex = 0) => {
    card.style.display = 'flex';
    gsap.fromTo(card,
      { opacity: 0, height: 0 },
      {
        duration: 0.5,
        opacity: 1,
        height: 'auto',
        ease: 'power2.out',
        delay: delayIndex * 0.05,
        onComplete: () => card.style.height = '',
      }
    );
  };

  const hideCard = (card, delayIndex = 0) => {
    gsap.to(card, {
      duration: 0.4,
      opacity: 0,
      height: 0,
      ease: 'power2.in',
      delay: delayIndex * 0.03,
      onComplete: () => {
        card.style.display = 'none';
        card.style.height = '';
      }
    });
  };

  // 2) Header Animation (on load)
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

  // 3) Search Bar Animation (on load)
  gsap.from(".search-container", {
    duration: 0.8,
    opacity: 0,
    y: 20,
    ease: "power2.out",
    delay: 0.6
  });

  // 4‑8) ScrollTrigger‑animaties voor cards, intro, posters, footer…
  // (ongewijzigd tov jouw versie)
  gsap.utils.toArray("#leaderboard .card").forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: "top 85%" },
      duration: 0.8,
      scale: 0.9,
      opacity: 0,
      ease: "back.out(1.2)",
      delay: i * 0.1
    });
  });
  gsap.from("#toggleButton", {
    scrollTrigger: { trigger: "#cardsContainer", start: "bottom 90%" },
    duration: 0.6,
    y: 20,
    opacity: 0,
    ease: "power2.out"
  });
  gsap.from(".intro-text h2", {
    scrollTrigger: { trigger: ".intro-text", start: "top 80%" },
    duration: 0.8,
    x: -50,
    opacity: 0,
    ease: "power2.out"
  });
  gsap.from(".intro-text p", {
    scrollTrigger: { trigger: ".intro-text", start: "top 80%" },
    duration: 0.8,
    x: 50,
    opacity: 0,
    ease: "power2.out",
    stagger: 0.15
  });
  document.querySelectorAll('.intro-images img').forEach((img) => {
    gsap.from(img, {
      scrollTrigger: { trigger: img, start: "top 80%" },
      duration: 1,
      scale: 0.7,
      opacity: 0,
      ease: "back.out(1.7)"
    });
  });
  gsap.from("#posters h2", {
    scrollTrigger: { trigger: "#posters h2", start: "top 80%" },
    duration: 0.8,
    y: 30,
    opacity: 0,
    ease: "power2.out"
  });
  gsap.utils.toArray("#posters .poster-item").forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: { trigger: item, start: "top 85%" },
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: "power2.out",
      delay: index * 0.1
    });
  });
  gsap.from("footer", {
    scrollTrigger: { trigger: "footer", start: "top 90%" },
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power2.out"
  });

  // ─────────────────────────────────────────────────────────────────
  // Cards‑toggle & zoek‑logica met animaties
  const cardsContainer = document.getElementById('cardsContainer');
  const cards = Array.from(cardsContainer.children);
  const toggleBtn = document.getElementById('toggleButton');
  const searchInput = document.getElementById('searchInput');
  const VISIBLE_COUNT = 5;
  let expanded = false;

  // Visibility update (initieel vs. animatie)
  function updateVisibility(initial = false) {
    cards.forEach((card, i) => {
      const shouldShow = (i < VISIBLE_COUNT || expanded);
      if (shouldShow) {
        if (card.style.display === 'none') {
          if (initial) {
            card.style.display = 'flex';
          } else {
            showCard(card, i - VISIBLE_COUNT);
          }
        }
      } else {
        if (card.style.display !== 'none') {
          if (initial) {
            card.style.display = 'none';
          } else {
            hideCard(card, i - VISIBLE_COUNT);
          }
        }
      }
    });
    // Toggle‑knop updaten
    if (cards.length > VISIBLE_COUNT) {
      toggleBtn.style.display = 'block';
      toggleBtn.textContent = expanded ? 'Verberg ▲' : 'Zie meer ▼';
    } else {
      toggleBtn.style.display = 'none';
    }
  }

  // Initieel instellen (zonder animatie)
  updateVisibility(true);

  // Toggle button
  toggleBtn.addEventListener('click', () => {
    expanded = !expanded;
    updateVisibility(false);
  });

  // Search‑input met animatie
  searchInput.addEventListener('input', () => {
    const term = searchInput.value.trim().toLowerCase();
    const matching = cards.filter(card => {
      const name = card.querySelector('.name').textContent.toLowerCase();
      return name.includes(term);
    });

    cards.forEach(card => {
      const i = cards.indexOf(card);
      const inRange = expanded || i < VISIBLE_COUNT;
      const shouldShow = matching.includes(card) && inRange;
      if (shouldShow) {
        if (card.style.display === 'none') {
          showCard(card, 0);
        }
      } else {
        if (card.style.display !== 'none') {
          hideCard(card, 0);
        }
      }
    });

    // Toon/verberg toggle‑knop op basis van filter
    if (matching.length > VISIBLE_COUNT) {
      toggleBtn.style.display = 'block';
      toggleBtn.textContent = expanded ? 'Verberg ▲' : 'Zie meer ▼';
    } else {
      toggleBtn.style.display = 'none';
    }
  });

});
