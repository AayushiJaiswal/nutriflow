document.addEventListener("DOMContentLoaded", function () {
    // Load Navbar & Footer Dynamically
    loadNavbarFooter();

    // Update Price Range Label Dynamically
    let priceInput = document.getElementById("price");
    let priceValue = document.getElementById("price-value");

    priceInput.addEventListener("input", function () {
        priceValue.textContent = this.value;
        filterProductsByPrice(this.value);
    });

    // Add to Cart Functionality
    let cart = [];

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            let productName = this.getAttribute("data-name");
            let productPrice = parseFloat(this.getAttribute("data-price"));

            let item = { name: productName, price: productPrice };
            cart.push(item);

            alert(productName + " added to cart!");

            console.log("Cart:", cart);
        });
    });
});

// Function to Load Navbar & Footer
function loadNavbarFooter() {
    fetch("navbar-footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-placeholder").innerHTML = data;
            document.getElementById("footer-placeholder").innerHTML = data;
        })
        .catch(error => console.error("Error loading navbar/footer:", error));
}

// Function to Filter Products by Price
function filterProductsByPrice(maxPrice) {
    document.querySelectorAll(".product").forEach(product => {
        let productPrice = parseInt(product.getAttribute("data-price"));
        if (productPrice <= maxPrice) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

