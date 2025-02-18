axios.get("https://your-backend.com/api/order-status", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
})
.then(response => {
    document.getElementById("order-status").innerText = `Your order is ${response.data.status}`;
})
.catch(error => console.error("Error fetching order status:", error));
