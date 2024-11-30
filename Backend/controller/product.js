let Product = require("../models/product.js")
let Order = require("../models/order.js")
module.exports.add = async(req , res , next)=>{
    console.log("in add ")
    const { name, category, description, price, stock } = req.body;
    let {path , filename } = req.file; 
    let images = path; 
    console.log(images)
        const newProduct = new Product({
            name,
            category,
            description,
            price,
            stock,
            images  
        });

        await newProduct.save();
        
        res.status(201).json({
            message: 'Product added successfully',
            product: newProduct,
        });
}



module.exports.list = async (req, res, next) => {
    console.log('Complete URL:', req.url);
    console.log("Complete Query Object:", req.query); 

    let { q } = req.query;
    let products = [];

    if (q === "men") {
        products = await Product.find({ category: "men" }).lean();
    } else if (q === "women") {
        products = await Product.find({ category: "women" }).lean();
    } else if (q === "bag") {
        products = await Product.find({ category: "bag" }).lean();
    } else if (q === "beauty") {
        products = await Product.find({ category: "beauty" }).lean();
    } else {
        products = await Product.find().lean();
    }

    products.forEach((product) => {
        if (product.ratings && product.ratings.length > 0) {
            const count = product.ratings.length;
            const sumofrating = product.ratings.reduce((sum, r) => sum + r.rating, 0);
            product.AvgRating = sumofrating / count;
            product.ratingCount = count;
        } else {
            product.AvgRating = 0;
            product.ratingCount = 0;
        }
    });
    console.log("hello")
    if (q == "New Arrivals") {
        products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 
    } else if (q == "Top-rated Products") {
        products.sort((a, b) => b.AvgRating - a.AvgRating);
    }else if (q === "Customer%20Favorites") {
        products.sort((a, b) => b.buyCount - a.buyCount); 
    } else if (q === "Trading") {
        const orders = await Order.find().lean(); 
        const productIds = new Set(); 
        const orderedProducts = [];
        orders.forEach(order => {
            order.products.forEach(item => {
                if (!productIds.has(item.productId)) {
                    productIds.add(item.productId);
                    orderedProducts.push(item.productId); 
                }
            });
        });

        products = products.filter(product => orderedProducts.includes(product._id.toString()));
        products.sort((a, b) => {
            const orderA = orders.find(order => order.products.some(item => item.productId.toString() === a._id.toString()));
            const orderB = orders.find(order => order.products.some(item => item.productId.toString() === b._id.toString()));

            if (orderA && orderB) {
                return new Date(orderB.createdAt) - new Date(orderA.createdAt);
            }
            return 0;
        });
    }

    console.log(products);
    res.status(200).json({ data: products });
};
