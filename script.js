// INITIAL HISTORY SETUP 
history.replaceState({ home: true }, "");
history.pushState({ home: true }, "");

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

// NAV LINK ACTIVE STATE
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(a => a.classList.remove("active"));
    link.classList.add("active");
  });
});

// MENU OPEN / CLOSE
function openMenuPanel() {
  navMenu.classList.add("active");
  document.body.classList.add("no-scroll");
  openMenu.style.display = "none";
  closeMenu.style.display = "block";

  history.pushState({ menuOpen: true }, "");
}

function closeMenuPanel() {
  navMenu.classList.remove("active");
  document.body.classList.remove("no-scroll");
  closeMenu.style.display = "none";
  openMenu.style.display = "block";

  if (history.state?.menuOpen) {
    history.back();
  }
}

openMenu.addEventListener("click", openMenuPanel);
closeMenu.addEventListener("click", closeMenuPanel);
navItems.forEach(item => item.addEventListener("click", closeMenuPanel));

document.addEventListener("click", (e) => {
  if (navMenu.classList.contains("active") && !navMenu.contains(e.target) && !openMenu.contains(e.target) && !closeMenu.contains(e.target)) {
    closeMenuPanel();
  }
});

// SEARCH OPEN / CLOSE
function openSearchPanel() {
  navLogo.classList.add("invisible");
  mobileIcons.classList.add("invisible");

  searchBox.classList.add("active");
  searchInput.focus();

  history.pushState({ searchOpen: true }, "");
}

function closeSearchPanel() {
  searchBox.classList.remove("active");
  searchInput.value = "";
  searchInput.blur();

  setTimeout(() => {
    navLogo.classList.remove("invisible");
    mobileIcons.classList.remove("invisible");
  }, 350);

  if (history.state?.searchOpen) {
    history.back();
  }
}

openSearch.addEventListener("click", openSearchPanel);
searchBack.addEventListener("click", closeSearchPanel);

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") closeSearchPanel();
});

document.addEventListener("click", (e) => {
  if (searchBox.classList.contains("active") && !searchBox.contains(e.target) && !openSearch.contains(e.target)) {
    closeSearchPanel();
  }
});

// ANDROID BACK BUTTON (popstate)
window.addEventListener("popstate", (event) => {

  // CLOSE SEARCH
  if (event.state?.searchOpen && searchBox.classList.contains("active")) {
    closeSearchPanel();
    return;
  }

  // CLOSE MENU
  if (event.state?.menuOpen && navMenu.classList.contains("active")) {
    closeMenuPanel();
    return;
  }

  // ELSE -> NORMAL BACK
});