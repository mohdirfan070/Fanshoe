const express = require('express');
const router = express();
const authUser = require('../middleware/auth.js');
const {Login , SignUp , getUSer  , updateUser } = require('../controller/User.js');
router.route('/apiv1/login').post(Login);
router.route('/apiv1/signup').post(SignUp);
router.route('/apiv1/getuser').get(authUser,getUSer);
router.route('/apiv1/updateuser').patch(authUser,updateUser);
module.exports =  router;