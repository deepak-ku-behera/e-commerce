
const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod = "COD" } = req.body;

    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({ message: "Order items are required" });
    }

    if (!shippingAddress?.fullName || !shippingAddress?.phone ||
        !shippingAddress?.street || !shippingAddress?.city ||
        !shippingAddress?.state || !shippingAddress?.postalCode) {
      return res.status(400).json({
        message: "Complete shipping address is required"
      });
    }

    if (!["COD", "RAZORPAY"].includes(paymentMethod)) {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    const normalizedItems = [];
    let itemsPrice = 0;

    for (const item of orderItems) {
      if (!mongoose.isValidObjectId(item.product) ||
          !Number.isInteger(item.quantity) || item.quantity < 1) {
        return res.status(400).json({ message: "Invalid order item" });
      }

      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(400).json({ message: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`
        });
      }

      normalizedItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: item.quantity
      });

      itemsPrice += product.price * item.quantity;
    }

    // This starter calculates shipping and tax as zero.
    const shippingPrice = 0;
    const taxPrice = 0;

    const order = await Order.create({
      user: req.user.id,
      orderItems: normalizedItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice: itemsPrice + shippingPrice + taxPrice
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order" });
  }
});

router.get("/myorders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

module.exports = router;
