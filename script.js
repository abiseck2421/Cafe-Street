// INITIAL HISTORY STATE
history.replaceState({ home: true }, "");

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

  history.pushState({ menuOpen: true }, "");
});

// CLOSE MENU
function closeMenuSmooth() {
  navMenu.classList.remove("active");
  document.body.classList.remove("no-scroll");
  closeMenu.style.display = "none";
  openMenu.style.display  = "block";

  history.replaceState({ home: true }, "");
}

// CLOSE MENU WHEN CLOSE ICON CLICKED
closeMenu.addEventListener("click", closeMenuSmooth);

// CLOSE MENU WHEN NAV ITEM CLICKED
navItems.forEach(item => item.addEventListener("click", closeMenuSmooth));

// CLOSE MENU WHEN CLICK OUTSIDE
document.addEventListener("click", (e) => {
  const clickedInside =
    navMenu.contains(e.target) || openMenu.contains(e.target) || closeMenu.contains(e.target);

  if (!clickedInside && navMenu.classList.contains("active")) {
    closeMenuSmooth();
  }
});

// MOBILE SEARCH
const openSearch  = document.querySelector(".open-search");
const searchBox   = document.querySelector(".search-box");
const searchBack  = document.querySelector(".search-back");
const searchInput = document.querySelector(".search-box input");
const navLogo     = document.querySelector(".nav-logo");
const mobileIcons = document.querySelector(".mobile-icons");

// OPEN SEARCH
openSearch.addEventListener("click", () => {
  navLogo.classList.add("invisible");
  mobileIcons.classList.add("invisible");
  searchBox.classList.add("active");
  searchInput.focus();

  history.pushState({ searchOpen: true }, "");
});

// CLOSE SEARCH
function closeSearchMode() {
  searchBox.classList.remove("active");
  searchInput.value = "";
  searchInput.blur();

  history.replaceState({ home: true }, "");

  setTimeout(() => {
    navLogo.classList.remove("invisible");
    mobileIcons.classList.remove("invisible");
  }, 350);
}

// CLOSE SEARCH WHEN CLICK ARROW 
searchBack.addEventListener("click", closeSearchMode);

// CLOSE SEARCH WHEN PRESS ENTER KEY
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") closeSearchMode();
});

// CLOSE SEARCH WHEN CLICK OUTSIDE
document.addEventListener("click", (e) => {
  if (!searchBox.contains(e.target) && !openSearch.contains(e.target) && searchBox.classList.contains("active")) {
    closeSearchMode();
  }
});

// ANDROID BACK BUTTON HANDLER
window.addEventListener("popstate", (event) => {

  if (event.state && event.state.searchOpen) {
    closeSearchMode();
    return;
  }

  if (event.state && event.state.menuOpen) {
    closeMenuSmooth();
    return;
  }

  // ELSE → NORMAL BACK
});