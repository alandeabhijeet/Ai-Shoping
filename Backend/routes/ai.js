const express = require("express");
const router = express.Router();

const Product = require("../models/product.js");

router.route("/").get(async (req, res, next) => {
    try {
      const { id } = req.query; 
      console.log(id)
      const item = await Product.findById(id);
      console.log("Item")
    console.log(item)
    
      if (!item) {
        return res.status(404).json({ message: "Product not found" });
      }
      console.log(item)
      res.status(200).json({ product: item });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
});
  


module.exports = router;