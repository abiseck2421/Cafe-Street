// INITIAL HISTORY STATE
history.replaceState({ home: true }, "");

// DOM ELEMENTS
const navLinks = document.querySelectorAll('.nav-item a');
const openMenu = document.querySelector(".open-menu");
const closeMenu = document.querySelector(".close-menu");
const navMenu = document.querySelector(".nav-menu");
const navItems = document.querySelectorAll(".nav-item");
const openSearch = document.querySelector(".open-search");
const searchBox = document.querySelector(".search-box");
const searchBack = document.querySelector(".search-back");
const searchInput = document.querySelector(".search-box input");
const navLogo = document.querySelector(".nav-logo");
const mobileIcons = document.querySelector(".mobile-icons");

// STATE TRACKING
let isMenuOpen = false;
let isSearchOpen = false;

// NAV LINKS ACTIVE STATE
navLinks.forEach(link => {
  link.addEventListener('click', function () {
    navLinks.forEach(nav => nav.classList.remove('active'));
    this.classList.add('active');
  });
});

// MENU FUNCTIONS
function openMenuPanel() {
  navMenu.classList.add("active");
  document.body.classList.add("no-scroll");
  openMenu.style.display = "none";
  closeMenu.style.display = "block";
  openSearch.style.display = "none";
  isMenuOpen = true;
  history.pushState({ menuOpen: true }, "");
}

function closeMenuPanel() {
  navMenu.classList.remove("active");
  document.body.classList.remove("no-scroll");
  closeMenu.style.display = "none";
  openMenu.style.display = "block";
  openSearch.style.display = "block";
  isMenuOpen = false;
  history.replaceState({ home: true }, "");
}

// MENU EVENT LISTENERS
openMenu?.addEventListener("click", openMenuPanel);
closeMenu?.addEventListener("click", closeMenuPanel);
navItems.forEach(item => item.addEventListener("click", closeMenuPanel));

// CLOSE MENU - CLICK OUTSIDE
document.addEventListener("click", (e) => {
  const clickedInside = navMenu.contains(e.target) || openMenu?.contains(e.target) || closeMenu?.contains(e.target);
  if (!clickedInside && navMenu.classList.contains("active")) {
    closeMenuPanel();
  }
});

// SEARCH FUNCTIONS
function openSearchPanel() {
  navLogo.classList.add("invisible");
  mobileIcons.classList.add("invisible");
  searchBox.classList.add("active");
  searchInput.focus();
  isSearchOpen = true;
  history.pushState({ searchOpen: null }, "");
}

function closeSearchPanel() {
  searchBox.classList.remove("active");
  searchInput.value = "";
  searchInput.blur();
  isSearchOpen = false;
  history.replaceState({ home: true }, "");

  setTimeout(() => {
    navLogo.classList.remove("invisible");
    mobileIcons.classList.remove("invisible");
  }, 350);
}

// SEARCH EVENT LISTENERS
openSearch?.addEventListener("click", openSearchPanel);
searchBack?.addEventListener("click", closeSearchPanel);

searchInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") closeSearchPanel();
});

// CLOSE SEARCH - CLICK OUTSIDE
document.addEventListener("click", (e) => {
  if (!searchBox.contains(e.target) && !openSearch?.contains(e.target) && searchBox.classList.contains("active")) {
    closeSearchPanel();
  }
});

// ANDROID BACK BUTTON + BROWSER BACK HANDLER
window.addEventListener("popstate", (event) => {
  // CLOSE SEARCH
  if (searchBox.classList.contains("active") || isSearchOpen) {
    closeSearchPanel();
    return;
  }
  
  // CLOSE MENU
  if (navMenu.classList.contains("active") || isMenuOpen) {
    closeMenuPanel();
    return;
  }

  // ELSE -> NORMAL NAVIGATION
});
 
// REVIEW SLIDER – RESPONSIVE
const slides = [...document.querySelectorAll(".img-box")];
const dots   = [...document.querySelectorAll(".dot")];
const frame  = document.querySelector(".review-image");

let current = 0;
let startX = 0;
let isMobile = false;

// REVIEW: RESET SLIDE STATES
function resetSlides() {
  slides.forEach(slide =>
    slide.classList.remove("active", "prev", "next")
  );
  dots.forEach(dot => dot.classList.remove("active"));
}

// REVIEW: DESKTOP MODE
function desktopMode() {
  resetSlides();

  slides[current].classList.add("active");
  dots[current].classList.add("active");

  dots.forEach((dot, i) => {
    dot.onclick = () => activateIndex(i);
  });

  slides.forEach((sSlide, i) => {
    slide.onclick = () => activateIndex(i);
  });

  frame.ontouchstart = null;
  frame.ontouchend   = null;
}

function activateIndex(index) {
  resetSlides();
  slides[index].classList.add("active");
  dots[index].classList.add("active");
  current = index;
}

// REVIEW: MOBILE MODE
function mobileMode() {
  showSlide(current);

  dots.forEach((dot, i) => {
    dot.onclick = () => showSlide(i);
  });

  frame.ontouchstart = e => {
    startX = e.touches[0].clientX;
  };

  frame.ontouchend = e => {
    const diff = startX - e.changedTouches[0].clientX;

    if (diff > 50 && current < slides.length - 1) {
      showSlide(current + 1);
    } else if (diff < -50 && current > 0) {
      showSlide(current - 1);
    }
  };
}

function showSlide(index) {
  if (index < 0 || index >= slides.length) return;

  slides.forEach((slide, i) => {
    slide.classList.remove("active", "prev", "next");

    if (i === index) slide.classList.add("active");
    else if (i === index - 1) slide.classList.add("prev");
    else if (i === index + 1) slide.classList.add("next");
  });

  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");

  current = index;
}

// REVIEW: MODE SWITCHER
function checkMode() {
  const shouldBeMobile = window.innerWidth <= 768;

  if (shouldBeMobile !== isMobile) {
    isMobile = shouldBeMobile;
    isMobile ? mobileMode() : desktopMode();
  }
}

// REVIEW: INIT
checkMode();
window.addEventListener("resize", checkMode);