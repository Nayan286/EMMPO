/** lenis plugin **/

function lenisPlugin() {
  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}

/** web jump stop code **/

function setRealViewportHeight() {
  const vh = window.visualViewport
    ? window.visualViewport.height
    : window.innerHeight;

  document.documentElement.style.setProperty("--real-vh", `${vh}px`);
}

window.visualViewport?.addEventListener("resize", setRealViewportHeight);
window.addEventListener("resize", setRealViewportHeight);

/** Global Variables **/

let pageTransitionDuration = 0.5;
let clicked = 0;
let catalogIndex = 0;
let questionIndex = 0;
let quizQuextionTransitionDuration = 0.2;
let handlerName = false;
let handlerEmailId = false;
let homeLoaderAnimate = false;
let tl = gsap.timeline({
  default: {
    duration: 0.4,
    ease: "power2.inOut",
  },
});

/** userInfo storage **/

let userInfo = {
  username: "",
  email: "",
};

function setUserInfo() {
  let userObj = localStorage.setItem("userinfo", JSON.stringify(userInfo));
  const userName = JSON.parse(localStorage.getItem("userinfo"));
  PageTransitionBTn("userinfo");
}

/** arrays & objects **/

const page3ImageArray = [
  "images/generated-image (9).png",
  "images/generated-image (10).png",
  "images/generated-image (11).png",
  "images/generated-image (12).png",
  "images/generated-image (13).png",
];

const catalogContentsArray = [
  {
    CourseName: "sustainable wardrobe",
    CourseType: "data analytics course",
    CourseImage: "images/generated-image (27).png",
    CourseVideo: "videos/video2.mp4",
  },
  {
    CourseName: "skincare",
    CourseType: "machine learning course",
    CourseImage: "images/generated-image (28).png",
    CourseVideo: "videos/video3.mp4",
  },
  {
    CourseName: "air pollution",
    CourseType: "data analytics course",
    CourseImage: "images/generated-image (29).png",
    CourseVideo: "videos/video4.mp4",
  },
  {
    CourseName: "green ecosystem",
    CourseType: "virtual reality course",
    CourseImage: "images/generated-image (30).png",
    CourseVideo: "videos/video5.mp4",
  },
];

const quizQuestionsArray = [
  {
    id: 1,
    question: "What kind of thing do you enjoy doing the most?",
    image: "images/Gemini_Generated_Image_3hdiqc3hdiqc3hdi.png",
    options: [
      "Cracking puzzles and figuring things out",
      "Creating things that look cool and engaging",
      "Organizing work in a neat and well-planned way",
      "Exploring and playing around with new ideas",
    ],
  },
  {
    id: 2,
    question: "How do you usually pick up something new?",
    image: "images/Gemini_Generated_Image_3w6rhs3w6rhs3w6r.png",
    options: [
      "Jumping in and trying it myself",
      "Watching how others do it",
      "Following clear steps one by one",
      "Reading, researching, and understanding it deeply",
    ],
  },
  {
    id: 3,
    question: "What really keeps you motivated at work?",
    image: "images/Gemini_Generated_Image_961kg0961kg0961k.png",
    options: [
      "Improving my skills and getting better at what I do",
      "Knowing that my work helps other people",
      "Building something stable that lasts over time",
      "Having the freedom to explore and experiment",
    ],
  },
  {
    id: 4,
    question: "When you face a challenge, what do you usually do?",
    image: "images/Gemini_Generated_Image_fsnclfsnclfsnclf.png",
    options: [
      "Break it down and solve it step by step",
      "Look for a smart or creative alternative",
      "Stay calm and keep moving forward",
      "Adapt quickly and learn along the way",
    ],
  },
  {
    id: 5,
    question: "What kind of work environment suits you best?",
    image: "images/Gemini_Generated_Image_ih8f7qih8f7qih8f.png",
    options: [
      "A fast-paced and energetic setup",
      "A quiet and focused space",
      "A collaborative team-based environment",
      "An independent, self-driven setup",
    ],
  },
  {
    id: 6,
    question: "How do you naturally tend to think?",
    image: "images/Gemini_Generated_Image_ljsamhljsamhljsa.png",
    options: [
      "In terms of numbers, logic, and clear reasoning",
      "Through visuals, layouts, and imagery",
      "From a big-picture, long-term perspective",
      "By focusing on details and accuracy",
    ],
  },
  {
    id: 7,
    question: "What matters most to you in a career?",
    image: "images/Gemini_Generated_Image_nvu18dnvu18dnvu1.png",
    options: [
      "Feeling valued and recognized for my work",
      "Learning and growing continuously",
      "Maintaining a healthy work-life balance",
      "Being challenged and pushed to improve",
    ],
  },
  {
    id: 8,
    question: "How do you generally look at the future?",
    image: "images/Gemini_Generated_Image_q2r8e8q2r8e8q2r8.png",
    options: [
      "With clear plans and defined goals",
      "With curiosity and excitement",
      "With confidence in my abilities",
      "With flexibility and readiness for change",
    ],
  },
  {
    id: 9,
    question: "How do you usually make important decisions?",
    image: "images/Gemini_Generated_Image_unxp3sunxp3sunxp.png",
    options: [
      "By thinking things through carefully",
      "By trusting my instincts",
      "By discussing options with others",
      "By trying things out and adjusting as I go",
    ],
  },
  {
    id: 10,
    question: "What kind of impact do you want your work to have?",
    image: "images/Gemini_Generated_Image_y7i0ify7i0ify7i0.png",
    options: [
      "Producing clear and measurable results",
      "Helping people or teams succeed",
      "Improving systems or processes",
      "Creating something meaningful and lasting",
    ],
  },
];

const backgroundColorArray = [
  "#9C8CFF",
  "#8C97FF",
  "#7EA0D6",
  "#6FA6A9",
  "#91B391",
  "#D69A88",
  "#7546ff",
];

const careerRoles = [
  "Visual Designer",
  "UX Researcher",
  "Content Creator",
  "Creative Strategist",
  "Experience Designer",
  "Illustrator / Digital Artist",
  "Game Designer",
  "Creative Director",
  "Product Designer",
  "Independent Creator",
];

