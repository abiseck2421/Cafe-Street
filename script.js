// NAV LINKS ACTIVE STATE
const navLinks = document.querySelectorAll('.nav-item a');
navLinks.forEach(link => {
  link.addEventListener('click', function () {
    navLinks.forEach(nav => nav.classList.remove('active'));
    this.classList.add('active');
  });
});

// MENU TOGGLE
const openMenu = document.querySelector(".open-menu");
const closeMenu = document.querySelector(".close-menu");
const navMenu = document.querySelector(".nav-menu");
const navItems = document.querySelectorAll(".nav-item");

// OPEN MENU
openMenu.addEventListener("click", () => {
  navMenu.classList.add("active");
  document.body.classList.add("no-scroll");
  openMenu.style.display  = "none";
  closeMenu.style.display = "block";
});

// CLOSE MENU
function closeMenuSmooth() {
  navMenu.classList.remove("active");
  document.body.classList.remove("no-scroll");
  closeMenu.style.display  = "none";
  openMenu.style.display = "block";
}

// CLOSE MENU WHEN CLOSEICON IS CLICKED
closeMenu.addEventListener("click", closeMenuSmooth);

// CLOSE MENU WHEN NAV ITEM IS CLICKED
navItems.forEach(item => {
  item.addEventListener("click", closeMenuSmooth);
});

// CLOSE MENU WHEN CLICK OUTSIDE
document.addEventListener("click", (e) => {
  const clickedInside = navMenu.contains(e.target) || openMenu.contains(e.target) || closeMenu.contains(e.target);

  if (!clickedInside && navMenu.classList.contains("active")) {
    closeMenuSmooth();
  }
});

// MOBILE SEARCH
const openSearch = document.querySelector(".open-search");
const searchBox = document.querySelector(".search-box");
const searchBack = document.querySelector(".search-back");
const searchInput = document.querySelector(".search-box input");
const navLogo = document.querySelector(".nav-logo");
const mobileIcons = document.querySelector(".mobile-icons");

// OPEN SEARCH
openSearch.addEventListener("click", () => {
  navLogo.classList.add("invisible");
  mobileIcons.classList.add("invisible");
  searchBox.classList.add("active");
  searchInput.focus();
});

// CLOSE SEARCH
function closeSearchMode() {
  searchBox.classList.remove("active");
  setTimeout(() => {
    navLogo.classList.remove("invisible");
    mobileIcons.classList.remove("invisible");
  }, 350);
}

// CLOSE SEARCH WHENN CLICK ARROW
searchBack.addEventListener("click", closeSearchMode);

// CLOSE SEARCH WHEN PRESS ENTER
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    closeSearchMode();
  }
});

// CLOSE SEARCH WHEN CLICK OUTSIDESEARCH BAR
document.addEventListener("click", (e) => {
  if (!searchBox.contains(e.target) && !openSearch.contains(e.target) && searchBox.classList.contains("active")) {
    closeSearchMode();
  }
});