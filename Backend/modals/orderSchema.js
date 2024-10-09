const mongoose = require('mongoose');


const orderSchema  = new mongoose.Schema({
    orderId:{
        type:String,
        required:true
    },
    paymentId:{
        type:String,
        required:true
    },
    products:{
        type:[Object],
    },
    amount:{
        type:Number,
        required:true,
        default:0
    },
    username:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
      
        enum:["pending", "successfull" , "inTransist" , "delivered", "canceled","return"],
        default:"pending",
    }
},{timestamps:true});

module.exports = mongoose.model("Order" , orderSchema );