const differentPageLinksArray = [
  "index.html",
  "home.html",
  "courses.html",
  "quiz.html",
  "catalog shown.html",
  "https://www.instagram.com/nayanthakare31/",
  "https://www.linkedin.com/in/nayan-thakare-b8450b335/",
  "https://github.com/Nayan286",
];

const paraContentArray = [];

/** web loaders function **/

function quizLoader() {
  let quizLoader = document.querySelector(".quiz-loader");
  let quizLoaderText = document.querySelector(".quiz-loader .quiz-loader-text");
  let quizLoaderH2Span = document.querySelectorAll(
    ".quiz-loader .quiz-loader-text h2 span",
  );
  let quizLoaderH3 = document.querySelector(
    ".quiz-loader .quiz-loader-text h3",
  );
  let tl = gsap.timeline({ paused: true });
  let quizLoaderBall = document.querySelector(".quiz-loader .quiz-loader-ball");
  let ballMoveValue =
    window.innerWidth <= 600
      ? quizLoaderText?.getBoundingClientRect().left -
        quizLoaderBall?.getBoundingClientRect().width / 2 +
        15
      : quizLoaderText?.getBoundingClientRect().left -
        quizLoaderBall?.getBoundingClientRect().width / 4;

  tl.to(quizLoaderBall, {
    x: ballMoveValue,
    onComplete: () => {
      tl.to(
        quizLoaderBall,
        {
          x: `+=${quizLoaderText?.getBoundingClientRect().width + (window.innerWidth <= 600 ? quizLoaderBall?.getBoundingClientRect().width / 1.2 : quizLoaderBall?.getBoundingClientRect().width - 5)}`,
          y: quizLoaderText?.getBoundingClientRect().height / 6,
          scale: 0.15,
        },
        "same",
      );
      tl.to(
        quizLoaderH2Span,
        {
          y: "0%",
          stagger: 0.05,
          ease: "back.out(2)",
        },
        "same",
      );
      tl.to(
        quizLoaderH3,
        {
          y: "0%",
        },
        "same",
      );
      tl.to(quizLoader, {
        opacity: 0,
        pointerEvents: "none",
        delay: 0.5,
      });
    },
  });

  window.addEventListener("load", function () {
    tl.play();
  });
}

function homeloader() {
  let homeLoader = document.querySelector(".home-loader");
  let homePageContent = document.querySelector(".page1 .page1-content");
  let homeBgImage = document.querySelector(".page1 .page1-img img");
  let homeLoaderText = document.querySelector(
    ".home-loader .home-loader-content .home-loader-text",
  );
  let homeLoaderCountDown = document.querySelector(
    ".home-loader .home-loader-content .home-loader-text .loader-countdown h2",
  );
  let homeNavbar = document.querySelector(".home-navbar");
  let bottomNavbar = document.querySelector(".bottom-nav");
  let homeHeadTopH1Span = document.querySelectorAll(
    ".page1 .page1-content .page1-top .main-head .main-head-top h1 span",
  );
  let homeHeadBottomH1Span = document.querySelectorAll(
    ".page1 .page1-content .page1-top .main-head .main-head-bottom h2 span",
  );
  let homeBottomH3Span = document.querySelectorAll(
    ".page1 .page1-content .page1-bottom h3 span",
  );
  let countdown = 0;
  let tl = gsap.timeline({
    default: {
      duration: 0.4,
      ease: "power4.inOut",
    },
  });

  if (
    document.title === "Emmpo - Home" ||
    document.title === "Emmpo - Courses" ||
    document.title === "Emmpo | sustainable wardrobe" ||
    document.title === "Emmpo | air pollution" ||
    document.title === "Emmpo | skincare" ||
    document.title === "Emmpo | green ecosystem"
  )
    return;

  function homeLoaderTimeline() {
    tl.to(homeLoaderText, {
      opacity: 0,
      pointerEvents: "auto",
      duration: 1,
    });
    tl.to(homeLoader, {
      opacity: 0,
      display: "none",
    });
    if (window.innerWidth > 600) {
      tl.to(homeBgImage, {
        scale: 1,
        duration: 1,
      });
    }
    tl.to(homePageContent, {
      opacity: 1,
      pointerEvents: "auto",
      duration: 0,
      ease: "none",
    });
    if (
      !homeNavbar.classList.contains("catalog-navbar") ||
      !homeNavbar.classList.contains("courses-navbar")
    ) {
      tl.to(
        homeNavbar,
        {
          top: 0,
        },
        "same1",
      );
    }
    if (!bottomNavbar.classList.contains("courses-bottom-nav")) {
      tl.to(
        bottomNavbar,
        {
          bottom: 0,
        },
        "same1",
      );
    }
    tl.from(
      homeHeadTopH1Span,
      {
        y: "-100%",
        stagger: 0.08,
      },
      "same2",
    );
    tl.from(
      homeHeadBottomH1Span,
      {
        y: "-100%",
        stagger: 0.08,
      },
      "same2",
    );
    tl.from(
      homeBottomH3Span,
      {
        y: "-100%",
        stagger: 0.02,
      },
      "same2",
    );
  }

  window.addEventListener("load", function () {
    let page1 = document.querySelector(".page1");
    if (performance.getEntriesByType("navigation")[0].type === "reload") {
      page1?.scrollIntoView({ behavior: "smooth" });
    }

    let interval = setInterval(() => {
      if (countdown < 100) {
        countdown++;
        if (homeLoaderCountDown) {
          homeLoaderCountDown.textContent = countdown;
        }
      } else {
        homeLoaderTimeline();
        clearInterval(interval);
      }
    }, 10);
  });
}

function yellowLoaderAnimation() {
  let yellowLoader = document.querySelectorAll(".yellow-loader");

  if (yellowLoader.length === 0) return;

  window.addEventListener("load", function () {
    setTimeout(
      () => {
        if (performance.getEntriesByType("navigation")[0].type === "reload") {
          document.querySelector(".main")?.scrollIntoView();
        }
      },
      pageTransitionDuration,
      1000,
    );
    gsap.to(yellowLoader, {
      top: "100%",
      duration: 0.4,
      ease: "power1.inOut",
      delay: pageTransitionDuration * 2,
      onComplete: () => {
        if (yellowLoader.length === 0) return;
        gsap.to(yellowLoader, {
          display: "none",
        });
      },
    });
  });
}

