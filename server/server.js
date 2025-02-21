const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Razorpay = require("razorpay");
const http = require("http");
const { Server } = require("socket.io");

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/auth", require("./routes/authRoutes")); // User Authentication
app.use("/api/products", require("./routes/productRoutes")); // Product Management
app.use("/api/cart", require("./routes/cartRoutes")); // Cart Management
app.use("/api/orders", require("./routes/orderRoutes")); // Order Processing

// Payment API Route
app.post("/api/payment", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const options = {
      amount: amount * 100, // Convert amount to paise
      currency: currency || "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Payment failed", details: error });
  }
});

// Create the HTTP server and attach Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Socket.IO connection and events
io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);

  // Simulate order tracking update
  socket.on("track-order", (orderId) => {
    console.log(`Tracking order: ${orderId}`);

    // Simulating order status update
    setTimeout(() => {
      io.emit("order-update", { orderId, status: "Shipped" });
    }, 5000);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Server listen on port
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
