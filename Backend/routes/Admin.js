const { addProduct } =  require('../controller/adminProducts');
const express =  require('express');
const authUser = require('../middleware/auth');
const router = express();
const upload = require('../utils/multer.js');
// Serve static files from the uploads directory  :: express.static('uploads')
router.route('/apiv1/addproductimages').post(authUser,express.static('uploads'),upload.array('image',4),addProduct);
router.route('/apiv1/addproductinfo').post(authUser,addProduct);
module.exports = router;