/** main function **/

function breakTextFirstLevel() {
  let breakTextLevelFirsts = document.querySelectorAll(
    ".break-text-first-level",
  );

  if (breakTextLevelFirsts.length === 0) return;

  breakTextLevelFirsts.forEach((breakTextLevelFirst) => {
    let breakTextLevelFirstTextcontent = breakTextLevelFirst.textContent;
    let breakTextLevelFirstSplitTexts =
      breakTextLevelFirstTextcontent.split("");

    breakTextLevelFirst.innerHTML = "";
    breakTextLevelFirstSplitTexts.forEach((breakTextLevelFirstSplitText) => {
      let span = document.createElement("span");
      span.textContent =
        breakTextLevelFirstSplitText === " "
          ? "\u00A0"
          : breakTextLevelFirstSplitText;
      breakTextLevelFirst.appendChild(span);
    });
  });
}

function classListStyleAdding() {
  if (window.innerWidth <= 600) {
    let coursesBtn = document.querySelectorAll(
      ".home-navbar .courses-page-btn h2",
    );

    coursesBtn.forEach((courseBtn) => {
      courseBtn.textContent = courseBtn.classList.contains("home-btn")
        ? "home"
        : "courses";

      courseBtn.innerHTML = courseBtn.textContent
        .split("")
        .map((ch) => `<span>${ch}</span>`)
        .join("");

      const spans = courseBtn.querySelectorAll("span");
      spans.forEach((span) => {
        span.style.display = "inline-block";
        span.style.textTransform = "uppercase";
        span.style.fontSize = "6vw";
        span.style.lineHeight = "1";
        span.style.mixBlendMode = "difference";
      });
    });
  }

  let catalogNavbars = document.querySelectorAll(".catalog-navbar");

  catalogNavbars?.forEach((catalogNavbar) => {
    catalogNavbar.style.backgroundColor = "transparent";
    catalogNavbar?.querySelectorAll("span").forEach((catalogNavbarSpan) => {
      catalogNavbarSpan.style.color = "#fff";
    });
  });
}

function textHoverAnimation() {
  let textHoverParents = document.querySelectorAll(".text-hover-parent");

  textHoverParents.forEach((parent) => {
    let textHoverBtns = parent.querySelectorAll(".text-hover-btn span");
    if (!textHoverBtns.length) return;

    gsap.set(textHoverBtns, { y: "0%" });

    let tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.4, ease: "power4.out" },
    });

    tl.to(textHoverBtns, {
      y: "-100%",
      stagger: parent.classList.contains("anchor") ? 0.005 : 0.02,
    });

    parent.addEventListener("mouseenter", () => tl.play());
    parent.addEventListener("mouseleave", () => tl.reverse());
  });
}

function page3ImageGallery() {
  const careers = document.querySelectorAll(
    ".page3 .page3-career-explore .career",
  );
  const page3BgImg = document.querySelector(".page3 .page3-bg-img img");

  careers.forEach((career, index) => {
    career.addEventListener("click", function () {
      gsap.from(page3BgImg, {
        scale: 1.2,
        duration: 1,
        ease: "expo.out",
        onUpdate: () => {
          let currentIndex = index;
          page3BgImg.src = page3ImageArray[currentIndex];
        },
      });

      if (window.innerWidth <= 600) return;
      careers.forEach((item) => {
        const texts = item.querySelectorAll("span, h3");
        gsap.to(texts, {
          color: "#fff",
          duration: 0.2,
          overwrite: "auto",
          ease: "power2",
        });
      });

      const activeTexts = this.querySelectorAll("span, h3");

      gsap.to(activeTexts, {
        color: "#f8fe23",
        duration: 0.2,
        ease: "power2",
      });
    });
  });
}

