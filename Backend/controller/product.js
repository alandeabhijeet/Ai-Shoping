let Product = require("../models/product.js")

module.exports.add = async(req , res , next)=>{
    console.log("in add ")
    const { name, category, description, price, stock } = req.body;
    let {path , filename } = req.file; 
    let images = path; 
    console.log(image)
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


module.exports.list =async (req , res , next)=>{
    // req.user
    console.log("in")
    const products = await Product.find();
    console.log(products)

    res.status(201).json( {data: products})
}