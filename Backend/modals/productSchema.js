const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true,
        unique: true,
        
    },
    images:{
        type: [],
    },
    category: {
        type: [],
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    stock:{
        type:Number,
        default:0
    },
    active:{
        type:Boolean,
        default:true
    },
    unit:{
        type:String,
    },
    ownerId:{
        type:String,
        required:true
    }
    , createdAt:{
        type : Date,
        default:  Date.now(),
    }
    , updatedAt:{
        type : Date,
        default:  Date.now(),
    }

}, { timestamps: true  });

module.exports = mongoose.model("Product", productSchema);