function pageScrollAnimations() {
  function page7PinAnimation() {
    const page7PinSection = document.querySelector(".page7-pin-section");
    const cards = document.querySelectorAll(
      ".page7-pin-section .page7-card-pin .page7-cards .card",
    );
    const page7Cards = document.querySelector(
      ".page7-pin-section .page7-card-pin .page7-cards",
    );
    const bottomNavbar = document.querySelector(".bottom-nav");
    const footer = document.querySelector(".footer");
    let bottomNavTrigger = window.innerWidth >= 600 ? page7PinSection : footer;

    if (!page7PinSection || footer.classList.contains(".courses-footer"))
      return;

    gsap.to(bottomNavbar, {
      y: "100%",
      duration: 0.3,
      ease: "power4.out",
      scrollTrigger: {
        trigger: bottomNavTrigger,
        start: "top bottom",
        scrub: 2,
      },
    });

    if (window.innerWidth <= 600) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: page7PinSection,
        start: "top top",
        end: "+=200%",
        scrub: 2,
        pin: page7PinSection,
      },
    });

    tl.from(
      page7Cards,
      {
        x: "100%",
      },
      "same",
    );

    tl.from(
      cards,
      {
        rotate: 0,
      },
      "same",
    );
  }

  function page2ScrollAnimation() {
    let page2Head = document.querySelector(".page2 .page2-head");
    let page2HeadImg = document.querySelector(
      ".page2 .page2-head .page2-head-img",
    );
    let page2QuizSection = document.querySelector(".page2 .page2-quiz-section");
    let page2Content = document.querySelector(".page2 .page2-content");
    let page2ImgSection = document.querySelector(".page2 .page2-img-section");
    let yPercentage = window.innerWidth >= 600 ? "-200%" : "-100%";

    gsap.from(page2Head?.querySelectorAll(".career-title h2 span"), {
      y: "-100%",
      transform: "rotateX(-90deg)",
      duration: 0.8,
      stagger: 0.05,
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: page2Head,
        start: "top 80%",
      },
    });

    gsap.from(page2HeadImg, {
      y: "-100%",
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: page2HeadImg,
        start: "top 50%",
      },
    });

    gsap.from(page2ImgSection?.querySelectorAll(".img"), {
      opacity: 0,
      y: yPercentage,
      duration: 2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: page2ImgSection,
        start: "top 70%",
      },
    });

    gsap.from(page2Content?.querySelector(".tape-img1"), {
      y: "-100%",
      x: "-100%",
      opacity: 0,
      stagger: 1,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: page2QuizSection,
        start: "top 80%",
      },
    });

    gsap.from(page2Content?.querySelector(".tape-img2"), {
      y: "-100%",
      x: "100%",
      opacity: 0,
      stagger: 1,
      duration: 1,
      delay: 0.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: page2QuizSection,
        start: "top 80%",
      },
    });
  }

  function page3ScrollAnimation() {
    let page3Head = document.querySelector(".page3 .page3-content .page3-head");

    gsap.from(page3Head?.querySelectorAll("h2 span"), {
      y: "-100%",
      transform: "rotateX(-90deg)",
      duration: 0.8,
      stagger: 0.05,
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: page3Head,
        start: "top 80%",
      },
    });
  }

  function page4ScrollAnimation() {
    let page4Head = document.querySelector(".page4 .page4-content .page4-head");
    let page4ImgCards = document.querySelector(
      ".page4 .page4-img .page4-img-cards",
    );

    gsap.from(page4Head?.querySelectorAll("h2 span"), {
      y: "-100%",
      transform: "rotateX(-90deg)",
      duration: 0.8,
      stagger: 0.05,
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: page4Head,
        start: "top 80%",
      },
    });

    if (window.innerWidth <= 600) return;

    gsap.from(page4ImgCards?.querySelectorAll(".page4-card"), {
      y: "-200%",
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: page4ImgCards,
        start: "top 70%",
      },
    });
  }

  function page5ScrollAnimation() {
    let page5Head = document.querySelector(".page5 .page5-content .page5-head");
    let page5ImgSection = document.querySelector(
      ".page5 .page5-content .page5-img-section",
    );
    let page5Bottom = document.querySelector(
      ".page5 .page5-content .page5-bottom",
    );

    gsap.from(page5Head?.querySelectorAll("h2 span"), {
      y: "-100%",
      transform: "rotateX(-90deg)",
      duration: 0.8,
      stagger: 0.05,
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: page5Head,
        start: "top 80%",
      },
    });

    gsap.from(page5Bottom?.querySelectorAll("h2 span"), {
      y: "-100%",
      transform: "rotateX(-90deg)",
      duration: 0.8,
      stagger: 0.05,
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: page5Bottom,
        start: "top 80%",
      },
    });

    if (window.innerWidth <= 600) return;

    gsap.from(page5ImgSection?.querySelectorAll(".page5-img .person-item"), {
      y: "-200%",
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: page5ImgSection,
        start: "top 70%",
      },
    });
  }

  function page6ScrollAnimation() {
    let page6Head = document.querySelector(".page6 .page6-content .page6-head");
    let page6Tape = document.querySelector(".page6 .page6-content .page6-tape");
    let socialHandelHead = document.querySelector(".social-handle-head");
    let xPercentage = window.innerWidth >= 600 ? 5 : 10;

    gsap.from(page6Head?.querySelectorAll(".page6-subhead h3 span"), {
      y: "-100%",
      transform: "rotateX(-90deg)",
      duration: 0.5,
      stagger: 0.03,
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: page6Head,
        start: "top 80%",
      },
    });

    gsap.from(page6Head?.querySelectorAll(".page6-heading h2 span"), {
      y: "-100%",
      transform: "rotateX(-90deg)",
      duration: 0.8,
      stagger: 0.02,
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: page6Head,
        start: "top 80%",
      },
    });

    gsap.to(page6Tape?.querySelector(".horizontal-tape1"), {
      y: "-10%",
      x: `${xPercentage}%`,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: page6Tape,
        start: "top bottom",
        end: "bottom 50%",
        scrub: 2,
      },
    });

    gsap.to(page6Tape?.querySelector(".horizontal-tape2"), {
      y: "-10%",
      x: `-${xPercentage}%`,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: page6Tape,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    });

    if (socialHandelHead?.classList.contains("courses-social-handle")) return;

    gsap.from(socialHandelHead?.querySelectorAll("h2 span"), {
      y: "-100%",
      transform: "rotateX(90deg)",
      duration: 0.8,
      stagger: 0.03,
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: socialHandelHead,
        start: "top bottom",
      },
    });
  }

  function footerScrollAnimation() {
    let copyRightSectionBottom = document.querySelector(
      ".footer .footer-content .copyright-section .copyright-bottom",
    );
    let footer = document.querySelector(".footer");

    if (footer?.classList.contains("courses-footer")) return;

    gsap.from(copyRightSectionBottom?.querySelectorAll("h2 span"), {
      y: "-100%",
      transform: "rotateX(-90deg)",
      duration: 0.8,
      stagger: 0.03,
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: copyRightSectionBottom,
        start: "top bottom",
      },
    });
  }

  page7PinAnimation();
  page2ScrollAnimation();
  page3ScrollAnimation();
  page4ScrollAnimation();
  page5ScrollAnimation();
  page6ScrollAnimation();
  footerScrollAnimation();
}

