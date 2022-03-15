const User = require("../../models/user.model");
const catchAsync = require("../../utils/catchAsync")

/**
 * Get all users
 */
module.exports.getAllUsers = catchAsync(async (req, res) => {
    const users = await User.find({});
    res.status(200).send(users)
});


/**
 * Get user profile (This can only be accessed by the logged in user)
 */
module.exports.getProfile = catchAsync(async (req, res)=>{
    const user = req.user;
    return res.render("users/profile", { user })
})

/**
 * This will be a public profile of the user.
 */
module.exports.getUser = catchAsync(async (req, res)=>{
    const user = await User.findById(req.params.id).populate('products');
    return res.render("users/detail", { user });
})