import React, { useContext, useEffect, useState } from "react";
import { userData } from "../App";
import axios from "axios";
import Product from "./Product";

const fetchProducts = async (id) => {
  try {
    const res = await axios.get(`/apiv1/productsfromfav/${id}` , { withCredentials: true });
    if (!res.data) throw new Error("No data found");
    return res.data;
  } catch (error) {
    // console.error(error);
    return [];
  }
};



export default function UserWishlist() {
  const { user, updateLogin } = useContext(userData);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts(user._id)
      .then((result) => {
        // console.log(result);
        setProducts([...result.data]);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  return (
    <>
      <section className="right-div min-h-[795px] max-h-[600px]  flex-auto rounded-lg min-w-[320px] max-w-[900px] bg-slate-100 overflow-y-auto">
        <div className="p-4  border-b-2 drop-shadow-sm flex w-full justify-between">
          <p className=" text-xl font-medium font3">WishList</p>
        </div>

        {products && products.length ? (
          <>
            {products &&
              products.map((ele) => (ele ? <Product key={ele.createdAt} product={ele} /> : " "))}
          </>
        ) : (
          <div className="w-full min-h-[50vh] flex justify-center items-center ">
        
          <span>Please Wait...</span>
       
      </div>
        )}
      </section>
    </>
  );
}
