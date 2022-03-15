const catchAsync = require("../../utils/catchAsync");
const Product = require("../../models/product.model")

module.exports.addNewProduct = catchAsync(async(req, res)=>{

    // 1. Getting the user from the request
    const user = req.user;

    // 2. Get the data from the form
    const { title, description, images, basePrice, duration, category } = req.body.product;

    // 3. Check if all the data is present
    if(!title || !description || !images || !basePrice || !duration || !category){
        return res.status(400).send({
            success: false,
            message: "All the fields are required"
        })
    }

    // 4. Create a new product object
    const newProduct = new Product({
        title,
        description,
        images,
        basePrice,
        duration,
        category,
        user: user._id
    });

    // 5. Save the reference of the product in the user's products array
    user.products.push(newProduct);

    // 7. Save the product and the user
    await newProduct.save();
    await user.save();

    // 8. Populate the user and render the details page
    const product = await Product.findById(newProduct._id).populate('User');
    
    // return res.status(200).send({product, user})
    res.render("products/detail", { product });
})

module.exports.editProduct = catchAsync(async (req, res)=>{
    // ! Later
    res.send({ "msg": "working on it" })
})

module.exports.deleteProduct = catchAsync(async (req, res)=>{
    // !Later
    res.send({ "msg": "working on it" })
})