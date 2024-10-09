const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    address: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: Number,
        required: true,
        maxlength: 10
    },
    cartId: {
        type: String,

    },
    age: {
        type: Number,
        maxlength: 2
    },
    favorite: {
        type: [],
    },
    pinCode: {
        type: Number,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);