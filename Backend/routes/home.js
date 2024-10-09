const express = require('express');
const router = express();
const {homeRouteFunc} = require('../controller/home.js');
router.route('/api').get(homeRouteFunc);

module.exports = router;