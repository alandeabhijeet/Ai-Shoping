
const order = require("../models/order.js");
let Order = require("../models/order.js");
let Product = require("../models/product.js")
module.exports.seeOrder = async(req,res ,next)=>{
    console.log(req.user)
    let orders = await Order.find({user : req.user.id}).populate({
        path: 'product'
    });
    console.log(orders)
    res.status(200).json({
        orders : orders
    })

}

module.exports.review = async (req , res , next)=>{
    console.log("In review")
    let {review} = req.body;
    const order = await Order.findById(review.order_id);

    if (
      order.user.toString() === review.user &&
      order.paymentStatus === 'Completed' &&
      order.product.toString() === review.product_id
    ) {
        console.log("inside 1 if ")
      const newReview = {
        user: review.user,
        rating: review.rating,
        review: review.review,
      };
      console.log(":object crated ")
      const product = await Product.findById(review.product_id);
      if (product) {
        product.ratings.push(newReview);
        await product.save();
        console.log("Byebye")
        return res.status(200).json({ message: 'Review added successfully!' });
      } else {
        return res.status(404).json({ message: 'Product not found' });
      }
    }else {
        return res.status(400).json({ message: 'Invalid order or unauthorized review' });
    }
}