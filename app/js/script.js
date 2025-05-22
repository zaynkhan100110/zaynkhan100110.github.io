/**
 * Pause the program for specified amount of time
 * @param {number} ms Number of milliseconds to wait
 * @returns Promise
 */
async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Remove a class from an element
 * @param {string} selector CSS selector for the element
 * @param {string} className A single class name
 */
function removeClass(selector, className) {
  document.querySelector(selector).classList.remove(className);
}

/** ScrollReveal (https://scrollrevealjs.org) */

const popUp = {
  delay: 150,
  scale: 0.92,
  viewFactor: 0.25, // Reveal when 25% of elements are within viewport
};

const popUpItems = [".about", ".work", ".project__header", ".project__item", ".contact"];
popUpItems.forEach((item) => {
  ScrollReveal().reveal(item, popUp);
});

/** TypeIt.js (https://typeitjs.com/docs) */

const heroTitle2 = new TypeIt("#hero__title2", {
  speed: 27,
  startDelay: 350,
  cursorSpeed: 2000,
  afterComplete: async (step, instance) => {
    await sleep(150);
    instance.destroy();
    ScrollReveal().reveal(".hero__content", { delay: 100, distance: "10px", origin: "left" });
  },
});

new TypeIt("#hero__title1", {
  strings: 'Hi, I\'m ZAYN KHAN<span class="hero__hand_wave no-select">&#x1F44B;</span>',
  html: true,
  speed: 25,
  startDelay: 500,
  afterComplete: async (step, instance) => {
    await sleep(450);
    instance.destroy(); // Remove first title's cursor
    removeClass("#hero__chevron2", "invisible");
    removeClass("#hero__title2", "invisible");
    heroTitle2.go(); // Begin "typing" second title
  },
}).go();

/** Navbar & Links handling */

const header = document.querySelector(".header");
const headerOverlay = document.querySelector(".header__overlay");
const hamburger = document.querySelector("#hamburger");
const navLogo = document.querySelector(".nav__logo");
const navLinks = document.querySelectorAll(".nav__links > li > a");
const navLinksMobile = document.querySelectorAll(".nav__mobile_links > li > a");
const fadeElements = document.querySelectorAll(".has-fade");

function openMobileMenu() {
  header.classList.add("open");
  fadeElements.forEach((item) => {
    item.classList.add("fade-in");
    item.classList.remove("fade-out");
  });
}

function closeMobileMenu() {
  header.classList.remove("open");
  fadeElements.forEach((item) => {
    item.classList.remove("fade-in");
    item.classList.add("fade-out");
  });
}

        function pauseMusique() {
            var 开屁娜艾西 = document.getElementById('music');
            if (开屁娜艾西.paused) {
                开屁娜艾西.play();
                document.getElementById('musicButton').innerText = '🔇';
            } else {
                开屁娜艾西.pause();
                document.getElementById('musicButton').innerText = '🔊';
            };
          }
// Toggling hamburger icon in navbar
hamburger.addEventListener("click", () => {
  header.classList.contains("open") ? closeMobileMenu() : openMobileMenu();
});

// Close mobile menu after clicking certain elements
const closeMenuElements = [...navLinksMobile, headerOverlay];
closeMenuElements.forEach((element) => {
  element.addEventListener("click", function () {
    closeMobileMenu();
  });
});

// Remove focus after clicking for buttons & anchor links
const focusElements = [...navLinks, hamburger, navLogo];
focusElements.forEach((element) => {
  element.addEventListener("click", function () {
    element.blur();
  });
});

/** Work Experience tab view */

const tabs = document.querySelectorAll(".work__tabs > .tab");

tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => handleTabClick(e));
});

function handleTabClick(e) {
  const target = e.target; // Clicked tab button
  const tabNum = target.dataset.tab; // Returns "data-tab" value
  if (!tabNum) return;

  const activeTab = document.querySelector(".work__tabs .active");
  const activeContent = document.querySelector(".work__content .visible");
  const currentContent = document.querySelector(`.work__content_section[data-tab='${tabNum}']`);

  activeTab.classList.remove("active");
  target.classList.add("active");
  activeContent.classList.remove("visible");
  currentContent.classList.add("visible");
}

/** Get in Touch - Copy email to clipboard */

const copyEmailBtn = document.querySelector(".contact__copy_email");
const successInfoBox = document.querySelector(".contact__info_box.copy-success");
const failInfoBox = document.querySelector(".contact__info_box.copy-fail");

// Callback function after the popup box has finished animating
const animEndCallback = (e) => {
  e.target.classList.remove("fade-in-out");
};

copyEmailBtn.addEventListener("click", (e) => {
  navigator.clipboard.writeText("zaynkhan100110@gmail.com").then(
    () => {
      successInfoBox.classList.add("fade-in-out");
      successInfoBox.addEventListener("animationend", animEndCallback);
    },
    (err) => {
      failInfoBox.classList.add("fade-in-out");
      failInfoBox.addEventListener("animationend", animEndCallback);
    }
  );
});
