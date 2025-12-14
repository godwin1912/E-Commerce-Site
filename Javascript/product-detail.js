const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

async function loadProduct() {
    const res = await fetch(`https://dummyjson.com/products/${productId}`);
    const product = await res.json();

    document.getElementById("title").innerText = product.title;
    document.getElementById("price").innerText = "$" + product.price;
    document.getElementById("discount").innerText = product.discountPercentage;
    document.getElementById("rating").innerText = product.rating;
    document.getElementById("brand").innerText = product.brand;
    document.getElementById("category").innerText = product.category;
    document.getElementById("description").innerText = product.description;

    const mainImage = document.getElementById("mainImage");
    mainImage.src = product.thumbnail;

    const thumbs = document.getElementById("thumbs");
    product.images.forEach(img => {
        const t = document.createElement("img");
        t.src = img;
        t.onclick = () => mainImage.src = img;
        thumbs.appendChild(t);
    });

    const reviewList = document.getElementById("reviewList");
    if (product.reviews && product.reviews.length > 0) {
        product.reviews.forEach(r => {
            const div = document.createElement("div");
            div.className = "review";
            div.innerHTML = `<strong>${r.reviewerName}</strong> ⭐ ${r.rating}<p>${r.comment}</p>`;
            reviewList.appendChild(div);
        });
    } else {
        reviewList.innerHTML = "<p>No reviews available.</p>";
    }
}

loadProduct();

let cartCount = parseInt(sessionStorage.getItem("cartCount")) || 0;

const cartSpan = document.querySelector(".cart-count span");
if (cartSpan) cartSpan.innerText = cartCount;

// Increment 
function incrementCart() {
cartCount++;
sessionStorage.setItem("cartCount", cartCount);
if (cartSpan) cartSpan.innerText = cartCount;
}

// Add to Cart 
document.getElementById("addToCart").addEventListener("click", () => {
incrementCart();
});

// Buy Now 
document.getElementById("buy").addEventListener("click", () => {
window.location.href = "order-placed.html";
});

function goBack() {
history.back();
}
