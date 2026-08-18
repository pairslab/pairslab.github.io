(() => {
  const body = document.body;
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const setHeaderState = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 20);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  if (nav && navToggle) {
    const toggleLabel = navToggle.querySelector(".sr-only");

    const setNavState = (open) => {
      nav.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      if (toggleLabel) toggleLabel.textContent = open ? "Close navigation" : "Open navigation";
      body.classList.toggle("nav-open", open);
    };

    navToggle.addEventListener("click", () => {
      setNavState(navToggle.getAttribute("aria-expanded") !== "true");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setNavState(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setNavState(false);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 920) setNavState(false);
    });
  }

  const heroSlider = document.querySelector("[data-hero-slider]");
  if (heroSlider) {
    const slides = Array.from(heroSlider.querySelectorAll("[data-hero-slide]"));
    const dots = Array.from(heroSlider.querySelectorAll("[data-hero-dot]"));
    const previous = heroSlider.querySelector("[data-hero-prev]");
    const next = heroSlider.querySelector("[data-hero-next]");
    const toggle = heroSlider.querySelector("[data-hero-toggle]");
    const toggleLabel = heroSlider.querySelector("[data-hero-toggle-label]");
    let currentIndex = 0;
    let timer;
    let userPaused = false;

    const stopTimer = () => {
      window.clearTimeout(timer);
      timer = undefined;
    };

    const showSlide = (requestedIndex) => {
      currentIndex = (requestedIndex + slides.length) % slides.length;
      slides.forEach((slide, index) => slide.classList.toggle("is-active", index === currentIndex));
      dots.forEach((dot, index) => {
        if (index === currentIndex) {
          dot.setAttribute("aria-current", "true");
        } else {
          dot.removeAttribute("aria-current");
        }
      });
    };

    const syncToggle = () => {
      if (!toggle || !toggleLabel) return;
      const motionBlocked = reducedMotion.matches;
      toggle.disabled = motionBlocked;
      toggleLabel.textContent = motionBlocked ? "Manual" : userPaused ? "Play" : "Pause";
      toggle.setAttribute(
        "aria-label",
        motionBlocked ? "Automatic slideshow disabled by reduced motion preference" : userPaused ? "Play campus slideshow" : "Pause campus slideshow",
      );
    };

    const scheduleNext = () => {
      stopTimer();
      if (slides.length < 2 || userPaused || reducedMotion.matches || document.hidden) return;
      timer = window.setTimeout(() => {
        showSlide(currentIndex + 1);
        scheduleNext();
      }, 6500);
    };

    const selectSlide = (index) => {
      showSlide(index);
      scheduleNext();
    };

    previous?.addEventListener("click", () => selectSlide(currentIndex - 1));
    next?.addEventListener("click", () => selectSlide(currentIndex + 1));
    dots.forEach((dot) => {
      dot.addEventListener("click", () => selectSlide(Number(dot.dataset.heroDot)));
    });
    toggle?.addEventListener("click", () => {
      if (reducedMotion.matches) return;
      userPaused = !userPaused;
      syncToggle();
      scheduleNext();
    });

    document.addEventListener("visibilitychange", scheduleNext);
    reducedMotion.addEventListener?.("change", () => {
      syncToggle();
      scheduleNext();
    });

    showSlide(0);
    syncToggle();
    scheduleNext();
  }

  const revealItems = Array.from(document.querySelectorAll(".reveal"));
  if (revealItems.length) {
    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    } else {
      document.documentElement.classList.add("motion-ready");
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -48px", threshold: 0.1 },
      );
      revealItems.forEach((item) => revealObserver.observe(item));
    }
  }

  const researchVideos = Array.from(document.querySelectorAll("[data-research-video], [data-research-loop]"));
  if (!researchVideos.length) return;

  const loadVideo = (video) => {
    if (video.dataset.loaded === "true") return;
    video.querySelectorAll("source[data-src]").forEach((source) => {
      source.src = source.dataset.src;
    });
    video.dataset.loaded = "true";
    video.load();
  };

  const pauseVideo = (video, reset = false) => {
    video.pause();
    if (reset) video.currentTime = 0;
  };

  const videoObserver = "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const video = entry.target;
            video.dataset.inView = String(entry.isIntersecting);
            if (entry.isIntersecting && !reducedMotion.matches && !document.hidden) {
              loadVideo(video);
              video.play().catch(() => {});
            } else {
              pauseVideo(video);
            }
          });
        },
        { rootMargin: "120px 0px", threshold: 0.2 },
      )
    : null;

  researchVideos.forEach((video) => {
    if (reducedMotion.matches) {
      pauseVideo(video, true);
    } else if (videoObserver) {
      videoObserver.observe(video);
    } else {
      loadVideo(video);
      video.play().catch(() => {});
    }
  });

  document.addEventListener("visibilitychange", () => {
    researchVideos.forEach((video) => {
      if (document.hidden) {
        pauseVideo(video);
      } else if (video.dataset.inView === "true" && !reducedMotion.matches) {
        loadVideo(video);
        video.play().catch(() => {});
      }
    });
  });

  reducedMotion.addEventListener?.("change", () => {
    researchVideos.forEach((video) => {
      if (reducedMotion.matches) {
        pauseVideo(video, true);
      } else if (video.dataset.inView === "true") {
        loadVideo(video);
        video.play().catch(() => {});
      }
    });
  });
})();
