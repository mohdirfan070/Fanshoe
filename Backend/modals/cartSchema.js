const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: String,
        default:"admin"
    },
  
    products: {
        type: [],
        default:[]
    },
   
     
}, { timestamps: true });



module.exports = mongoose.model("Cart", cartSchema);