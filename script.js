// Select all nav links
const navLinks = document.querySelectorAll('.nav-item a');

// Add click event to each link
navLinks.forEach(link => {
    link.addEventListener('click', function () {

        // Remove active class from all
        navLinks.forEach(nav => nav.classList.remove('active'));

        // Add to clicked one
        this.classList.add('active');
    });
});