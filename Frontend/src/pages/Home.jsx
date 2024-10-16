import React, { useContext, useEffect, useState } from "react";
// import products from "../assets/Products.js";
import Product from "../components/Product.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseurl from '../url.js';
const notify = (msg, type, theme, autoClose) => {
  return toast(msg, { type, theme, autoClose });
};

const fetchProducts = async (page) => {
  try {
    const res = await axios.get( baseurl+`/products/${page}`,{withCredentials:true});
    // console.log(res)
    // if (!res.data ) throw res;
    // console.log(res.data)
    return res.data;
  } catch (res) {
    // console.log(res);
   return res.data ;
  }
};

export default function Home() {
  const [query  , setQuery ] = useState("");
  const [inittialProducts , setInitialProducts ] = useState([]) 
  const [page , setPage] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts(page)
      .then((result) => {
      //  console.log(result)

          result.status
          ? (result.end)? (setPage(-1)) :  (setProducts([...products,...result.data]) ,  setInitialProducts ([...products,...result.data]) ) 
          :  notify(result.msg + " Please Login", "error", "light", 3000);
      
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [page]);

  useEffect(()=>{
      if(query=="lowtohigh"){
        setProducts([...products.sort((a,b)=>a.price-b.price)])
      }
      if(query=="hightolow"){
        setProducts([...products.sort((a,b)=>b.price-a.price)])
      }
      if(query=="latest"){
        setProducts([...products.sort((a,b)=>new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime())])
      }
      if(query=="maxDiscount"){
      
        setProducts([...products.sort((a,b)=>b.discount-a.discount)])
      }
      if(query==""){
        setProducts([...inittialProducts])
      }
  },[query]);

  return (
    <>
      { products.length != 0  ? (
        <div className="w-full h-full m-auto flex  justify-center items-start">
          <div className="left-div w-[20%] p-1  min-h-screen flex justify-start items-start flex-col sticky top-[15vh] ">
            {/* <button className="py-[1vh] px-[1vw]  font2 border-[0.3vh] border-slate-500 min-w-[1.8vh] text-[2.3vh] font-semibold  rounded-[0.3vh]">
              {" "}
              Filter{" "}
              <img
                className="h-[3vh] inline-block"
                src="./src/assets/filterIcon.png"
                alt=""
              />{" "}
            </button> */}

            <button style={{backgroundColor:query=="latest"?" #cbd5e1":"" , color:query=="latest"?"#E3242B":""}} onClick={()=>setQuery("latest")} className="text-[2.1vh] p-[0.8vh] w-full bg-slate-100 m-[0.123rem] rounded-full border font2 font-medium ">
              Latest
            </button>
            <button  style={{backgroundColor:query=="maxDiscount"?" #cbd5e1":"" ,  color:query=="maxDiscount"?"#E3242B":"" }} onClick={()=>setQuery("maxDiscount")} className="text-[2.1vh] p-[0.8vh] w-full bg-slate-100 m-[0.123rem] rounded-full border font2 font-medium ">
              Best Deal
            </button>
            <button  style={{backgroundColor:query=="lowtohigh"?" #cbd5e1":"" ,  color:query=="lowtohigh"?"#E3242B":""}} onClick={()=>setQuery("lowtohigh")} className="text-[2.1vh] p-[0.8vh] w-full bg-slate-100 m-[0.123rem] rounded-full border font2 font-medium ">
              Price Low to High
            </button>
            <button  style={{backgroundColor:query=="hightolow"?" #cbd5e1":"" ,  color:query=="hightolow"?"#E3242B":""}} onClick={()=>setQuery("hightolow")} className="text-[2.1vh] p-[0.8vh] w-full bg-slate-100 m-[0.123rem] rounded-full border font2 font-medium ">
              Price High to Low
            </button>
            <button style={{backgroundColor:query==""?" ":""}} onClick={()=>setQuery("")} className="text-[2.1vh] p-[0.8vh] w-full bg-slate-100 m-[0.123rem] rounded-full border font2 font-medium ">
              Remove Filters
            </button>
          
          </div>

                
          <div className="main    max-w-[80%] min-h-max flex flex-col justify-start items-center">
            <div className="main    max-w-[80%] min-h-max flex flex-wrap justify-center   items-stretch" >
            {products.map((ele, i) => (
              <Product key={i} product={ele} />
            ))}
            </div>
            {
              page >=0 ? <button onClick={()=>setTimeout(()=>setPage(page+1),300)} className="hover:underline px-4 py-2 bg-slate-200 rounded-full text-blue-600 font3 font-medium my-6 " >Load More</button>
                :   <button className="px-4 py-2 bg-slate-200 rounded-full text-blue-600 font3 font-medium my-6 " >END</button>
            }
          </div>



          {/* <div className="right-div w-[10%] min-h-screen ">
            {" "}
            Right Nav
          </div> */}
        </div>
      ) : (
        <div className="w-full min-h-[50vh] flex justify-center items-center ">
          <Link
            to={"/login"}
            className=" bg-slate-100 font3 font-semibold px-3 rounded-fulltext-red-600 text-[10vh]"
          >
            <span> Please Wait...</span>
          </Link>
        </div>
      )  }
    </>
  );
}
