const { addItemToCart , updateCartItem , fetchCartProducts  , addItemToFav , removeItemToFav , deteleCartItem } = require('../controller/CartController');
const express =  require('express');
const authUser = require('../middleware/auth');
const router = express();

router.route('/apiv1/additemtocart').post(authUser,addItemToCart);
router.route('/apiv1/additemtofav').post(authUser,addItemToFav);
router.route('/apiv1/removeitemtofav').post(authUser,removeItemToFav);
router.route('/apiv1/productsfromcart').get(authUser,fetchCartProducts);
router.route('/apiv1/updatecartitem/:uid/:quantity').patch(authUser,updateCartItem);
router.route('/apiv1/deletecartitem/:uid').delete(authUser,deteleCartItem);
module.exports = router;