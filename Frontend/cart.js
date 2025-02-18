function addToCart(productId) {
    axios.post("https://your-backend.com/api/cart", { productId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(response => {
        alert("Item added to cart!");
        updateCartCount(response.data.cartCount);
    })
    .catch(error => console.error("Error adding to cart:", error));
}

function updateCartCount(count) {
    document.getElementById("cart-count").innerText = count;
}