function formInputClickAnimation() {
  let formInputs = document.querySelectorAll(
    ".footer .footer-content form .footer-form .input",
  );
  let inputs = document.querySelectorAll(
    ".footer .footer-content form .footer-form .input input",
  );

  let clicked = null;

  formInputs.forEach((formInput, index) => {
    formInput.addEventListener("click", function (e) {
      e.stopPropagation();

      inputs.forEach((input) => {
        if (input.value !== "") return;
        formInputs.forEach((input) => {
          let inputLabel = input.querySelectorAll("label");
          gsap.to(inputLabel, {
            y: "0%",
            fontSize: window.innerWidth >= 600 ? "1.1vw" : "4.2vw",
            duration: 0.4,
            ease: "power4",
          });
        });
      });

      let label = this.querySelector("label");

      gsap.to(label, {
        y: "-50%",
        fontSize: window.innerWidth >= 600 ? "0.8vw" : "2.8vw",
        duration: 0.4,
        ease: "power4",
      });

      if (index === 2) return;
      gsap.to(label, {
        y: "-90%",
        fontSize: window.innerWidth >= 600 ? "0.8vw" : "2.8vw",
        duration: 0.4,
        ease: "power4",
      });

      clicked = this;
    });
  });

  if (clicked) return;

  document.body.addEventListener("click", function (dets) {
    if (dets.target.classList.contains("input")) return;
    formInputs.forEach((input) => {
      let inputLabel = input.querySelectorAll("label");
      inputs.forEach((input) => {
        if (input.value !== "") return;
        gsap.to(inputLabel, {
          y: "0%",
          fontSize: window.innerWidth >= 600 ? "1.1vw" : "4.2vw",
          duration: 0.4,
          ease: "power4",
        });
      });
    });
  });

  clicked = null;
}

function currentYearDisplay() {
  let currentYear = document.querySelector(
    ".footer .footer-content .copyright-section .copyright-right .current-year",
  );
  let newYear = new Date();

  if (!currentYear) return;
  currentYear.textContent = newYear.getFullYear();
}

function pageTransitionAnimation() {
  let div = document.createElement("div");
  div.classList.add("page-transition-section");
  document.body.prepend(div);

  if (!div) return;

  let pageTransitionSection = document.querySelector(
    ".page-transition-section",
  );

  let tl = gsap.timeline({
    ease: "power4.out",
  });

  tl.to(pageTransitionSection, {
    display: "block",
  });

  if (window.getComputedStyle(pageTransitionSection).top === "100%") {
    tl.to(pageTransitionSection, {
      top: "0%",
      duration: pageTransitionDuration,
    });
  }

  tl.to(pageTransitionSection, {
    top: "-100%",
    delay: pageTransitionDuration,
    duration: pageTransitionDuration,
  });

  setTimeout(() => {
    div.remove();
  }, pageTransitionDuration * 4000);
}

function clickEventAnimation() {
  function mobileMenuClick() {
    let mobileMenuOpener = document.querySelectorAll(".mobile-menu-opener");
    let mobileMenuBtns = document.querySelectorAll(".home-navbar .mobile-menu");
    let mobileMenuQuizBtns = document.querySelectorAll(
      ".mobile-menu-quiz-btn",
    );

    if (mobileMenuBtns.length === 0) return;

    mobileMenuBtns.forEach((mobileMenuBtn) => {
      mobileMenuBtn.addEventListener("click", function () {
        if (clicked === 0) {
          clicked = 1;
          gsap.to(mobileMenuOpener, {
            opacity: 1,
            pointerEvents: "auto",
            duration: 0.2,
            ease: "power1.inOut",
          });
        } else {
          clicked = 0;
          gsap.to(mobileMenuOpener, {
            opacity: 0,
            pointerEvents: "none",
            duration: 0.2,
            ease: "power1.inOut",
          });
        }
      });
    });

    if (mobileMenuQuizBtns.length === 0) return;
    mobileMenuQuizBtns?.forEach((mobileMenuQuizBtn) => {
      mobileMenuQuizBtn.addEventListener("click", function () {
        gsap.to(mobileMenuOpener, {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.2,
          ease: "power1.inOut",
        });
        clicked = 0;
      });
    });
  }

  mobileMenuClick();

  function clickToScrollAnimation() {
    let scrollToBtns = document.querySelectorAll(".scroll-to-btn");
    let mobileMenuAnchors = document.querySelectorAll(
      ".mobile-menu-opener .mobile-menu-content .mobile-menu-anchors h2",
    );
    let mobileMenu = document.querySelector(".mobile-menu-opener");

    if (scrollToBtns.length === 0) return;

    mobileMenuAnchors?.forEach((mobileMenuAnchor) => {
      mobileMenuAnchor?.addEventListener("click", function () {
        gsap.to(mobileMenu, {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.2,
          ease: "power1.inOut",
        });
        clicked = 0;
      });
    });

    scrollToBtns.forEach((scrollToBtn) => {
      scrollToBtn?.addEventListener("click", function (dets) {
        pageTransitionAnimation();

        if (this.classList.contains("catalog-anchor-btn")) return;
        gsap.to(window, {
          scrollTo: {
            y: dets.target.dataset.scrollto,
            offsetY: window.innerHeight / 100,
          },
          delay: pageTransitionDuration * 2,
          ease: "power4.out",
        });
      });
    });
  }

  clickToScrollAnimation();
}

