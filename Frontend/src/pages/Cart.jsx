import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { userData } from "../App";
import CartItem from "../components/CartItem";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const fetchProducts = async () => {
  try {
    const res = await axios.get(`/apiv1/productsfromcart` , { withCredentials: true });
    console.log(res)
    if (!res.data) throw new Error("No data found");
    return res.data;
  } catch (error) {
    // console.error(error);
    return [];
  }
};

const notify = (msg, type, theme, autoClose) => {
  toast(msg, { type, theme, autoClose });
};

const handlePayment = async (amount ,  products , user  , updatorFunc)=>{
  try {
    const res = await axios.post(`/apiv1/order/`,{ amount:amount*100 , notes:products , receipt: `${Math.floor(Math.random()*999999)+999999}`}  , { withCredentials: true } )
    if (!res.data) throw new Error("No data found");
    //  console.log(res.data);
     var option = {
      key:"",
      currency:"INR",
      description:"TEST",
      amount: amount*100,
      name:"Fanshoe",
      order_id:res.data.order.id,
      // image:image Link
      handler:async function(response) {
        //  alert("Transaction is Successfull");
        const body = {...response};
        const isValidPayment = await axios.post('/apiv1/validate', {...body , amount , products , user} , { withCredentials: true });
        // console.log(isValidPayment);
        if(!isValidPayment.data.status) notify(isValidPayment.data.msg,"error","light",2000);
        updatorFunc(Math.random());
        notify("Ordered Successfull","success","light",2000);
      },
      prefill:{
        name:user.name,
        email:user.username,
        contact:user.mobileNumber
      },
      notes:{
        address:user.address
      },
      theme:{
        color:'#dc2626'
      }
    }
    var razp1 = new Razorpay(option);

    razp1.on("Payment Failed",(response)=>{
        alert(response.error.code),
        alert(response.error.description)
    });

    razp1.open();

  } catch (error) {
    console.error(error);
    return [];
  }
}

export default function Cart() {
  const { user } = useContext(userData);
  const [fetchAgain, setFetchAgain] = useState(0);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts()
    .then((result) => {
    
      if(!result.data.products) throw result.data;
        setProducts([...result.data.products]);
      })
      .catch((err) => {
        setProducts([]);
      });
  }, [fetchAgain]);



  return (
    <>
      <section className="right-div min-h-[90vh]   flex-auto min-w-[320px] max-w-full rounded overflow-y-auto ">
        <div className="p-4  border-b-2 border-slate-400 drop-shadow-sm flex w-full justify-between">
          <p className=" text-[3vh] font-medium font3">My Cart</p>
        </div>
        <div className="flex justify-center items-start h-full w-full">
          <div className="left-div  bg-slate-100 min-w-[60vw] min-h-[70vh] p-2 ">
            {products && products.length != 0
              ? products.map((ele, i) => (
                  <CartItem
                    key={i + ele.uid}
                    data={ele}
                    updateFetchAgain={setFetchAgain}
                  />
                ))
              : <p className="ml-[43%] mt-[25%] font3 font-medium text-red-600" >Cart Is Empty</p> }
          </div>
          <div className="right-div bg-slate-300   min-h-[70vh] p-3  min-w-[320px]">
            <section className="bg-slate-100 p-2 my-2 rounded-lg min-h-[40vh] min-w-[320px] "> 

              <table className="w-full min-w-[320px] border-y-2 rounded" >
                <thead className="w-full" >
                  <tr className="w-full border-b-2" >
                    <th colSpan={1} className="text-[0.8rem] border-x border-slate-400 " >Sl.NO/Id</th>
                    <th colSpan={5} className="text-[0.8rem] border-r border-slate-400 " >Name</th>
                    <th colSpan={1} className="text-[0.8rem] border-r border-slate-400 " >Quantity</th>
                    <th colSpan={1} className="text-[0.8rem] border-r border-slate-400 " >Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products && products.length != 0
              ? products.map((ele, i) => (
                <tr key={ele.productId+'/'+i} className="w-full hover:bg-slate-300 hover:cursor-pointer" >
                        <td className="text-[0.8rem] text-center border-x border-slate-400 " colSpan={1} >{i+1+"/"+ele.productId}</td>
                        <td className="text-[0.8rem] text-center border-r border-slate-400 " colSpan={5} >{ele.title.split(" ")[0]+" "+(ele.title.split(" ")[1] ? ele.title.split(" ")[1]: "" )}</td>
                        <td className="text-[0.8rem] text-center border-r border-slate-400 " colSpan={1} >{ele.quantity}</td>
                        <td className="text-[0.8rem] text-center border-r border-slate-400" colSpan={1} >{ele.price*ele.quantity}</td>
                  </tr>
                ))
              :null}
                </tbody>
              </table>


              {/* <p className="border-b-2 w-full font2 text-red-600 font-semibold text-[2.5vh]">
                Overview:
              </p> */}

              <p className="font-semibold font2 text-end relative pr-4 my-2">
                <span className=" absolute left-1 text-red-600 font-medium  font2">
                  Total Items:
                </span>{" "}
                {products && products.length != 0
                  ? products.reduce((acc, ele) => {
                      return (acc += ele.quantity);
                    }, 0)
                  : "0"}
              </p>
              <p className="font-semibold font2 text-end relative pr-4 border-b-2">
                <span className=" absolute left-1 text-red-600 font-medium  font2">
               Delivery Charges:
                </span>{" "}
                <span >
                ₹50
                  </span>

              </p>
              <p className="font-semibold font2 text-end relative pr-4 border-b-2">
                <span className=" absolute left-1 text-red-600 font-medium  font2">
                  Total Price:
                </span>{" "}
                <span id="amount">
                ₹{products && products.length != 0
                  ? products.reduce((acc, ele) => {
                    return (acc += ele.price * ele.quantity);
                  }, 0)+50
                  : "0"}
                  </span>

              </p>
            
              <p className="text-wrap font-medium font2 max-w-[20vw]">
                Deliver to: <em>{user.name}</em> <br />
                {user.address}
              </p>
              <p className="text-wrap font-medium  font2">
                Phone:+91 {user.mobileNumber}
              </p>
              <p className="text-wrap font-medium  font2">
                PINCODE: {user.pincode}
              </p>

              <section>
                {/* <input type="radio" name="payment" id="cod" />
                <label htmlFor="cod">Cash On Delivery</label> <br />
                <input type="radio" name="payment" id="Online" />
                <label htmlFor="Online">Pay Now</label> */}
                <button onClick={()=>handlePayment(products.reduce((acc, ele) => {
                    return (acc += ele.price * ele.quantity);
                  }, 0)+50 , products , user , setFetchAgain )} className="px-4 py-2 bg-red-600 text-white font3 font-medium rounded" >Pay Now</button>
              </section>
            </section>
            <section>
              <input
                className="font2  p-2 rounded outline-none"
                type="text"
                placeholder="Have a Coupon?"
              />
              <button className="bg-red-600 px-4 py-2 font2 font-medium text-white rounded-r-lg">
                Add
              </button>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
