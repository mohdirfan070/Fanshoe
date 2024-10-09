// const mongoose = require('mongoose');
const User = require('../modals/userSchema.js');
const Cart = require('../modals/cartSchema.js');
// const jwt = require('jsonwebtoken');

// {
//     username: 'mohammedirfanrj@gmail.com',
//     id: '66e9b3d600d21994a6b53391',
//     iat: 1727429084
//   }

//data { name: 'Nike Air Max 270', id: '1', quantity: 1, price: 333 }

// userData {   username: 'mohammedirfanrj@gmail.com',
//     id: '66e9b3d600d21994a6b53391',
//     iat: 1727429084
//   }



const addItemToCart = async (req, res) => {
    const { userData } = req.dataFromAuth;
    const data = req.body;
    try {
        Cart.findOneAndUpdate({ user: userData.id }, { $push: { products: { uid: data.id + "-" + Date.now(), "productId": data.id, "quantity": parseInt(data.quantity), "title": data.title, "size": "Not Yet Done", "price": data.price } } }).then((result2) => {
            res.json({ msg: "Done!", status: true });
        })

    } catch (response) {
        res.json({ msg: "Failed!", status: false });
    }

}

const fetchCartProducts = async (req, res) => {
    const { userData } = req.dataFromAuth;
    // console.log(userData.id)
    try {
        const cart = await Cart.findOne({
            $and: [
                { user: userData.id },
                { "products.quantity": { $gt: 0 } }
            ]
        });
        // console.log(cart);
        await res.json({ msg: "Working", status: true, data: cart });
    } catch (cart) {
        // console.log(cart)
        res.json({ msg: "Error", status: false });
    }
}



const addItemToFav = async (req, res) => {
    const { userData } = req.dataFromAuth;
    const data = req.body;
    try {
        const response = await User.findByIdAndUpdate(userData.id, { $addToSet: { favorite: { "productId": data.id } } }, { new: true });
        if (!response) throw response;
        res.json({ msg: "Done!", status: true });
    } catch (response) {
        res.json({ msg: "Failed!", status: false });
    }

}

const removeItemToFav = async (req, res) => {
    const { userData } = req.dataFromAuth;
    const data = req.body;
    try {
        const response = await User.findByIdAndUpdate(userData.id, { $pull: { favorite: { "productId": data.id } } }, { new: true });
        if (!response) throw response;
        res.json({ msg: "Done!", status: true });
    } catch (response) {
        res.json({ msg: "Failed!", status: false });
    }

}

const updateCartItem = async (req, res) => {
    const { quantity, uid } = req.params;
    const { userData } = req.dataFromAuth;
    // console.log( { quantity, uid , sign , price } )
    try {
        if (quantity == 0) {
            await Cart.findOneAndUpdate({ user: userData.id }, { $pull: { "products": { uid: uid } } }, { new: true });

        } else {
            await Cart.updateOne({ "products.uid": uid }, { "products.$.quantity": Number(quantity) }, { new: true });

        }
        res.json({ msg: "Working", status: true })
    } catch (error) {
        console.log(error)
        res.json({ msg: "Somethibg went wrong", status: false });
    }
}

const deteleCartItem = async (req, res) => {
    const { userData } = req.dataFromAuth;
    const { id, uid } = req.params;
    try {
        await Cart.findOneAndUpdate(
            { user: userData.id },
            {
                $pull: { "products": { "uid": uid } },
            },
            { new: true })

        res.json({ msg: "Removed", status: true });
        // console.log(result)
    } catch (error) {
        // console.log(error)
        res.json({ msg: "Error " + id, status: false });
    }
    // console.log(id)
}



module.exports = { addItemToCart, addItemToFav, removeItemToFav, fetchCartProducts, updateCartItem, deteleCartItem };