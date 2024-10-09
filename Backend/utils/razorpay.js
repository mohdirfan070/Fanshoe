// Payment Gateway Integeration
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../modals/orderSchema.js');
const Cart = require('../modals/cartSchema.js');
const createOrderId = async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_ID,
            key_secret: process.env.RAZORPAY_API_KEY,
        });
        if (!req.body) res.status(500).json({ msg: "BAD REQUEST" });
        const option = req.body;
        // console.log(option)
        const order = await instance.orders.create(option);
        if (!order) res.status(500).json({ msg: "BAD REQUEST" });
        // console.log(order)
        res.status(200).json({ msg: "Working", order });
    } catch (error) {
        // console.log(error)
        res.status(500).json({ msg: "BAD REQUEST" })
    }
}

const validatePayment = async (req, res) => {
    const {userData} = req.dataFromAuth;
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, products, user } = req.body
        const sha = crypto.createHmac("sha256", process.env.RAZORPAY_API_KEY);
        sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = sha.digest("hex");
        if (digest !== razorpay_signature) {
            return res.status(400).json({ msg: "Payment Unsuccessfull", status: false });
        }
        const newOrder = await Order.create({
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            amount: Number(amount),
            username: user.username,
            mobileNumber: Number(user.mobileNumber),
            address: user.address,
            status: "pending",
            products: [...products]
        });

            await Cart.findOneAndUpdate({user:userData.id},{$pullAll:{products}})

        if (newOrder) {
            res.status(200).json({
                msg: "Transaction is legit!",
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
                amount,
                products,
                user,
                status: true
            });
        } else {
            res.status(400).json({ msg: "Something Went Wrong Try Again", status: false });
        }
    }
    catch (error) {
        // console.error(error);
        res.status(500).json({ msg: "Internal Server Error", status: false });
    }

}


module.exports = { createOrderId, validatePayment };