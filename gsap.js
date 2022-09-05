class Utils {
  toArray(element) {
    return [].slice.call(element);
  }
  get(selector) {
    return document.querySelector(selector);
  }
}

(() => {
  let ready = false;
  let animationTimeout, transitionTimeout;

  const hideElements = () => {
    const seccondSection = get(".seccond");
    const thirdSection = get(".third");
    const first = get(".para_hero").children;
    const first1 = get(".hero_heading").children;
    const seccond = get(".seccond").children;
    const third = get(".third").children;
    gsap.to([first, seccond, third, first1], {
      autoAlpha: 0,
      duration: 0,
      y: 0,
    });
    gsap.to([seccondSection, thirdSection], {
      scale: 1,
    });
  };

  const animateIn = ({ currentIndex }) => {
    const { get } = new Utils();
    const firstSection = get(".first");
    const seccondSection = get(".seccond");
    const thirdSection = get(".third");
    const first = get(".para_hero").children;
    const first1 = get(".hero_heading").children;
    const seccond = get(".circle").children;
    const third = get(".third").children;
    if (currentIndex === 0) {
      gsap.from(first, {
        xPercent: 100,
        autoAlpha: 0,
        ease: "back(2)",
        duration: 1,
        y: 0,
      });
      gsap.from(first1, {
        xPercent: -100,
        autoAlpha: 0,
        ease: "back(2)",
        duration: 1,
      });
    }

    if (currentIndex === 1) {
      gsap.fromTo(
        seccond,
        { xPercent: -100, rotate: "0deg" },
        {
          xPercent: 100,
          rotate: "360deg",
        }
      );
      gsap.to(seccondSection, {
        scale: 1,
        ease: Power1,
        delay: 0.5,
      });
    }

    if (currentIndex === 2) {
      gsap.to(third, {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        ease: Power2,
      });
      gsap.to(thirdSection, {
        scale: 1,
        ease: Power1,
        delay: 0.5,
      });
    }
  };

  const animateOut = ({ currentIndex, direction }) => {
    const { get } = new Utils();
    const firstSection = get(".first");
    const seccondSection = get(".seccond");
    const thirdSection = get(".third");
    const first = get(".para_hero").children;
    const first1 = get(".hero_heading").children;
    const seccond = get(".seccond").children;
    const third = get(".third").children;

    if (direction === "down") {
      if (currentIndex === 0) {
        gsap.from(first, {
          autoAlpha: 1,
          xPercent: 0,
          duration: 0.5,
        });
        gsap.from(first1, {
          xPercent: 0,
          autoAlpha: 1,
          ease: "back(2)",
          duration: 1,
        });
      }

      if (currentIndex === 1) {
        gsap.to(seccond, {
          autoAlpha: 0,
          y: -200,
          duration: 0.5,
        });
        gsap.to(seccondSection, {
          scale: 1,
          ease: Power1,
          duration: 0.5,
        });
      }

      if (currentIndex === 2) {
        gsap.to(third, {
          autoAlpha: 0,
          y: -200,
          duration: 0.5,
        });
        gsap.to(thirdSection, {
          scale: 1,
          ease: Power1,
          duration: 0.5,
        });
      }
    } else {
      if (currentIndex === 0) {
        gsap.to(first, {
          autoAlpha: 0,
          xPercent: 0,
          duration: 0.5,
        });
        gsap.to(first1, {
          xPercent: 0,
          autoAlpha: 1,
          ease: "back(2)",
          duration: 1,
        });
      }

      if (currentIndex === 1) {
        gsap.to(seccond, {
          autoAlpha: 0,
          y: 200,
          duration: 0.5,
        });
        gsap.to(seccondSection, {
          scale: 1,
          ease: Power1,
          duration: 0.5,
        });
      }

      if (currentIndex === 2) {
        gsap.to(third, {
          autoAlpha: 0,
          y: 200,
          duration: 0.5,
        });
        gsap.to(thirdSection, {
          scale: 1,
          ease: Power1,
          duration: 0.5,
        });
      }
    }
  };

  const fullPage = new fullpage("#fullpage", {
    navigation: true,
    navigationPosition: "right",
    css3: true,
    afterLoad: function (origin, destination, direction) {
      animateIn({ currentIndex: destination.index });
    },
    onLeave: function (origin, nextIndex, direction) {
      if (ready) return;
      clearTimeout(animationTimeout);
      clearTimeout(transitionTimeout);

      animateOut({ currentIndex: origin.index, direction });
      animationTimeout = setTimeout(() => {
        ready = true;
        if (direction === "down") {
          fullpage_api.moveSectionDown();
        } else {
          fullpage_api.moveSectionUp();
        }
      }, 300);

      transitionTimeout = setTimeout(() => {
        ready = false;
      }, 300);

      return ready;
    },
  });
  const { toArray, get } = new Utils();
  hideElements();
})();
