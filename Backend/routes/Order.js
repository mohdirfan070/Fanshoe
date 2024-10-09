const express = require('express');
const authUser = require('../middleware/auth');
const { fetchOrder , updateOrder } = require('../controller/Order');
const router  = express();
router.route('/apiv1/getorders/:username').get(authUser,fetchOrder);
router.route('/apiv1/updateorder/:orderId/:status').patch( authUser , updateOrder );
module.exports= router; 