function catalogPlay() {
  let catalogPlayBtn = document.querySelector(
    ".catalog-content-shown .catalog-content-box .courses-item1 .catalog-image .catalog-play-btn",
  );
  let catalogImage = document.querySelector(
    ".catalog-content-shown .catalog-content-box .courses-item1 .catalog-image",
  );
  let catalogVideo = document.querySelector(
    ".catalog-content-shown .catalog-content-box .courses-item1 .catalog-video video",
  );
  let catalogChangeBtns = document.querySelector(
    ".catalog-content-shown .catalog-content-box .catalog-changing-btns",
  );
  let catalogVideoControlBtns = document.querySelector(
    ".catalog-content-shown .catalog-content-box .video-control-btns",
  );
  let catalogCloseBtn = document.querySelector(
    ".catalog-content-shown .catalog-close-btn",
  );
  let catalogBox = document.querySelector(
    ".catalog-content-shown .courses-catalog-box",
  );
  let homeNavbar = document.querySelector(".home-navbar");
  let pauseBtn = document.querySelector(".control-pause-btn");
  let playBtn = document.querySelector(".control-play-btn");
  let muteBtn = document.querySelector(".control-mute-btn");
  let unmuteBtn = document.querySelector(".control-unmute-btn");

  if (!catalogPlayBtn) return;
  catalogPlayBtn.addEventListener("click", function () {
    gsap.to(catalogPlayBtn, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0.3,
      onComplete: () => {
        catalogImage.style.transform = "translateY(-100%)";
        catalogVideo.play();
        catalogVideo.loop = true;
        catalogChangeBtns.style.opacity = 0;
        catalogChangeBtns.style.pointerEvents = "none";
        catalogVideoControlBtns.style.opacity = 1;
        catalogVideoControlBtns.style.pointerEvents = "auto";
        homeNavbar.style.transform = "translateY(-100%)";
        catalogCloseBtn.style.transform = "translateX(calc(0% + 2rem))";
        if (window.innerWidth > 600) return (catalogBox.style.scale = 1.2);
      },
    });
  });

  if (!catalogCloseBtn) return;
  catalogCloseBtn.addEventListener("click", function () {
    gsap.to(catalogCloseBtn, {
      xPercent:
        window.innerWidth > 600
          ? catalogCloseBtn.offsetWidth + 64
          : catalogCloseBtn.offsetWidth + 48,
      duration: 0.3,
      onComplete: () => {
        catalogImage.style.transform = "translateY(0%)";
        catalogVideo.pause();
        catalogVideo.loop = true;
        catalogChangeBtns.style.opacity = 1;
        catalogChangeBtns.style.pointerEvents = "auto";
        catalogVideoControlBtns.style.opacity = 0;
        catalogVideoControlBtns.style.pointerEvents = "none";
        homeNavbar.style.transform = "translateY(0%)";
        if (window.innerWidth > 600) return (catalogBox.style.scale = 1);
        catalogPlayBtn.style.opacity = 1;
        catalogPlayBtn.style.pointerEvents = "auto";
        if (catalogVideo.paused) {
          gsap.to(playBtn, {
            y: "100%",
            duration: 0.4,
            onComplete: () => {
              pauseBtn.style.transform = "translateY(0%)";
            },
          });
        }
      },
    });
  });

  if (!playBtn || !pauseBtn) return;
  pauseBtn.addEventListener("click", function () {
    gsap.to(pauseBtn, {
      y: "100% + 20px",
      duration: 0.4,
      onComplete: () => {
        playBtn.style.transform = "translateY(calc(-100% - 20px))";
        catalogVideo.pause();
      },
    });
  });
  playBtn.addEventListener("click", function () {
    gsap.to(playBtn, {
      y: "100%",
      duration: 0.4,
      onComplete: () => {
        pauseBtn.style.transform = "translateY(0%)";
        catalogVideo.play();
      },
    });
  });

  if (!muteBtn || !unmuteBtn) return;
  muteBtn.addEventListener("click", function () {
    gsap.to(muteBtn, {
      y: "100% + 20px",
      duration: 0.4,
      onComplete: () => {
        unmuteBtn.style.transform = "translateY(calc(-100% - 20px))";
        catalogVideo.muted = true;
      },
    });
  });
  unmuteBtn.addEventListener("click", function () {
    gsap.to(unmuteBtn, {
      y: "100%",
      duration: 0.4,
      onComplete: () => {
        muteBtn.style.transform = "translateY(0%)";
        catalogVideo.muted = false;
      },
    });
  });
}

function catalogChanging() {
  let catalogPrevBtn = document.querySelector(".catalog-previous-btn");
  let catalogNextBtn = document.querySelector(".catalog-next-btn");
  let catalogVideo = document.querySelector(
    ".catalog-content-shown .catalog-content-box .courses-item1 .catalog-video video",
  );
  let catalogImage = document.querySelector(
    ".catalog-content-shown .catalog-content-box .courses-item1 .catalog-image",
  );
  let catalogName = document.querySelector(
    ".catalog-content-shown .catalog-content-box .courses-item2 h2",
  );
  let catalogCourseName = document.querySelector(
    ".catalog-content-shown .catalog-content-box .courses-item2 h3",
  );
  let catalogIndexControllers = document.querySelectorAll(
    ".catalog-index-controller",
  );
  let unmuteBtn = document.querySelector(".control-unmute-btn");
  let muteBtn = document.querySelector(".control-mute-btn");

  if (!catalogNextBtn) return;
  catalogNextBtn.addEventListener("click", function () {
    pageTransitionAnimation();
    setTimeout(() => {
      if (catalogIndex < catalogContentsArray.length - 1) {
        catalogIndex++;

        const catalogCurrentIndex = catalogContentsArray[catalogIndex];
        catalogVideo.src = catalogCurrentIndex.CourseVideo;
        catalogImage.style.backgroundImage = `url("${catalogCurrentIndex.CourseImage}")`;
        catalogName.textContent = catalogCurrentIndex.CourseName;
        catalogCourseName.textContent = catalogCurrentIndex.CourseType;
        document.title = `Emmpo | ${catalogCurrentIndex.CourseName}`;
      }

      if (catalogIndex === catalogContentsArray.length - 1) {
        catalogNextBtn.style.opacity = 0.3;
        catalogNextBtn.style.pointerEvents = "none";
      }

      if (catalogIndex > 0) {
        catalogPrevBtn.style.opacity = 1;
        catalogPrevBtn.style.pointerEvents = "auto";
      }

      if (catalogVideo.muted) {
        gsap.to(unmuteBtn, {
          y: "100%",
          duration: 0.4,
          onComplete: () => {
            muteBtn.style.transform = "translateY(0%)";
            catalogVideo.muted = false;
          },
        });
      }
    }, pageTransitionDuration * 1500);
  });

  if (!catalogPrevBtn) return;
  catalogPrevBtn.addEventListener("click", function () {
    pageTransitionAnimation();

    setTimeout(() => {
      if (catalogIndex > 0) {
        catalogIndex--;

        const catalogCurrentIndex = catalogContentsArray[catalogIndex];
        catalogVideo.src = catalogCurrentIndex.CourseVideo;
        catalogImage.style.backgroundImage = `url("${catalogCurrentIndex.CourseImage}")`;
        catalogName.textContent = catalogCurrentIndex.CourseName;
        catalogCourseName.textContent = catalogCurrentIndex.CourseType;
        document.title = `Emmpo | ${catalogCurrentIndex.CourseName}`;
      }

      if (catalogIndex === 0) {
        catalogPrevBtn.style.opacity = 0.3;
        catalogPrevBtn.style.pointerEvents = "none";
      }

      if (catalogIndex < catalogContentsArray.length - 1) {
        catalogNextBtn.style.opacity = 1;
        catalogNextBtn.style.pointerEvents = "auto";
      }

      if (catalogVideo.muted) {
        gsap.to(unmuteBtn, {
          y: "100%",
          duration: 0.4,
          onComplete: () => {
            muteBtn.style.transform = "translateY(0%)";
            catalogVideo.muted = false;
          },
        });
      }
    }, pageTransitionDuration * 1500);
  });

  if (catalogIndexControllers.length === 0) return;
  catalogIndexControllers.forEach((catalogIndexController) => {
    catalogIndexController.addEventListener("click", function (dets) {
      setTimeout(() => {
        catalogIndex = Number(dets.target.dataset.number);
        const catalogCurrentIndex = catalogContentsArray[catalogIndex];
        catalogVideo.src = catalogCurrentIndex.CourseVideo;
        catalogImage.style.backgroundImage = `url("${catalogCurrentIndex.CourseImage}")`;
        catalogName.textContent = catalogCurrentIndex.CourseName;
        catalogCourseName.textContent = catalogCurrentIndex.CourseType;
        document.title = `Emmpo | ${catalogCurrentIndex.CourseName}`;

        if (catalogIndex === catalogContentsArray.length - 1) {
          catalogNextBtn.style.opacity = 0.3;
          catalogNextBtn.style.pointerEvents = "none";
        }

        if (catalogIndex > 0) {
          catalogPrevBtn.style.opacity = 1;
          catalogPrevBtn.style.pointerEvents = "auto";
        }

        if (catalogIndex === 0) {
          catalogPrevBtn.style.opacity = 0.3;
          catalogPrevBtn.style.pointerEvents = "none";
        }

        if (catalogIndex < catalogContentsArray.length - 1) {
          catalogNextBtn.style.opacity = 1;
          catalogNextBtn.style.pointerEvents = "auto";
        }

        if (catalogVideo.muted) {
          gsap.to(unmuteBtn, {
            y: "100%",
            duration: 0.4,
            onComplete: () => {
              muteBtn.style.transform = "translateY(0%)";
              catalogVideo.muted = false;
            },
          });
        }
      }, pageTransitionDuration * 1500);
    });
  });
}

