import React, { useState, useContext } from "react";
import axios from "axios";
import { userData } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import baseurl from "../url";

const notify = (msg, type, theme, autoClose) => {
  return toast(msg, { type, theme, autoClose });
};



export default function Product(prop) {
  const { user, updateproducts } = useContext(userData);
  const navigate = useNavigate();
  const [showMore , setShowMore] = useState(false);
  const addItemToCart = async (data) => {
    const res = await axios.post(baseurl+"/additemtocart", data , { withCredentials: true });
    // console.log(res.data)
    if (res.data.status) {
      updateproducts(Math.random());
      notify("Added To Cart", "success", "light", 500);
    }
  };
  

  const addToFav = async (data) => {
    const res = await axios.post(baseurl+"/additemtofav", data , { withCredentials: true });
    if (res.data.status) {
      notify("Added To Favorite", "success", "light", 1000);
      updateproducts(Math.random());
    }
  };

  const removeitemtofav = async (data) => {
    const res = await axios.post(baseurl+"/removeitemtofav", data , { withCredentials: true });
    if (res.data.status) {
      notify("Removed From Favorite", "success", "light", 1000);
      updateproducts(Math.random());
    }
  };

  const [fav, setFavorite] = useState(false );
  const [product1, setProduct1] = useState({
    name:prop.product && prop.product.title ? prop.product.title : "",
    id:prop.product && prop.product.id ? prop.product.id : "",
    title:prop.product.title,
    quantity: 1,
    // token : document.cookie && document.cookie.split("=")[1].split("%20")[1]?  document.cookie.split("=")[1].split("%20")[1] : "",

    price:prop.product && prop.product.price ?  prop.product.price - prop.product.price * (prop.product.discount / 100)  : 0,
  });


  return (
    <>
    
      <div className="col-span-2 row-span-1 flex flex-col justify-start relative flex-auto rounded  p-2 shadow-lg min-w-[21vw] min-h-[1vh] max-w-[330px] bg-white m-1">
        <section className="border  overflow-hidden relative ">
          <img
            className="min-h-[30vh] max-h-[30vh]  object-center  object-cover aspect-video"
            src={
              "https://i.pinimg.com/originals/cc/b4/3b/ccb43b85e1a63fc15f98e6f9f04a9200.jpg"
            }
            alt={prop.product.name}
          />
           {prop.product.discount && prop.product.discount >= 10 ? (
            <span className="absolute bg-red-600 text-[1.8vh] text-white font-medium top-0 right-0 p-1 rounded-s-md">
              {prop.product.discount}% off
            </span>

          ) : (
            ""
          )}
        </section>
        <div className="flex justify-start flex-col p-2 relative  ">
          <h1 className="text-black text-[2.7vh] font-semibold font3">
            {prop.product.title}
          </h1>
          <p className="text-black text-[2.2vh] font-medium text-pretty max-w-full">
            {/* {
            prop.product.description &&  prop.product.description.split(" ").length > 15 ? <>{ prop.product.description.split(" ").slice(0,10 ).join(" ")}<button className="text-blue-600" >...more</button> </> :  prop.product.description 
            } */}
            {
              showMore ? <>{ prop.product.description}  <button className="text-blue-600" onClick={()=>setShowMore(!showMore)} >...less</button></> :  (prop.product.description &&  prop.product.description.split(" ").length > 10) ?  <>{
                 prop.product.description.split(" ").slice(0,10 ).join(" ")
                 }<button className="text-red-600" onClick={()=>setShowMore(!showMore)} >...more</button> </> :  prop.product.description 
            }
          </p>
          <span className="text-black text-[2.2vh] font-medium ">
            Category: {prop.product.category.map((ele) => ele + ", ")}
          </span>
          <p>
            {prop.product.discount && prop.product.discount >= 10 ? (
              <>
                <span className="line-through text-red-600 text-[2vh]">
                  ₹{prop.product.price}{" "}
                </span>{" "}
                <span className="text-black text-[2.2vh] font-medium ">
                  ₹
                  {prop.product.price -
                    prop.product.price * (prop.product.discount / 100)}
                </span>
              </>
            ) : (
              <span className="text-black text-[2.2vh] font-medium ">
                ₹
                {prop.product.price -
                  prop.product.price * (prop.product.discount / 100)}
                  
              </span>

            )}
          </p>
         
            <span className="text-[2vh]" >{prop.product.stock<=10? <>Only <span className="text-red-600 font2 font-medium " >{ Math.floor(prop.product.stock)  }</span> left</>:" " }</span>
          <div  >
            <select
              name="quantity"
              className="min-w-[4vw] min-h-[4vh] text-[2.3vh] m-1 bg-slate-100 rounded border p-1"
              id="quantity"
              onChange={(e) => {
                setProduct1({ ...product1, quantity: e.target.value });
              }}
              // console.log(product1),
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="flex justify-between items-center ">
            {/* <button 
            onClick={()=>addItemToCart(product1)}
            className="bg-yellow-400 font-medium py-1 px-2 rounded text-sm mx-1">
              Buy Now
            </button> */}
            <button
              onClick={
                user && user.name
                  ? () => addItemToCart(product1)
                  : () => navigate("/login")
              }
              className="bg-red-500  text-[2.3vh]  text-white font-medium  py-[1vh] px-[1vw] rounded text-sm z-[555]"
            >
              Add To Cart
            </button>

            {( user.favorite && user.favorite.filter(ele=>ele.productId==prop.product.id).length  ) ? (
              <img
                onClick={
                  user && user.name
                    ? () => (setFavorite(!fav), removeitemtofav(product1))
                    : () => navigate("/login")
                }
                className="h-[4vh] w-[4vw] object-contain"
                src="./src/assets/favoriteIcon.png"
                alt="favIconImg"
              />
            ) : (
              <img
                onClick={
                  user && user.name
                    ? () => (setFavorite(!fav), addToFav(product1))
                    : () => navigate("/login")
                }
                className="h-[4vh] w-[4vw] object-contain"
                src="https://th.bing.com/th/id/OIP.qJr_Kh_24UKMem4t-U9AwgDnEs?rs=1&pid=ImgDetMain"
                alt="notFavIconImg"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
