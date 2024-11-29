
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