// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function() {
    // Search Functionality
    const searchInput = document.querySelector(".search-bar input");
    const cards = document.querySelectorAll(".section-card");

    searchInput.addEventListener("input", function() {
        const query = searchInput.value.toLowerCase();
        cards.forEach(card => {
            const text = card.innerText.toLowerCase();
            card.style.display = text.includes(query) ? "block" : "none";
        });
    });

    // Donate Now Button Redirect
    const donateButton = document.querySelector(".cta-button");
    donateButton.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "file:///C:/Desktop%20Files/Coding/Hackathon2025/findNGO.html";
    });

    // Highlight Active Navigation Link
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.style.fontWeight = "bold";
            link.style.color = "#e74c3c";
        }
    });
});
