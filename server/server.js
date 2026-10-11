
// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const connectDB = require("./config/db");
// const Product = require("./models/Product");
// const authRoutes = require("./routes/authRoutes");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.json({ message: "E-Commerce API is running!" });
// });

// app.use("/api/auth", authRoutes);

// app.get("/api/products", async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 });
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch products" });
//   }
// });

// async function startServer() {
//   if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
//     throw new Error("MONGO_URI and JWT_SECRET must be configured in .env");
//   }

//   await connectDB();

//   const PORT = process.env.PORT || 5000;

//   app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });
// }

// startServer().catch((error) => {
//   console.error("Server startup failed:", error.message);
//   process.exit(1);
// });


const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "E-Commerce API is running!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

async function startServer() {
  if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
    throw new Error("MONGO_URI and JWT_SECRET must be configured in .env");
  }

  await connectDB();

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Server startup failed:", error.message);
  process.exit(1);
});
