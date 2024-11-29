const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const Razorpay = require("razorpay");
const WrapAsync = require("../utils/wrapAsync.js");
const { authenticateToken, admin } = require("../utils/middleware.js");
const User = require("../models/user.js");
const Product = require("../models/product.js");
const Order = require("../models/order.js");

dotenv.config();

router.post(
  "/",
  authenticateToken,
  admin,
  WrapAsync(async (req, res, next) => {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user.id;

      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
      if (!user.address?.length) {
        return res.status(400).json({ message: "User has no address on file" });
      }

      const address = user.address[0];
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ message: "Product not found" });
      if (product.stock < quantity) {
        return res.status(400).json({ message: "Insufficient stock" });
      }

      const totalAmount = product.price * quantity;
      const razorpay = new Razorpay({
        key_id: process.env.RAZERPAY_KEYID,
        key_secret: process.env.RAZERPAY_KEYSEC,
      });

      const razorpayOrder = await razorpay.orders.create({
        amount: totalAmount * 100,
        currency: "INR",
        receipt: `order_rcptid_${Date.now()}`,
      });

      if (!razorpayOrder) {
        return res.status(500).json({ message: "Failed to create Razorpay order" });
      }

      const order = new Order({
        user: userId,
        product: productId,
        quantity,
        totalAmount,
        paymentStatus: "Pending",
        address,
      });
      await order.save();

      product.stock -= quantity;
      await product.save();

      res.status(201).json({
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        orderId: order._id,
      });
    } catch (error) {
      console.error("Error in buy API:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);


router.post(
    "/completed",
    authenticateToken,
    admin,
    WrapAsync(async (req, res, next) => {
      try {
        const { orderId } = req.body;
  
        const order = await Order.findById(orderId);
        if (!order) {
          return res.status(404).json({ message: "Order not found" });
        }
  
        order.paymentStatus = "Completed";
        await order.save();
  
        res.status(200).json({
          message: "Payment status updated to 'Completed'",
          orderId: order._id,
        });
      } catch (error) {
        console.error("Error in /buy/completed API:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
      }
    })
  );
  

module.exports = router;
