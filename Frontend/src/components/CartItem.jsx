import { useEffect, useState , useContext } from "react";

import axios from "axios";
import {userData }  from '../App';


const updateCartProduct = async (uid , quantity )=>{
  try {
      const res  = await axios.patch(`/apiv1/updatecartitem/${uid}/${quantity}` , { withCredentials: true });
      if(!res.data.status) throw res;
      func(Math.random());
  } catch (res) {
    // alert("Error "+res.data.msg);
  }
}

const handleDelete = async (data)=>{
  try {
    const res  = await axios.delete(`/apiv1/deletecartitem/${data.uid}` , { withCredentials: true });
    if(!res.data.status){ throw Error("Something Went Wrong!")}
    
} catch (error) {
  // console.log(error);
  }
}



export default function CartItem(prop) {
  const[hide , setHide] = useState(false); 
  const [product, setProduct] = useState({
    title: prop.data.title,
    id: prop.data.id,
    quantity: prop.data.quantity,
  });

  useEffect(()=>{
    if(product.quantity!=prop.data.quantity){
      const sentId =  setTimeout(() => {
         updateCartProduct(prop.data.uid , product.quantity);
         prop.updateFetchAgain(Math.random());
      }, 1000);
      return ()=>clearInterval(sentId);
    }

  },[product.quantity]);

  return (
    // 
    // func2(Math.random())
    <div  style={{display:(product.quantity == 0 || hide )? "none" : ""}} className="bg-slate-200 select-none  w-[80%] h-[15vh] border-b-2 px-[4vh] flex justify-between items-center gap-x-6 mx-auto rounded mb-1">
      <p className="font2 font-base text-[2.3vh]">{prop.data.productId}</p>
      <p className="font3 font-base text-[3vh]">{prop.data.title.split(" ")[0]+" "+(prop.data.title.split(" ")[1] ? prop.data.title.split(" ")[1] : "" )}</p>
      <div className="   flex gap-x-4 justify-between  items-baseline">
        <p className="text-[2.6vh]" >
        ₹{Math.floor(prop.data.price*product.quantity)}
        </p>
        <section className="flex gap-x-4 justify-between  items-baseline">
          <button
            className="font-semibold text-[3.5vh] py-1"
            onClick={() =>{
              product.quantity >1  &&  (setProduct({...product,quantity:product.quantity-1}) )
            }
            }
          >
            -
          </button>
          <p className="font3 font-base text-[3.5vh] text-blue-600 ">
            {product && product.quantity ? product.quantity : 0}
          </p>
          <button
            onClick={() =>{
              setProduct({...product,quantity:product.quantity+1}) 
            }}
            className="font-semibold text-[3.5vh] py-1"
          >
            +
          </button>
        </section>
        <section>
          <button 
          onClick={()=>{handleDelete(prop.data) , prop.updateFetchAgain(Math.random())
             ,setHide(!hide)
          }} 
           >
            <img
             className="min-h-[2.5vh] max-h-[3vh]"
              src="./src/assets/deleteIcon.svg"
              alt=""
            />
          </button>
        </section>
      </div>
    </div>
  );
}
