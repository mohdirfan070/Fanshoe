const express = require('express');
const router = express();
const { createOrderId  , validatePayment }  = require('../utils/razorpay.js');
const authUser = require('../middleware/auth.js');
router.route('/apiv1/order').post(authUser,createOrderId);
router.route('/apiv1/validate').post(authUser,validatePayment);
module.exports = router;