const User = require('../modals/userSchema.js');
const jwt = require('jsonwebtoken');

const authUser = async(req,res,next)=>{
    //  console.log(req)
    try{
        const cookie = req.cookies.token;
  
        const token  = cookie.split(";")[0].split(' ')[1];
        // console.log(token)
        const isAuth = jwt.verify(token,process.env.JWT_SECRET);
        // console.log(isAuth)
        await User.findOne({username:isAuth.username},{id:isAuth.id}).then((result)=>{
            if(!result) throw result;
            req.dataFromAuth = { userData : isAuth };
            next();
    })}
    catch(result){
        // console.log(result);
        res.json({msg:"Authentication Failed",status:false});
    };
   }


module.exports = authUser;