const Product = require('../modals/productSchema');
const addProduct = async (req, res) => {
    console.log(req.file ? req.file : "");
    const { data } = req.body;
    const { userData } = req.dataFromAuth;
    try {
        // console.log(data ? data : "");
        const Product1 = new Product({ title: data.title, id: data.id, category:data.category.split(','), description: data.description, price: data.price, stock: data.stock, unit: data.unit, status: data.status,discount:data.discount,ownerId:userData.username });
        const response = await Product1.save();
        if(!response) throw response;
        // console.log(response);
        res.json({ msg: "New Product Added!",status:true});
    } catch (response) {
        // console.log(response);
        res.json({ msg: "Error!",status:false,reason:"Id Already Exists"});
    }

}

module.exports = { addProduct };