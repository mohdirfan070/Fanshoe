const Product = require('../modals/productSchema');
const User = require('../modals/userSchema');

const fetchAllProducts = async (req, res) => {
    const page = req.params.page;
    // console.log({page})
    try {          
        // // .sort({stock:1}).limit(3)
        if(page<0){  res.json({ msg: "Working", status: true, end:true})}
        else{
            const response = (await Product.find({ active: true }).skip(page*4).limit(4));
            if(response.length!=0){
                res.json({ msg: "Working", status: true, data: response , end : false});
            }else{
                res.json({ msg: "Working", status: true, end:true});
            }
        }
        // console.log(response);
        // if (!response) throw response;
        // if(response.length==0){
        //     res.json({ msg: "Working", status: true, end:true , data: response});
        // }else{
        //     res.json({ msg: "Working", status: true, data: response , end : false});
        // }
    

    } catch (response) {
        // console.log(response);
        res.json({ msg: "Error", status: false });
    }
}

// To Handle Multiple Fetch Operation Using Promise.all()
const fetchEachItem = async (id) => {
    return await Product.findOne({id});
}

const fetchFav = async (req, res) => {
    const { userData } = req.dataFromAuth;
    try {
        const user = await User.findById(userData.id);
        const items = await Promise.all(
            user.favorite.map(ele => fetchEachItem(ele.productId))
        );
        if (items.length==0) throw items;
        await res.json({ msg: "Working", status: true, data: items });
    } catch (items) {
        // console.log(items)
        res.json({ msg: "Error", status: false});
    }
}

const fetchToUpdate = async (req, res) => {
    const { userData } = req.dataFromAuth;
    try {
        const response = await Product.find({ ownerId: userData.username });
        // console.log(response);
        if (!response) throw response;
        res.json({ msg: "Working", status: true, data: response });
    } catch (response) {
        // console.log(response);
        res.json({ msg: "Error", status: false });
    }
}

const updateProduct = async (req, res) => {
    const { userData } = req.dataFromAuth;
    const inpData = req.body;
    // console.log(inpData);
    try {
        if (inpData.ownerId != userData.username) throw null;
        const response = await Product.findByIdAndUpdate({ _id: inpData._id }, { id: inpData.id, price: inpData.price, stock: inpData.stock, active: inpData.active, title: inpData.title, discount: inpData.discount }, { new: true });
        // console.log(response);
        if (!response) throw response;
        res.json({ msg: "Updated Successfull ", status: true, "data": inpData, "response": response.data });
    } catch (response) {
        // console.log(response);
        res.json({ msg: "Somethinng Went Wrong!", status: false });
    }
}


module.exports = { fetchAllProducts, fetchToUpdate, updateProduct, fetchFav };