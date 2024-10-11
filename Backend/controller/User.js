const User = require('../modals/userSchema.js');
const Cart = require('../modals/cartSchema.js');
const Product = require('../modals/productSchema.js');
const jwt = require('jsonwebtoken');


const generateToken = async (username, id) => {
    return jwt.sign({ username, id }, process.env.JWT_SECRET);
}

const getUSer = async (req, res) => {
    try {
        const cookie = req.cookies.token;
        const token =cookie.split(";")[0].split(' ')[1];
        const isAuth = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({username:isAuth.username});
        res.json({msg:"working",status:true,data:{username:user.username,mobileNumber:user.mobileNumber,name:user.name,gender:user.gender,age:user.age,address:user.address,favorite:user.favorite,items:user.items,total:user.total,pincode:user.pinCode}});
    } catch (error) {
        res.json("Error");
    }
}

const updateUser = async(req,res)=>{
    const { userData } = req.dataFromAuth;
    const inpData = req.body;
  
    try {
      const response  = await User.findByIdAndUpdate(userData.id ,{name:inpData.name , username:inpData.username , age:inpData.age,address:inpData.address , mobileNumber:inpData.mobileNumber , gender:inpData.gender , pinCode:inpData.pincode});
           await Product.findOneAndUpdate({ownerId:userData.id},{ownerId:inpData.username });
      if(!response) throw response;
      res.json({msg:"Updated Successfull",status:true});
    } catch (response) {
        // console.log(response)
        res.json({msg:"Update Failed",status:false});
    }
}


const Login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user.password != password) throw user;
        const token = await generateToken(username, user.id);
        // res.cookie("token", `Bearer ${token}; expires:${new Date(Date.now() +5000000)}; path:/;`);
        res.cookie("token",`Bearer ${token}` , { httpOnly: true,
            secure: true,
         
            maxAge: 900000, // 15 minutes
            path: '/' })
        res.json({ msg: "Login Successfull", status: true, data: { name: user.name, username: user.username, gender: user.gender } });
    } catch (user) {
        res.cookie('token');
        res.json({ msg: "Incorrect Username or Password", status: false });
    }
}

const SignUp = async (req, res) => {
    const { name, address, age, username, password, gender, mobileNumber, cartId  , pincode } = req.body;
    console.log(pincode)
    try {
        const resp1 = await User.findOne({ username });
        if (resp1) throw resp1;
        const resp2 = await Cart.create({});
        const resp3 = await User.create({ name, address, age, username, password, gender, mobileNumber, cartId: resp2.id ,  pinCode:pincode });
        await Cart.findOneAndUpdate({ user: resp3.id });
        const token = await generateToken(username, resp3.id);
        res.cookie("token", `Bearer ${token}` , { httpOnly: true,
            secure: true,
         
            maxAge: 900000, // 15 minutes
            path: '/' })
        res.json({ msg: "SignUp Successfull", status: true, data: { name, address, age, username, password, gender, mobileNumber, cartId }, newUser: resp3.username });

    }
    catch (err) {
        // console.log(err)
        res.cookie('token', "");
        res.json({ msg: "Email Already Exists!", status: false });
    }
}


module.exports = { Login, SignUp, getUSer , updateUser };


module.exports = { Login, SignUp, getUSer , updateUser };