function quizPlay() {
  let quizQuestionSection = document.querySelector(
    ".quiz-home .quiz-questions-section",
  );
  let quizStartBtn = document.querySelector(".quiz-home .quiz-home-btn button");
  let quizQuestion = document.querySelector(
    ".quiz-home .quiz-questions-section .quiz-question-box .quiz-question h2",
  );
  let quizImage = document.querySelector(
    ".quiz-home .quiz-questions-section .quiz-question-box .quiz-image img",
  );
  let ActualquizOptions = document.querySelectorAll(
    ".quiz-home .quiz-questions-section .quiz-question-box .quiz-options .option",
  );
  let quizOptions = document.querySelectorAll(
    ".quiz-home .quiz-questions-section .quiz-question-box .quiz-options .option input",
  );
  let quizNextBtn = document.querySelector(
    ".quiz-home .quiz-questions-section .quiz-next-btn button",
  );
  let quizResultBtnSection = document.querySelector(
    ".quiz-home .quiz-result-section",
  );

  if (!quizStartBtn) return;
  quizStartBtn.addEventListener("click", function () {
    gsap.to(quizQuestionSection, {
      opacity: 1,
      pointerEvents: "auto",
      duration: 0.4,
      ease: "power2.inOut",
    });
  });

  ActualquizOptions.forEach((ActualquizOption) => {
    ActualquizOption?.addEventListener("click", function (e) {
      let input = ActualquizOption.querySelector("input");
      if (e.target === ActualquizOption) {
        input.checked = true;
      }
    });
  });

  quizNextBtn.addEventListener("click", function () {
    const selectedOption = [...quizOptions].find((option) => option.checked);
    let randomNumber = Math.floor(Math.random() * backgroundColorArray.length);

    if (!selectedOption) {
      const popup = document.createElement("div");
      popup.classList.add("quiz-popup");
      popup.textContent = "❌ Please Select One Option";
      quizQuestionSection.append(popup);

      gsap.to(popup, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(popup, {
            opacity: 0,
            duration: 0.2,
            delay: 1,
            onComplete: () => popup.remove(),
          });
        },
      });

      return;
    }

    const quizTextContent =
      selectedOption.closest("label")?.textContent ||
      selectedOption.parentElement.querySelector("label")?.textContent;

    paraContentArray.push(quizTextContent);

    setTimeout(() => {
      questionIndex++;
      if (questionIndex < quizQuestionsArray.length) {
        const quizCurrentIndex = quizQuestionsArray[questionIndex];
        if (!quizQuestion || !quizImage) return;
        quizQuestion.textContent = quizCurrentIndex?.question;
        quizImage.src = quizCurrentIndex?.image;
        quizQuestionSection.style.backgroundColor =
          backgroundColorArray[randomNumber];
        quizOptions.forEach((quizOption, index) => {
          let questionLabel = quizOption.parentElement.querySelector("label");
          if (!questionLabel) return;
          questionLabel.textContent = quizCurrentIndex.options[index];
          if (quizOption.checked) {
            quizOption.checked = false;
          }
          if (questionIndex === quizQuestionsArray.length - 1) {
            quizNextBtn.textContent = "Submit Quiz";
          }
        });
      }
      if (questionIndex === quizQuestionsArray.length) {
        quizNextBtn.style.opacity = 0.3;
        quizNextBtn.style.pointerEvents = "none";

        quizParaDisplay();
        tl.to(
          quizQuestionSection,
          {
            opacity: 0,
            pointerEvents: "none",
            duration: 0.4,
            ease: "power2.inOut",
          },
          "same",
        );
        tl.to(
          quizResultBtnSection,
          {
            opacity: 1,
            pointerEvents: "auto",
            duration: 0.4,
            ease: "power2.inOut",
          },
          "same",
        );
      }
    }, quizQuextionTransitionDuration * 1000);
  });
}

