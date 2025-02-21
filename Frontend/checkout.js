document.getElementById("payButton").addEventListener("click", async function () {
    try {
        const response = await fetch("http://localhost:5000/api/payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: 500, // Amount in INR (modify as needed)
                currency: "INR",
            }),
        });

        const data = await response.json();

        if (data.error) {
            console.error("Payment error:", data.error);
            alert("Payment failed. Please try again.");
            return;
        }

        // Load Razorpay Checkout
        var options = {
            key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay Key ID
            amount: data.amount,
            currency: data.currency,
            name: "NutriFlow",
            description: "Purchase of healthy snacks",
            order_id: data.id, // Razorpay Order ID
            handler: function (response) {
                alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
                // Here, you can call your backend to update order status in the database
            },
            prefill: {
                name: "User Name", // Replace with actual user name
                email: "user@example.com", // Replace with actual email
                contact: "9876543210", // Replace with actual contact number
            },
            theme: {
                color: "#F37254",
            },
        };

        var rzp = new Razorpay(options);
        rzp.open();
    } catch (error) {
        console.error("Payment request failed:", error);
        alert("Something went wrong. Please try again.");
    }
});
