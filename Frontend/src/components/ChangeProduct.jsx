import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseurl from "../url";
const notify = (msg, type, theme, autoClose) => {
  return toast(msg, { type, theme, autoClose });
};

const fetchProducts = async () => {
  try {
    const res = await axios.get(baseurl+"/getproducttoupdate" , { withCredentials: true });
    if (!res.data) throw res.data;
    // console.log(res.data)
    return res.data;
  } catch (res) {
    // console.log(res);
    res.data;
  }
};

export default function ChangeProduct() {
  const [update, setUpdate] = useState(false);
  const [products, setProducts] = useState([]);
  const [idxEdit, setIdxEdit] = useState(-1);
  const [inpData, setInpData] = useState({
    id: 0,
    title: "",
    price: 0,
    discount: 0,
    stock: 0,
    active: false,
  });

  const handleChange = (e) => {
    setInpData({ ...inpData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIdxEdit(-1);
    try {
      // console.log(inpData);
      const res = await axios.patch(baseurl+"/updateproduct", inpData , { withCredentials: true });
      //  console.log(res);
      if (!res.data.status) throw res;
                setUpdate(true);
        notify(res.data.msg, "success", "light", 3000);
    } catch (res) {
      notify(res.data.msg, "error", "light", 3000);
      setUpdate(update);
    } finally {
      setInpData({
        id: 0,
        title: "",
        price: 0,
        discount: 0,
        stock: 0,
        active: false,
      });
      setUpdate(!update);
    }
  };

  useEffect(() => {
    fetchProducts()
      .then((result) => {
        result.status
          ? setProducts([...result.data])
          : notify(result.msg + " Please Login", "error", "light", 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update]);

  return (
    <>
      {/* <form action="" onSubmit={(e) => e.preventDefault()}> */}
      <table className="w-full  ">
        <thead className="bg-slate-400  ">
          <tr>
            <th
              colSpan={1}
              className="text-center w-[10vw] p-3  font2 border-x-2 "
            >
              Id
            </th>
            <th
              colSpan={5}
              className="text-center w-[10vw] p-3  font2 border-r-2 "
            >
              Title
            </th>
            <th
              colSpan={2}
              className="text-center w-[10vw]  p-3 font2 border-r-2 "
            >
              Price(₹)
            </th>
            <th
              colSpan={2}
              className="text-center w-[10vw] p-3  font2 border-r-2 "
            >
              Discount
            </th>
            <th
              colSpan={3}
              className="text-center w-[10vw] p-3  font2 border-r-2 "
            >
              Stock
            </th>
            <th
              colSpan={5}
              className="text-center w-[10vw] p-3  font2 border-r-2 "
            >
              Active
            </th>
            <th
              colSpan={5}
              className="text-center w-[10vw] p-3  font2 border-r-2 "
            >
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {products.length != 0 ? (
            <>
              {products.map((ele, i) => (
                <tr
                  style={{ backgroundColor:  ele.active ? ( ele.stock>=10 ? "lightgreen" : "#f1ee8e " ) :"#ef4444" }}
                  key={i}
                  className="border-b-2  hover:bg-slate-300 p-4 "
                >
                  {idxEdit == i ? (
                    <>
                      <td
                        colSpan={1}
                        className=" w-[10vw]  border-r-2 text-center  font2  h-full "
                      >
                        <textarea
                          autoFocus
                          className="w-full  bg-transparent    outline-none hover:outline-slate-300 focus:outline-white font2 "
                          name="id"
                          id="id"
                          onChange={handleChange}
                        >
                          {ele.id}
                        </textarea>{" "}
                      </td>
                      <td
                        colSpan={5}
                        className=" w-[10vw]  border-r-2 text-center font2  h-full"
                      >
                        <textarea
                          aria-multiline
                          className="w-full  bg-transparent   outline-none hover:outline-slate-300 focus:outline-white font2 "
                          name="title"
                          id="title"
                          onChange={handleChange}
                        >
                          {ele.title}
                        </textarea>{" "}
                      </td>
                      <td
                        handleChange
                        colSpan={2}
                        className=" w-[10vw]  border-r-2 text-center font2  h-full "
                      >
                        <textarea
                         onChange={handleChange}
                          className="w-full bg-transparent   outline-none hover:outline-slate-300 focus:outline-white font2 "
                          name="price"
                          id="price"
                        >
                          {ele.price}
                        </textarea>{" "}
                      </td>
                      <td
                   
                        colSpan={2}
                        className="  border-r-2 text-center  font2  h-full"
                      >
                        <textarea
                            onChange={handleChange}
                          className="w-full bg-transparent    outline-none hover:outline-slate-300 focus:outline-white font2  "
                          name="discount"
                          id="discount"
                        >
                          {ele.discount}
                        </textarea>
                      </td>
                      <td
                        colSpan={3}
                        className=" border-r-2 text-center font2  h-full"
                      >
                        <textarea
                         onChange={handleChange}
                          className="w-full  bg-transparent  outline-none hover:outline-slate-300 focus:outline-white font2  "
                          name="stock"
                          id="stock"
                        >
                          {ele.stock}
                        </textarea>
                      </td>

                      <td
                        colSpan={5}
                        className="  border-r-2 text-center font2  "
                      >
                        <select
                          className="px-4 py-3 outline-none hover:outline-slate-300 focus:outline-white font2  bg-transparent"
                          name="active"
                          id="active"

                          onChange={(e) => {
                            setInpData({ ...inpData, active: e.target.value });
                          }}
                        >
                          <option value={ele.active}>{`${ele.active}`}</option>
                          <option
                            value={!ele.active}
                          >{`${!ele.active}`}</option>
                        </select>
                      </td>
                      <td
                        handleChange
                        colSpan={5}
                        className="w-[10vw] border-r-2 text-center  font2  bg-green-400  "
                      >
                        {" "}
                        <button
                          onClick={handleSubmit}
                          className=" px-5 py-3 font2 font-medium text-slate-600 w-full  "
                        >
                          Update
                        </button>{" "}
                      </td>
                    </>
                  ) : (
                    <>
                      <td
                        colSpan={1}
                        className="w-[10vw] border-x-2 text-center  p-2 font2 font-medium "
                      >
                        {ele.id}
                      </td>
                      <td
                        colSpan={5}
                        className="w-[10vw] border-r-2 text-center p-2 font2 "
                      >
                        {ele.title}
                      </td>
                      <td
                        colSpan={2}
                        className="w-[10vw] border-r-2 text-center  p-2 font2 "
                      >
                        ₹{ele.price}
                      </td>
                      <td
                        colSpan={2}
                        className="w-[10vw] border-r-2 text-center  p-2 font2 "
                      >
                        {ele.discount}%
                      </td>
                      <td
                        colSpan={3}
                        className="w-[10vw] border-r-2 text-center  p-2 font2 "
                      >
                        {ele.stock}
                      </td>
                      <td
                        colSpan={5}
                        style={{ color: ele.active ? "green" : "black" }}
                        className="w-[10vw] border-r-2 text-center  p-2 font2 font-medium "
                      >
                        {ele.active.toString()}
                      </td>
                      <td
                        colSpan={5}
                        className="w-[10vw]  border-r-2 text-center  bg-stone-100 p-2 font2 "
                      >
                        {" "}
                        <button
                          onClick={() => {
                            setInpData({ ...ele }), setIdxEdit(i);
                          }}
                          className=" w-full outline-none px-5 py-3 font2 font-medium"
                        >
                          Edit
                        </button>{" "}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </>
          ) : (
            ""
          )}
        </tbody>
      </table>
      {/* </form> */}
    </>
  );
}
