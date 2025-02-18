axios.get("https://your-backend.com/api/products")
    .then(response => {
        let products = response.data;
        let productContainer = document.getElementById("product-list");
        productContainer.innerHTML = ""; // Clear existing content

        products.forEach(product => {
            productContainer.innerHTML += `
                <div class="product">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>Price: ${product.price}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            `;
        });
    })
    .catch(error => console.error("Error fetching products:", error));
