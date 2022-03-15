/**
 * Node module imports
 */
const {
    Router
} = require("express");

/**
 * Middleware Imports
 */
const protect = require("../../middlewares/protect")
const role = require("../../middlewares/role")

/**
 * Controller imports
 */
const {
    getAllProducts,
    getOneProduct
} = require("../../controllers/product/product.controller");
const {
    addNewProduct,
    editProduct,
    deleteProduct
} = require("../../controllers/product/auth.controller");
const { ROLES } = require("../../middlewares/role");

const ProductRouter = Router();


ProductRouter.route('/products')
    .get(getAllProducts)
    .post(protect, addNewProduct)

ProductRouter.route('/products/new')
    .get(protect, (req, res) => {
        res.render('products/new');
    })

ProductRouter.route('/products/:id')
    .get(getOneProduct)
    .delete(deleteProduct);

ProductRouter.route('/products/:id/edit')
    .get(editProduct)


module.exports = ProductRouter;