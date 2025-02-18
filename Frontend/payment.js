document.getElementById("checkoutForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const address = document.getElementById("address").value;

    axios.post("https://your-backend.com/api/checkout", { address }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(response => {
        alert("Address saved successfully!");
        window.location.href = "payment.html"; // Redirect to payment page
    })
    .catch(error => console.error("Error saving address:", error));
});
