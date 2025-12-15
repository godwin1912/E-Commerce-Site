const myproduct = document.getElementById("productList");
        const filterPanel = document.getElementById("filterPanel");

        let allProducts = [];
        let currentProducts = [];

        // Toggle
        document.getElementById("filterToggle").addEventListener("click", () => {
            filterPanel.style.display =
                filterPanel.style.display === "block" ? "none" : "block";
        });

        // Fetch api data
        async function apicall() {
            const res = await fetch("https://dummyjson.com/products?limit=30");
            const data = await res.json();

            allProducts = data.products;
            currentProducts = allProducts;

            restoreFilters(); //  
        }

        apicall();

        //  products display
        function displayProducts(products) {
            myproduct.innerHTML = "";

            products.forEach(product => {
                const div = document.createElement("div");
                div.className = "product-card";

                div.innerHTML = `
                    <img src="${product.thumbnail}" width="150" height="150" alt="api failed">
                    <p>${product.title}</p>
                    <p>$${product.price}</p>
                    <p>⭐ ${product.rating} / 5</p>
                `;

                div.addEventListener("click", () => {
                    window.location.href = `product-details.html?id=${product.id}`;
                });

                myproduct.appendChild(div);
            });
        }

        // filters
        function applyFilters() {
            const selectedCategories = [...document.querySelectorAll(
                ".filter-panel input[type='checkbox']:checked"
            )]
                .filter(cb => !cb.classList.contains("rating-filter"))
                .map(cb => cb.value);

            const selectedRatings = [...document.querySelectorAll(
                ".rating-filter:checked"
            )].map(cb => Number(cb.value));

            // Save filters
            localStorage.setItem("productFilters", JSON.stringify({
                categories: selectedCategories,
                ratings: selectedRatings
            }));

            currentProducts = allProducts.filter(product => {
                const categoryMatch =
                    selectedCategories.length === 0 ||
                    selectedCategories.includes(product.category);

                const ratingMatch =
                    selectedRatings.length === 0 ||
                    selectedRatings.some(r => product.rating >= r);

                return categoryMatch && ratingMatch;
            });

            displayProducts(currentProducts);
        }

        // localstorage
        function restoreFilters() {
            const saved = JSON.parse(localStorage.getItem("productFilters"));

            if (!saved) {
                displayProducts(allProducts);
                return;
            }

            document.querySelectorAll(".filter-panel input[type='checkbox']").forEach(cb => {
                if (
                    saved.categories.includes(cb.value) ||
                    saved.ratings.includes(Number(cb.value))
                ) {
                    cb.checked = true;
                }
            });

            applyFilters();
        }

        // Filter checkbox change
        document.querySelectorAll(".filter-panel input").forEach(input => {
            input.addEventListener("change", applyFilters);
        });

        // Sort A-Z
        document.getElementById("az").addEventListener("click", () => {
            displayProducts(
                [...currentProducts].sort((a, b) =>
                    a.title.localeCompare(b.title)
                )
            );
        });

        // Sort Z-A
        document.getElementById("za").addEventListener("click", () => {
            displayProducts(
                [...currentProducts].sort((a, b) =>
                    b.title.localeCompare(a.title)
                )
            );
        });

        // Cart counter
        let cartCount = parseInt(sessionStorage.getItem("cartCount")) || 0;
        const cartSpan = document.querySelector(".cart-count span");
        if (cartSpan) cartSpan.innerText = cartCount;