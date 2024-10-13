import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { userData } from '../App';
import baseurl from '../url';
const fetchOrders = async(username)=>{
    try {
      const res = await axios.get( baseurl+`/getorders/${username}` , { withCredentials: true });
      if(!res.data.status) throw Error("Something went wrong");

      return  res.data.data;
    } catch (error) {
      console.log(error);
    }
}
const handleCancel = async (orderId , status) =>{
  try {
    const res = await axios.patch(baseurl+`/updateorder/${orderId}/${status}` , { withCredentials: true });
    if(!res.data.status) throw Error("Something went wrong");
    return  res.data.data;
  } catch (error) {
    console.log(error);
  }
}

export default function UserMyOrders() {
  const { user } = useContext(userData);
  const [order , setOrder] = useState([]);
  useEffect(()=>{
    fetchOrders(user.username).then(result=>{
      setOrder([...result]);
    }).catch((err)=>{
      return null;
    })
  },[]);

  return <>
  <section className="right-div min-h-[795px]   flex-auto rounded-lg min-w-[320px] max-w-[900px] bg-slate-50 ">
    <div className="p-4  border-b-2 drop-shadow-sm flex w-full justify-between">
      <p className=" text-xl font-medium font3">My Orders</p>
    </div>
    {
      order && order.length!=0 ? (
        order.map((ele , i)=> <div key={ele.orderId} style={{backgroundColor:ele.status=="success"? "#e2e8f0" : "#f1f5f9 " }}  className='p-1 mb-1 w-full font3 font-medium min-h-[20vh] relative rounded border-b' >
          <span  style={{color:ele.status=="pending" ? "palevioletred":ele.status=="success"? "#64748b" : ele.status=="inTransist" ? "orange": ele.status=="deliverd"? "green" : ele.status=="canceled" ? "red" : ele.status=="return" ? "blue" : " "}} className='absolute right-2 top-1 uppercase' >{ele.status}</span>
          <span>Ordered On : { new Date(ele.createdAt).toLocaleString() }</span> <br />
           <span>Amount:  ₹{ele.amount}</span> <br />
            <ol>
             
            {ele.products.map(item=>  <li>{item.title+" x "+item.quantity }</li>)}
            </ol>

            {
              ele.status=="pending" ? ( <button onClick={(e)=>{handleCancel(ele.orderId , "canceled"),e.target.innerHTML="Canceled"}} className='px-2 py-1 bg-red-500 rounded-md font3 font-medium text-white' >Cancel Order</button> ) : (ele.status=="delivered")? <button className='px-2 py-1 bg-orange-400 rounded-md  font3 font-medium text-white' >Return</button> :  ""  
            }
          </div>)
       
      ) :  ( order && order.length==0)? ( <div className="w-full min-h-[50vh] flex justify-center items-center ">
        
          <span>Please Wait...</span>
       
      </div>) :  <span>No Orders Yet!</span> 
    }
  </section>
</>
}
