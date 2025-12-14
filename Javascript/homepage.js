
const heroImages = [
    "/images/h1.jpg",
    "/images/h2.jpg",
    "/images/mobile.jpg",
    "/images/beauty.jpg",
    "/images/lap.jpg",
    "/images/shirt.jpg",
];


let currentIndex = 0;
const heroImg = document.querySelector(".hero-image img");

setInterval(() => {
    heroImg.style.opacity = "0";

    setTimeout(() => {
        currentIndex++;
        if (currentIndex === heroImages.length) {
            currentIndex = 0;
        }

        heroImg.src = heroImages[currentIndex];
        heroImg.style.opacity = 1;

    }, 500);
}, 3000);

document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", function () {
        window.location.href = `products.html`
    })
})

let cartCount = parseInt(sessionStorage.getItem("cartCount")) || 0;

const cartSpan = document.querySelector(".cart-count span");
if (cartSpan) cartSpan.innerText = cartCount;

function incrementCart() {
    cartCount++;
    sessionStorage.setItem("cartCount", cartCount);
    if (cartSpan) cartSpan.innerText = cartCount;
}