function quizParaDisplay() {
  let quizResultBtn = document.querySelector(
    ".quiz-home .quiz-result-section .quiz-result-btn",
  );
  let quizResultBtnSection = document.querySelector(
    ".quiz-home .quiz-result-section",
  );
  let quizParaDisplaySection = document.querySelector(
    ".quiz-home .quiz-para-display",
  );
  let careerRole = document.querySelector(".career-role");
  let randomCareerIndex = Math.floor(Math.random() * careerRoles.length);

  if (paraContentArray.length === 0) return;

  const storedUser = JSON.parse(localStorage.getItem("userinfo"));

  if (storedUser?.username) {
    const quizPlayer = document.querySelector(".result-greeting .user-name");
    if (quizPlayer) {
      quizPlayer.textContent = storedUser.username.trim().split(" ")[0];
    }
  }

  quizParaDisplaySection
    ?.querySelectorAll("p span")
    .forEach((paraSpan, index) => {
      paraSpan.textContent = paraContentArray[index];
    });

  careerRole.textContent = careerRoles[randomCareerIndex];

  quizResultBtn?.addEventListener("click", function () {
    tl.to(quizResultBtnSection, {
      opacity: 0,
      pointerEvents: "none",
    });
    tl.to(quizParaDisplaySection, {
      opacity: 1,
      pointerEvents: "auto",
      delay: -0.4,
    });
  });
}

function formValidation() {
  let allinputs = document.querySelectorAll("form input");
  let nameInput = document.querySelector(".name-input input");
  let emailInput = document.querySelector(".email-input input");
  let textareaInput = document.querySelector(".textarea-input input");
  let submitBtn = document.querySelector(".submit-btn");
  let Name = "";
  let Email = "";

  submitBtn?.addEventListener("click", function (e) {
    e.preventDefault();

    if (nameInput.value !== "") {
      Name = nameInput.value.trim();
      handlerName = true;
    } else {
      alert("Enter someting in Name input");
      return;
    }

    if (emailInput.value !== "") {
      Email = emailInput.value.trim();
      handlerEmailId = true;
    } else {
      alert("Enter email-id in email input");
      return;
    }

    if (!handlerName && !handlerEmailId) return;
    userInfo.username = Name;
    userInfo.email = Email;
    allinputs.forEach((allinput) => {
      allinput.value = "";
    });
    setUserInfo();
  });
}

function PageTransitionBTn() {
  let quizPageLinks = document.querySelectorAll(".quiz-page-link");
  let catalogPageLinks = document.querySelectorAll(".catalog-page-link");
  let mainPageLinks = document.querySelectorAll(".main-page-link");
  let homePageLinks = document.querySelectorAll(".home-page-link");
  let coursePageLinks = document.querySelectorAll(".courses-page-link");
  let instaPageLinks = document.querySelectorAll(".insta-page-link");
  let gitPageLinks = document.querySelectorAll(".git-page-link");
  let linkdelnPageLinks = document.querySelectorAll(".Linkdeln-page-link");
  let storedUser = JSON.parse(localStorage.getItem("userinfo"));

  instaPageLinks?.forEach((instaPageLink) => {
    instaPageLink.addEventListener("click", function () {
      window.open(differentPageLinksArray[5], "_blank");
    });
  });

  gitPageLinks?.forEach((gitPageLink) => {
    gitPageLink.addEventListener("click", function () {
      window.open(differentPageLinksArray[7], "_blank");
    });
  });

  linkdelnPageLinks?.forEach((linkdelnPageLink) => {
    linkdelnPageLink.addEventListener("click", function () {
      window.open(differentPageLinksArray[6], "_blank");
    });
  });

  mainPageLinks?.forEach((mainPageLink) => {
    mainPageLink.addEventListener("click", function () {
      window.open(differentPageLinksArray[0], "_blank");
    });
  });

  homePageLinks?.forEach((homePageLink) => {
    homePageLink.addEventListener("click", function () {
      pageTransitionAnimation();
      setTimeout(() => {
        window.open(differentPageLinksArray[1], "_blank");
      }, pageTransitionDuration * 2500);
    });
  });

  quizPageLinks?.forEach((quizPageLink) => {
    quizPageLink.addEventListener("click", function () {
      const isValidUser = storedUser && storedUser.username && storedUser.email;
      if (isValidUser) {
        pageTransitionAnimation();
        setTimeout(() => {
          window.open(differentPageLinksArray[3], "_blank");
        }, pageTransitionDuration * 2500);
      } else {
        pageTransitionAnimation();
        setTimeout(() => {
          document.querySelector(".footer")?.scrollIntoView();
        }, pageTransitionDuration * 2000);
      }
    });
  });

  catalogPageLinks?.forEach((catalogPageLink) => {
    catalogPageLink.addEventListener("click", function () {
      const isValidUser = storedUser && storedUser.username && storedUser.email;
      if (isValidUser) {
        pageTransitionAnimation();
        setTimeout(() => {
          window.open(differentPageLinksArray[4], "_blank");
        }, pageTransitionDuration * 2500);
      } else {
        pageTransitionAnimation();
        setTimeout(() => {
          document.querySelector(".footer")?.scrollIntoView();
        }, pageTransitionDuration * 2000);
      }
    });
  });

  coursePageLinks.forEach((coursePageLink) => {
    coursePageLink.addEventListener("click", function () {
      pageTransitionAnimation();
      setTimeout(() => {
        window.open(differentPageLinksArray[2], "_blank");
      }, pageTransitionDuration * 2500);
    });
  });
}

/** DOM Content Loaded **/

document.addEventListener("DOMContentLoaded", function () {
  lenisPlugin();
  breakTextFirstLevel();
  setRealViewportHeight();
  quizLoader();
  homeloader();
  yellowLoaderAnimation();
  classListStyleAdding();
  if (window.innerWidth >= 600) textHoverAnimation();
  page3ImageGallery();
  pageScrollAnimations();
  formInputClickAnimation();
  currentYearDisplay();
  clickEventAnimation();
  catalogPlay();
  catalogChanging();
  quizPlay();
  formValidation();
  PageTransitionBTn();
});
