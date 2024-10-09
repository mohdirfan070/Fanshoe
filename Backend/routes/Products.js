const express =  require('express');
const authUser = require('../middleware/auth');
const router = express();
const { fetchAllProducts , fetchFav , fetchToUpdate , updateProduct } = require('../controller/Products.js');

// router.route('/apiv1/products/:limit/:page').get(authUser,fetchAllProducts);
router.route('/apiv1/products/:page').get(authUser,fetchAllProducts);
router.route('/apiv1/productsfromfav/:id').get(authUser,fetchFav);
router.route('/apiv1/getproducttoupdate').get(authUser,fetchToUpdate);
router.route('/apiv1/updateproduct').patch(authUser,updateProduct);

module.exports = router;