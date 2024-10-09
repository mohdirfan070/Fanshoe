const Order = require('../modals/orderSchema.js');

const fetchOrder = async (req,res) => {
    const username = req.params.username;    
    try {
            const response  =  await Order.find({username}).sort({createdAt:-1});
            res.status(200).json({msg:"Success",status:true , data: response});
        } catch (error) {
            res.status(402).json({msg:"Bad Request",status:false });
        }
}


const updateOrder = async (req,res) => {
const { orderId , status  } = req.params;    

try {
        const response  =  await Order.findOneAndUpdate({orderId},{status});
        res.status(200).json({msg:"Success",status:true});
    } catch (error) {
        res.status(402).json({msg:"Bad Request",status:false });
    }
}

module.exports = { fetchOrder  , updateOrder };